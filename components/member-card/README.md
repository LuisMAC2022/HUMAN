# member-card

## Propósito
Tarjeta de presentación de una persona: retrato 4:5, eyebrow, nombre, resumen, bio y un bloque destacado opcional ("Aprendizaje central"). El componente representa exclusivamente personas y permite crear fichas reutilizables para N miembros; no debe usarse como cabecera, descripción ni contenedor de un proyecto.

Cuando una persona esté asociada a un proyecto, expresa esa relación mediante
un enlace nativo hacia la sección correspondiente, con texto visible y un
nombre accesible claro. Mantén la sección del proyecto como contenido
semántico independiente.

## Uso
```html
<script src="components/member-card/member-card.js" defer></script>

<member-card
  name="Iñaki Moreno"
  eyebrow="Quiénes somos"
  photo-src="assets/founders/jair-4x5.webp"
  photo-alt="Retrato de Iñaki Moreno, fundador de Human STEM"
  caption="Iñaki Moreno, fundador">
  <p slot="summary">22 años, último semestre de la Licenciatura…</p>
  <p>En la ONG SELIDER Estado de México dirigió…</p>
  <h3 slot="highlight-title">Aprendizaje central</h3>
  <p slot="highlight">El asistencialismo nace de intenciones nobles…</p>
</member-card>
```

## API
| Atributo | Tipo | Default | Descripción |
|---|---|---|---|
| `name` | string | — (req) | Nombre; se renderiza como heading. |
| `photo-src` | string | — (req) | Ruta de la imagen (4:5 recomendado). |
| `photo-alt` | string | — (req) | Alt de la imagen. |
| `eyebrow` | string | — | Kicker sobre el nombre. |
| `caption` | string | — | Pie de foto (`figcaption`). |
| `heading-level` | `2\|3\|4` | `2` | Nivel del heading, para respetar la jerarquía de la página anfitriona. |
| `photo-ratio` | proporción CSS | `4 / 5` | Relación de aspecto de la foto, por ejemplo `1 / 1`; los valores no válidos usan el valor predeterminado. |

| Slot | Descripción |
|---|---|
| `summary` | Párrafo de resumen destacado. |
| (default) | Párrafos de bio. |
| `highlight-title` | Título del bloque destacado. |
| `highlight` | Contenido del bloque. El bloque solo aparece si hay contenido. |

## Theming
Variables leídas por el componente (todas con fallback):
`--mc-text`, `--mc-text-muted`, `--mc-accent`, `--mc-surface`, `--mc-highlight-surface`, `--mc-radius`, `--mc-gap`, `--mc-font-display`, `--mc-font-body`.

Defínelas en `:root` de tu sitio y la tarjeta hereda tu identidad sin tocar el JS.

## Layout
Usa container queries: si la tarjeta mide ≥ 40rem, foto a la izquierda y texto a la derecha; abajo de eso, apilada. No depende del viewport sino del espacio real que le des.

## Accesibilidad
- Heading real (`h2`–`h4` según `heading-level`) para navegación por lectores.
- `figure`/`figcaption` para el retrato.
- El bloque destacado es un `<section>` nombrado por su título; oculto si no hay contenido.
- Imagen con `width`/`height` intrínsecos y `loading="lazy"` (evita layout shift).

## Integración en el index
1. Copia la carpeta `member-card/` a tu proyecto.
2. Carga el script una vez con `defer`.
3. Conserva una `<section id="quienes-somos" aria-labelledby="…">` externa y un `h2` visible que nombre al equipo.
4. Inserta una tarjeta por persona con `heading-level="3"`, debajo de ese `h2`.
5. Para relacionar a alguien con un proyecto, añade un enlace nativo hacia la sección del proyecto fuera de `member-card`; no conviertas la tarjeta en la propia sección del proyecto.

## Limitaciones conocidas
- Sin Shadow DOM off: los estilos internos están encapsulados; personaliza solo vía tokens.
- Los atributos se interpolan en HTML; no pases contenido no confiable en `name`/`caption`.

## Plan de pruebas (manual, en el sandbox)
- Caso completo, caso mínimo (sin eyebrow/caption/highlight), contenedor angosto, nombre y caption largos, imagen rota (alt visible), zoom de texto 200%.
