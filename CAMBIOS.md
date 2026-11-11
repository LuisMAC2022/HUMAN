# HUMAN STEM · Cambios para la feria

10 de noviembre de 2026 · Base del 9 de noviembre · P1–P9

## Cambié

| Archivo | Cambio |
|---|---|
| `index.html`, `en/index.html` | Cuatro paradas. Nuevo encabezado, misión y visión integradas, y enlaces históricos preservados. |
| `superman.html`, `superman.css`, `js/superman.js` | Texto del funcionamiento y de la entrevista recortado. Cielo separado de la página. Simulador y constelación conservados, con demostración programada. |
| `miltli.html`, `miltli.css`, `js/miltli.js` | Guía y cubierta del suelo compartida con la portada. Plantilla común, controles de profundidad móviles y demostraciones de capas y proceso. |
| `comun.css`, `atlas.css`, `horizonte.css` | Tokens compartidos, controles redondos, amanecer, estratos, transiciones y fondo claro para los documentos de apoyo. |
| `js/planos.js`, `js/horizonte.js`, `js/tour.js` | Dirección de viaje, seguimiento de paradas, alias y recorrido de 13 pasos con estado por pestaña. |
| `herramientas/generar_escena.py`, `assets/escena/` | Paleta y árbol común. El generador vuelve a dibujar el paisaje y la camioneta. |
| `assets/fonts/`, logotipos y QR | Subconjuntos de Spectral, pila monoespaciada del sistema, logotipos optimizados y QR vectorial decodificado. |
| `mapa-del-sitio.html`, `js/mapa.js`, `creditos.html`, `uso-responsable-ia.html`, `404.html` | Búsqueda diferida, nombres de destino, créditos de fuentes, estado actual y pie de la feria. |
| `sitemap.xml`, `LEEME.md`, `herramientas/pesar.js` | Fecha y mantenimiento actualizados. Medición repetible del peso de primera carga. |

## Verifiqué

| Comprobación | Resultado | Evidencia |
|---|---|---|
| P1. Frases eliminadas, secciones espejo y anclas | 30 comprobaciones de frases con cero coincidencias. Cuatro paradas en ambas portadas, misión, visión y cita conservadas literalmente. | `evidencia/frases.txt` y `evidencia/fuente-despues.json`. |
| P2. Amanecer, controles y contraste | Sol, colinas, pasto y estratos en las dos portadas. El cielo sigue nocturno. | `evidencia/capturas/despues/` y tabla de contraste. |
| P3. Árbol común | `arbol.svg` pesa 6549 B y carece de filtro. Misma posición horizontal y tamaño en ambas páginas. | `evidencia/capturas/tronco-400/`, medición a 390 y 1280 px. |
| P4. Plantilla y guía | Cabecera y pie de Miltli coinciden con la portada, con `aria-current` del proyecto. Menú, Escape, anclas, selector, proceso, pausa y QR comprobados. | `evidencia/uso.txt`, capturas de cada parada. |
| P5. Transiciones | Cuatro direcciones activas a 1280 × 720 y 390 × 780. Capas comunes y fotogramas alrededor de 350 ms. | `evidencia/capturas/transiciones/` y `evidencia/llegadas.txt`. |
| P6. Recorrido | Dos vueltas reales en Chromium, 655 s y cero errores. Pausa tras interacción, recarga, reanudación tras 60 s de inactividad simulada, salida, teclado y etiquetas inglesas. | `evidencia/tour-real.txt`, `evidencia/uso.txt`, `evidencia/capturas/tour/`. |
| P7. CATIC | Se entregan los dos informes y el Anexo C. Veredicto literal NO CUMPLE con decisiones y pendientes detallados. | `informe-unam-antes.md`, `informe-unam-despues.md`. |
| P8. Peso, carga y QR | Tres planos más ligeros que la línea base. Cero solicitudes a otros orígenes durante las cargas medidas. | `peso-antes.txt`, `peso-despues.txt` y QR decodificado abajo. |
| P9. Auditoría de ocho páginas | Chromium 153 y axe-core reportaron cero problemas. Nu HTML registró cero errores. | `evidencia/auditar-despues.txt` y `evidencia/html-despues.json`. |
| P9. Reflujo y portada | Ocho páginas a 320, 360, 390, 768, 1024, 1280 y 1440 px, sin desborde horizontal. Dos portadas de 768 px de alto a 1024 × 768. | `evidencia/despues-navegador.json` y capturas. |
| P9. Teclado, impresión y JavaScript | Foco visible en los recorridos de tabulación. Tres impresiones sin capas ni menú. Menú, fondos y contenido disponibles sin JavaScript. | `evidencia/uso.txt`, `evidencia/capturas/impresion/`. |
| P9. Enlaces y fechas | Archivos y anclas de la entrega resuelven. Los ocho pies y los siete `lastmod` usan 2026-11-10. | `evidencia/fuente-despues.json` y tabla HTTP. |
| P9. Ortografía y mantenimiento | Se revisaron textos ES/EN. Los rótulos de Miltli se alinearon con los encabezados y se usaron frases directas en la portada inglesa. | `LEEME.md` y `LISTA-STAND.md`. |

Los tamaños declarados con `font-size` en píxeles para Miltli son 12, 13, 14, 15, 16, 17, 18, 20, 22, 23, 24, 27, 29, 32, 35, 37, 43, 45 px. Los valores en rem se conservaron para los controles y el texto principal. Los selectores retirados se anotan en `evidencia/selectores-miltli.txt`.

### Contraste de portada

Cálculo WCAG con los colores CSS y su composición sobre el fondo. Para la entrada, se muestreó el cielo a la altura de su primera línea en las capturas de 390, 1024 y 1280 px. La tabla usa el fondo más oscuro de esas tres muestras.

| Elemento | Relación |
|---|---:|
| H1 | 6.50:1 |
| Entrada (fondo más oscuro medido) | 5.58:1 |
| Paradas, suelo de referencia | 7.12:1 |
| Tarjeta de cielo, descripción | 6.16:1 |
| Tarjeta de tierra, descripción | 9.15:1 |
| Enlaces de cabecera | 7.87:1 |
| Texto del pie | 11.08:1 |

### Peso y carga inicial

Chromium 153 · 390 × 780 · CPU 4× · bytes sin comprimir. Las solicitudes especulativas se contabilizan por separado.

| Plano | Antes B / solicitudes | Después B / solicitudes | DOMContentLoaded / carga | CLS |
|---|---:|---:|---:|---:|
| index.html | 161 258 / 17 | 100 106 / 14 | 536 / 560 ms | 0.0000 |
| en/index.html | 161 385 / 17 | 100 259 / 14 | 217 / 236 ms | 0.0000 |
| superman.html | 154 149 / 10 | 142 205 / 10 | 251 / 292 ms | 0.0000 |
| miltli.html | 157 436 / 4 | 147 693 / 10 | 187 / 189 ms | 0.0000 |

### QR de participación

```text
Enlace original: https://docs.google.com/forms/d/e/1FAIpQLSdmvbMqbXGZNnqHmvJsmeIXrOZvumeHosot576Vju7E-lCg2A/viewform?usp=send_form
PNG decodificado: https://www.canvaqr.com/RGRsWb8d9M
SVG decodificado: https://docs.google.com/forms/d/e/1FAIpQLSdmvbMqbXGZNnqHmvJsmeIXrOZvumeHosot576Vju7E-lCg2A/viewform?usp=send_form
```

El PNG original usaba un intermediario de Canva. El SVG nuevo abre directamente el formulario asociado al enlace visible.

### Respuestas HTTP externas

Consulta GET de solo lectura. El código 200 del formulario confirma la página de destino.

| Destino | HTTP |
|---|---:|
| [docs.google.com](https://docs.google.com/forms/d/e/1FAIpQLSdmvbMqbXGZNnqHmvJsmeIXrOZvumeHosot576Vju7E-lCg2A/viewform?usp=send_form) | 200 |
| [www.acatlan.unam.mx](https://www.acatlan.unam.mx/) | 200 |
| [www.epa.gov](https://www.epa.gov/recycle/composting-home) | 200 |
| [www.instagram.com](https://www.instagram.com/humanstem/) | 200 |
| [www.instagram.com](https://www.instagram.com/reel/DYN5lJItlNd/) | 200 |
| [www.selider.net](https://www.selider.net/) | 200 |
| [www.tiktok.com](https://www.tiktok.com/@humanstem) | 200 |
| [www.unam.mx](https://www.unam.mx/) | 200 |

## No verifiqué

- Firefox, WebKit y Lighthouse. Los tiempos y CLS de esta entrega corresponden a Chromium con CPU 4×.
- Comparación aislada de cada grupo de P8. Las capturas comparan la base del 9 de noviembre con la entrega final. Se midió la cobertura CSS a tres anchuras. Los selectores retirados se comprobaron contra el HTML y los estados de JavaScript.
- Pantalla de confirmación del formulario externo y lectura del QR desde un teléfono físico. Se verificó el destino del QR con un decodificador.
- El verificador CSS de Nu marcó construcciones modernas como `@view-transition` y `container-type`. El informe conserva el resultado literal del validador.

## Falta

- El objetivo P8 de 95 KB y 9 solicitudes queda pendiente en los planos. La tabla registra el CLS medido de cada portada y proyecto. Las páginas de apoyo también quedaron por debajo de su peso anterior.
- Confirmación del texto del pie con la organización de la feria. Se usó la redacción y los enlaces propuestos en D6 en la revisión privada.
- Datos de Block B pendientes de aprobación: impresión 3D y etapa de Superman, tamaño y siguiente etapa del piloto Miltli, fundación, número de integrantes y dirección de la asociación. La entrega conserva los hechos ya publicados en la base.
- El dominio público de referencia devuelve 404 para el sitemap y tres de sus páginas. Los requisitos institucionales y las preguntas para la asociación están en el informe CATIC.
