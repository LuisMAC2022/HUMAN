#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const INDEX_PATH = "../index.html";
const OUT_DIR = "assets/carousel";

const html = await readFile(INDEX_PATH, "utf8");

const colaboradoresMatch = html.match(
  /<section[^>]+aria-labelledby="titulo-colaboradores"[^>]*>([\s\S]*?)<\/section>/
);

if (!colaboradoresMatch) {
  throw new Error("No encontré la sección de colaboradores en index.html.");
}

const colaboradoresHtml = colaboradoresMatch[1];

const srcRegex = /<img\b[^>]*\bsrc="([^"]+)"/g;
const urls = [...colaboradoresHtml.matchAll(srcRegex)]
  .map(match => match[1])
  .filter(src => src.startsWith("http"))
  .filter((src, index, arr) => arr.indexOf(src) === index);

await mkdir(OUT_DIR, { recursive: true });

console.log(`Encontré ${urls.length} imágenes únicas del carrusel.`);

for (const [index, url] of urls.entries()) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "human-stem-image-downloader/1.0"
    }
  });

  if (!response.ok) {
    console.error(`Error descargando ${url}: ${response.status} ${response.statusText}`);
    continue;
  }

  const finalUrl = response.url;
  const cleanPath = new URL(finalUrl).pathname;
  const originalName = decodeURIComponent(path.basename(cleanPath));

  const extMatch = originalName.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i);
  const ext = extMatch ? extMatch[0].toLowerCase() : ".jpg";

  const safeName = originalName
    .replace(/\.[a-z0-9]+$/i, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  const filename = `${String(index + 1).padStart(2, "0")}-${safeName}${ext}`;
  const filepath = path.join(OUT_DIR, filename);

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(filepath, buffer);

  console.log(`Descargada: ${filepath}`);
}

console.log("Listo.");
