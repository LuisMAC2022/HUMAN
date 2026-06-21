#!/usr/bin/env node

import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";

const INDEX_PATH = "../index.html";
const OUT_DIR = "assets/carousel";

// Para carrusel web, 400–800 suele bastar.
// Si quieres más calidad: WIDTH=800 node scripts/download-carousel-images.mjs
const THUMB_WIDTH = Number(process.env.WIDTH ?? 600);

// Espera base entre imágenes.
// Si te vuelve a dar 429, sube esto:
// DELAY_MS=15000 node scripts/download-carousel-images.mjs
const DELAY_MS = Number(process.env.DELAY_MS ?? 8000);

const MAX_RETRIES = Number(process.env.MAX_RETRIES ?? 5);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function exists(filepath) {
  try {
    await access(filepath);
    return true;
  } catch {
    return false;
  }
}

function getCommonsFileName(url) {
  const parsed = new URL(url);

  // Caso usado en tu HTML:
  // https://commons.wikimedia.org/wiki/Special:FilePath/Andrena_fulva_ku.jpg
  const marker = "/wiki/Special:FilePath/";
  if (parsed.pathname.includes(marker)) {
    return decodeURIComponent(parsed.pathname.split(marker)[1]);
  }

  // Fallback por si algún día usas otra forma de URL.
  return decodeURIComponent(path.basename(parsed.pathname));
}

function makeThumbUrl(fileName) {
  const url = new URL("https://commons.wikimedia.org/w/index.php");
  url.searchParams.set("title", `Special:Redirect/file/${fileName}`);
  url.searchParams.set("width", String(THUMB_WIDTH));
  return url.toString();
}

function extensionFromContentType(contentType) {
  if (!contentType) return ".jpg";

  if (contentType.includes("image/jpeg")) return ".jpg";
  if (contentType.includes("image/png")) return ".png";
  if (contentType.includes("image/webp")) return ".webp";
  if (contentType.includes("image/gif")) return ".gif";
  if (contentType.includes("image/svg+xml")) return ".svg";

  return ".jpg";
}

function makeSafeBaseName(fileName) {
  return fileName
    .replace(/\.[a-z0-9]+$/i, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

async function fetchWithRetries(url, label) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent": "human-stem-image-downloader/1.0; contact: human.stem.org@gmail.com"
      }
    });

    if (response.ok) {
      return response;
    }

    const retryAfter = response.headers.get("retry-after");
    const retryAfterMs = retryAfter ? Number(retryAfter) * 1000 : null;

    if (response.status === 429 && attempt < MAX_RETRIES) {
      const backoffMs = retryAfterMs ?? DELAY_MS * attempt * 2;
      console.warn(
        `429 en ${label}. Reintento ${attempt}/${MAX_RETRIES} después de ${Math.round(backoffMs / 1000)}s.`
      );
      await sleep(backoffMs);
      continue;
    }

    throw new Error(`${response.status} ${response.statusText}`);
  }

  throw new Error("Agotados los reintentos.");
}

const html = await readFile(INDEX_PATH, "utf8");

const colaboradoresMatch = html.match(
  /<section[^>]+aria-labelledby="titulo-colaboradores"[^>]*>([\s\S]*?)<\/section>/
);

if (!colaboradoresMatch) {
  throw new Error("No encontré la sección de colaboradores en index.html.");
}

const colaboradoresHtml = colaboradoresMatch[1];

const srcRegex = /<img\b[^>]*\bsrc="([^"]+)"/g;

const sourceUrls = [...colaboradoresHtml.matchAll(srcRegex)]
  .map(match => match[1])
  .filter(src => src.startsWith("http"))
  .filter((src, index, arr) => arr.indexOf(src) === index);

await mkdir(OUT_DIR, { recursive: true });

console.log(`Encontré ${sourceUrls.length} imágenes únicas del carrusel.`);
console.log(`Descargando miniaturas de ${THUMB_WIDTH}px de ancho.`);
console.log(`Pausa entre descargas: ${DELAY_MS} ms.`);

const manifest = [];

for (const [index, sourceUrl] of sourceUrls.entries()) {
  const fileName = getCommonsFileName(sourceUrl);
  const thumbUrl = makeThumbUrl(fileName);

  const baseName = makeSafeBaseName(fileName);
  const prefix = String(index + 1).padStart(2, "0");

  // Usamos extensión original como primera aproximación.
  const originalExtMatch = fileName.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i);
  const originalExt = originalExtMatch ? originalExtMatch[0].toLowerCase().replace(".jpeg", ".jpg") : ".jpg";

  let filepath = path.join(OUT_DIR, `${prefix}-${baseName}${originalExt}`);

  if (await exists(filepath)) {
    console.log(`Ya existe, salto: ${filepath}`);
    manifest.push({
      index: index + 1,
      sourceUrl,
      thumbUrl,
      localPath: filepath,
      skipped: true
    });
    continue;
  }

  try {
    const response = await fetchWithRetries(thumbUrl, fileName);
    const contentType = response.headers.get("content-type") ?? "";

    if (!contentType.startsWith("image/")) {
      throw new Error(`La respuesta no parece imagen: ${contentType}`);
    }

    const ext = extensionFromContentType(contentType);
    filepath = path.join(OUT_DIR, `${prefix}-${baseName}${ext}`);

    if (await exists(filepath)) {
      console.log(`Ya existe, salto: ${filepath}`);
      continue;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(filepath, buffer);

    console.log(`Descargada: ${filepath}`);

    manifest.push({
      index: index + 1,
      sourceUrl,
      thumbUrl,
      finalUrl: response.url,
      localPath: filepath,
      contentType
    });
  } catch (error) {
    console.error(`Error descargando ${fileName}: ${error.message}`);

    manifest.push({
      index: index + 1,
      sourceUrl,
      thumbUrl,
      error: error.message
    });
  }

  await sleep(DELAY_MS);
}

await writeFile(
  path.join(OUT_DIR, "manifest.json"),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      width: THUMB_WIDTH,
      images: manifest
    },
    null,
    2
  )
);

console.log("Listo. Se generó assets/carousel/manifest.json.");
