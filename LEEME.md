# HUMAN STEM · Micrositio en tres planos

| Plano | Página | Estilos y scripts propios |
|---|---|---|
| Cielo | `superman.html` | `superman.css`, `js/superman.js` |
| Horizonte | `index.html`, `en/index.html` | `horizonte.css`, `js/horizonte.js` |
| Tierra | `miltli.html` | `miltli.css`, `js/miltli.js` |

`comun.css` reúne las fuentes locales, los colores, la cabecera, el pie, la ruta de navegación, las capas del paisaje y los controles del recorrido. `atlas.css` contiene los estilos de las páginas de apoyo. `js/planos.js` va en el encabezado para registrar la dirección de viaje antes del pintado y habilitar el menú plegable. Los otros scripts se cargan con `defer`.

Desde esta carpeta, inicia el servidor y abre [http://127.0.0.1:8123/](http://127.0.0.1:8123/).

```bash
python3 -m http.server 8123 --bind 127.0.0.1
```

El sitio usa HTML, CSS y JavaScript sin dependencias de ejecución ni compilación. Los enlaces, el mapa del sitio y el contenido esencial funcionan sin JavaScript. Las transiciones entre páginas requieren HTTP y un navegador con View Transitions. La preferencia de movimiento reducido usa navegación y desplazamiento inmediatos.

## Paisaje

Edita `PALETA` en `herramientas/generar_escena.py` junto con sus equivalentes en `comun.css`. Ejecuta `python3 herramientas/generar_escena.py` para regenerar `assets/escena/`. El resultado es determinista. El árbol mide 380 × 1000 unidades y su línea de suelo pasa por y = 342. Las capas compartidas mantienen el mismo tamaño al cambiar de plano. Solo cambia su posición.

## Añadir una parada

- **Horizonte.** Añade la sección `.parada` y su enlace en `.paradas` de ambas portadas. Conserva los identificadores anteriores como anclas de compatibilidad cuando corresponda. Ajusta la posición del brote en `horizonte.css` con incrementos de `100cqi`. La cuarta parada usa `300cqi`.
- **Cielo.** Añade la sección `.estrella`, su enlace en `.carta__estrellas` y las coordenadas del nudo sobre el `viewBox` de 760 × 490. Marca el tramo y sus nudos con el mismo `data-traza`.
- **Tierra.** Añade la sección con `id`, `data-depth` y `data-title`, su enlace en `.depth-stops` y la entrada correspondiente del mapa del sitio.

## Recorrido de la feria

`PASOS` al inicio de `js/tour.js` define el orden, la página, el ancla y la duración en segundos. Para la portada inglesa, `en` contiene el ancla y el nombre traducidos. Los tres pasos demostrativos llaman a `window.humanStemDemo` desde el guion de su página. El botón **Recorrido** y el marcador `?tour=1` activan el mismo circuito.

## Verificación y mantenimiento

- `node herramientas/auditar.js` comprueba las ocho páginas principales con Playwright. Si está disponible, añade axe-core.
- `node herramientas/pesar.js` mide una primera carga con Chromium y CPU 4×. Su salida distingue los recursos especulativos.
- `herramientas/generar_mano.py` imprime el SVG articulado del simulador.
- Actualiza la fecha del pie en las ocho páginas y `lastmod` en `sitemap.xml` al publicar. Conserva los alias `quienes-somos.html`, `colabora.html` y `uso_responsable_ia.html`.
