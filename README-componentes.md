# HUMAN STEM — Sistema de componentes

Documentación del refactor de `index.html` y `styles.css`. Objetivos: HTML
semántico sin *divitis*, componentes reutilizables tematizados con tokens,
estados explícitos y accesibilidad de serie. La identidad visual (Manual de
Identidad) no cambia.

## Tokens de diseño (`:root`)

Todo color, métrica y movimiento vive en variables CSS. Tokens nuevos en
este refactor:

| Token | Valor | Uso |
|---|---|---|
| `--human-gris-medio` | `#6B7280` | Texto secundario, notas y pies (consolida los antiguos `#6b7280` y `#7a8194`) |
| `--human-verde-tinta` | `#14320A` | Texto sobre superficies verdes (`.btn--verde`) |
| `--texto-sobre-oscuro` | `rgba(255,255,255,.85)` | Cuerpo de texto en secciones oscuras |
| `--texto-sobre-oscuro-suave` | `rgba(255,255,255,.72)` | Texto atenuado en secciones oscuras |
| `--altura-header` | `72px` | Altura del header; alimenta `scroll-padding-top` |
| `--acento` | `var(--human-cyan)` | Valor por defecto de la API de acento (abajo) |

Los `rgba()` que quedan en el CSS son decorativos y derivan de la paleta
(velos de blanco, resplandores del azul medio, sombras del azul tinta).
Regla: **ningún color en crudo fuera de `:root`**.

## API de acento

Varios componentes leen la variable `--acento` para su detalle de color.
En lugar de `style="--acento: …"` en el HTML, se fija con un modificador:

```html
<p class="eyebrow eyebrow--dot acento-naranja">Proyecto piloto</p>
<article class="mv-card acento-verde">…</article>
<figure class="retrato superman__retrato acento-naranja">…</figure>
```

Modificadores disponibles: `.acento-cyan` (por defecto), `.acento-verde`,
`.acento-naranja`, `.acento-rojo`. Consumidores actuales de `--acento`:
`.eyebrow--dot::before`, `.mv-card h3::before`, `.retrato::after`.

## Inventario de componentes

| Componente | Elemento | Variantes / notas |
|---|---|---|
| `.contenedor` | `div` | Ancho máximo + gutters; se conserva porque las secciones tienen fondo *full-width* con contenido acotado |
| `.section` | `section` | `--tinta` (fondo gris suave); siempre con `aria-labelledby` |
| `.eyebrow` | `p` (o `h3` si titula una tarjeta) | `--dot` (punto de color vía `--acento`) |
| `.btn` | `a` / `button` | `--primario`, `--oscuro`, `--contorno`, `--verde`; estado `[aria-disabled="true"]` |
| `.mv-card` | `article` + `h3` | Tarjeta de misión/visión; acento vía API |
| `.aprendizaje-card` | `section` + `h3` | Callout con borde de acento fijo cyan |
| `.retrato` | `figure` + `figcaption` | Modificador `.superman__retrato` (1:1); círculo decorativo vía `--acento` |
| `.sub-head` | `div` + `h3` | La línea decorativa ahora es `::after` (antes un `<span>` en el HTML) |
| `.patro-card` | `article` + `h4` | El `h4` (`.patro-card__nombre`) envuelve el logo-enlace; `.patro-card__logo` normaliza la altura a 44px para futuros patrocinadores |
| `.colaborador` | `li` > `figure` | Ficha circular de la marquesina |
| `.marquesina` | `section` desplazable | Ver estados abajo; filas `.marquesina__fila--izq/--der` |
| `.equipos-colaboradores` | `ul` > `li` > `figure` | `__item--panoramica` (16:9), `__item--vertical` (2:3) |
| `.dona-card` | `article` + `h3.eyebrow` | Tarjeta de contacto para donativos |
| `.huertos__badge` / `.huertos__nota` | `span` / `p` | Sustituyen los estilos en línea |

Clases reservadas (definidas, aún sin instancia en la página): `.btn--oscuro`,
`.section-lead`, `.colaboradores__nota`, `.familia` (subtítulo de equipo en
`figcaption` de `.colaborador`), `.sr-only`.

## Estados y comportamiento

**Botón deshabilitado.** El CTA "Únete al equipo" es un *enlace marcador de
posición*: `<a>` sin `href` + `aria-disabled="true"`. Sin `href` no es
enfocable ni activable con teclado (el patrón anterior, `href` +
`aria-disabled`, seguía navegando con Enter). Para habilitarlo: restaurar
`href="huerto_urbano.html"` y quitar `aria-disabled`.

**Marquesina (mejora progresiva, tres estados explícitos):**

1. *Base (sin JS):* región estática desplazable — `<section tabindex="0"
   aria-label>` con `overflow-x: auto`, operable con teclado. Sin duplicados.
2. *`prefers-reduced-motion`:* el script no clona; queda como la base.
3. *Mejorado:* el script clona cada fila una vez (clones con
   `aria-hidden="true"`), añade `.marquesina--animada` (activa animación,
   máscara lateral y `overflow: hidden`) y retira el `tabindex`.

Antes, los 12 clones estaban duplicados a mano en el HTML (y con movimiento
reducido el visitante veía a cada persona dos veces). Para añadir una persona
ahora basta un solo `<li class="colaborador">`.

**Navegación móvil.** `button.nav-toggle` con `aria-expanded` +
`aria-controls`; estado en `data-open` del `nav`; cierre con Escape o al
elegir destino. `.nav-cta` ya no usa `!important`: el selector compuesto
`.nav-list .nav-cta` supera a `.nav-list a`.

## Accesibilidad

- Landmarks completos: `header`, un solo `main`, `footer`, dos `nav`
  etiquetados; toda `section` con nombre accesible (`aria-labelledby` /
  `aria-label`).
- Jerarquía de encabezados verificada: un `h1`, sin saltos de nivel.
- `role="list"` en los `<ul>` con `list-style: none` — redundante según la
  especificación, pero necesario: Safari/VoiceOver elimina la semántica de
  lista al quitar los marcadores.
- Retratos de la marquesina con `alt=""`: el `figcaption` ya nombra a la
  persona; el `alt` anterior duplicaba el anuncio ×12. Los retratos de
  fundadores y las fotos grupales conservan `alt` descriptivo porque aportan
  información más allá del pie.
- Se mantienen: skip link, `:focus-visible` global, pausa de la marquesina
  al hover, bloque global de `prefers-reduced-motion`.

## Excepciones de linter (intencionales)

`html-validate` reporta dos reglas que se dejan a propósito:
`no-redundant-role` (los `role="list"` explicados arriba) y `valid-id` sobre
`#__bundler_thumbnail` (plantilla generada por herramientas, presente en el
archivo original; se conserva textual por si el pipeline la consume).

## Pruebas realizadas y plan

Verificado en este refactor: balance de etiquetas y anidación de secciones
(parser), jerarquía de encabezados, resolución de todos los
`aria-labelledby`, correspondencia clase-HTML ↔ clase-CSS en ambos sentidos,
balance de llaves del CSS, cero estilos en línea, cero hex fuera de `:root`,
y `html-validate` sin errores fuera de las excepciones documentadas.

Pendiente de probar en navegador real: bucle de la marquesina (con y sin
`prefers-reduced-motion`, con JS deshabilitado), menú móvil ≤860px con
teclado, contraste del texto atenuado sobre azul oscuro, y render con las
imágenes reales de `assets/`.

## Cambios estructurales respecto a la versión anterior

1. **Corrección crítica:** la sección `#mision-vision` estaba anidada
   *dentro* del hero, partiendo su contenido en dos; ahora es hermana del
   hero (orden del menú: Inicio → Misión y visión → …) con su propio
   `.contenedor` y un eyebrow propio.
2. Eliminados los wrappers sin función `.hero__contenido` y
   `.mision-vision-textos`; `.hero__inner` ya no necesita ser grid.
3. `.quienes__bio`: de `article` con `aria-labelledby` duplicado a `div` de
   layout; `.aprendizaje-card` promovida a `section` titulada.
4. Corregidos márgenes/padding por defecto de `ul` en `.marquesina__fila`
   (sangría fantasma de 40px) y de `figure` dentro de `.colaborador`.
5. `.mv-cards` obtiene columnas responsivas propias (`auto-fit`, mín. 280px)
   al independizarse; eliminada la regla duplicada
   `.section--tinta .mv-card` y fusionado el doble bloque `.stem-strip`.
6. Tarjeta de patrocinador con encabezado real (`h4`), `rel="external
   noopener"` y sin `aria-label` redundante (el `alt` del logo nombra el
   enlace).

**Nota de contenido (revisar, no se tocó):** la foto del fundador Iñaki
Moreno apunta a `assets/founders/jair-4x5.webp` y la del director Jair
Álvarez a `assets/founders/alvarez-4x5.webp` — conviene confirmar que los
archivos no están intercambiados.
