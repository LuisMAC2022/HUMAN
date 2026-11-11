# Informe de cumplimiento — Lineamientos para Sitios Web institucionales de la UNAM (CATIC 2016)

**Sitio** HUMAN STEM · **Fecha** 2026-11-10 · **Modo** AUDIT · **Protocolo** v1.0 · **Versión** 9 de noviembre

**Capacidades** FETCH ✓ · RENDER ✓ (Chromium 153) · EXEC ✓ · WEBTOOLS parcial (Nu local) · SOURCE ✓

**Objetivo reproducible** http://127.0.0.1:8123/ · **Origen público de referencia** https://luismac2022.github.io/HUMAN/

La prueba sirvió dos copias locales con prefijos de versión y un puerto de prueba. Los enlaces locales de este informe usan el puerto de reproducción del stand.

**Parámetros** HUMAN STEM · human.stem.org@gmail.com · FES Acatlán · MAX_PAGES 50 · REPORT_LANGUAGE es · ALLOW_FORM_TESTS false · REPORT_BEYOND_SCOPE true.

**Parámetros faltantes** PREVIOUS_URLS (VIS-07), EXPECTED_GA_ID (EST-01), ATTESTATIONS (proceso y disponibilidad) y EXTRA_SOURCES (IMG-09).

Se verificaron robots, sitemap y portada. Ocho páginas de contenido y una sonda 404 componen la muestra. El dominio de referencia conserva la versión anterior.

[Fuente normativa CATIC, octubre de 2016](https://www.red-tic.unam.mx/recursos/2016/2016_Lineamiento_ConsejoAsesorTecnologiasInformacionComunicacion_01.pdf)

## Veredicto: NO CUMPLE

| Nivel | PASS | FAIL | PARTIAL | N/A | NOT-VERIFIED | NEEDS-HUMAN |
|---|---:|---:|---:|---:|---:|---:|
| M | 38 | 7 | 4 | 11 | 6 | 7 |
| M* | 3 | 0 | 1 | 2 | 0 | 0 |
| S | 3 | 0 | 0 | 2 | 0 | 0 |
| R | 9 | 0 | 3 | 5 | 1 | 1 |

## Incumplimientos obligatorios (M y M*)

- **ACC-07 · PARTIAL**. http://127.0.0.1:8123/miltli.html — Jerarquía de encabezados válida. Miltli usa una plantilla de cabecera y pie diferente. Integrar Miltli con la plantilla común.
- **CLA-10 · FAIL**. http://127.0.0.1:8123/creditos.html — Las páginas de créditos, mapa y política usan un fondo oscuro para la lectura. D4 cubre los proyectos, no estas páginas. Usar fondo claro y texto oscuro en los documentos de apoyo. D4
- **COD-01 · PARTIAL**. http://127.0.0.1:8123/index.html — Nu Html Checker local registró 0 errores HTML y 30 diagnósticos CSS. El validador marca reglas modernas, entre ellas @view-transition y container-type. Revisar el perfil CSS de la feria y conservar la mejora progresiva probada en Chromium. CF-05 · CF-07
- **COH-02 · PARTIAL**. http://127.0.0.1:8123/miltli.html#final — «Nos vemos arriba» exige inferir el destino #superficie. Nombrar el destino como «Volver a la superficie».
- **CON-08 · FAIL**. http://127.0.0.1:8123/index.html — La portada carece de dirección postal y enlace a mapa. La dirección quedó pendiente de confirmación. Añadir la dirección y el mapa tras recibir los datos aprobados.
- **EST-01 · FAIL**. http://127.0.0.1:8123/index.html — La muestra no incorpora GA4 ni GTM. El proyecto carece del identificador institucional. Registrar D5. No se incorpora una etiqueta sin el identificador institucional. CF-03 · D5
- **IMG-07 · FAIL**. http://127.0.0.1:8123/index.html — La leyenda identifica a HUMAN STEM y utiliza human.stem.org@gmail.com. La regla pide dominio unam.mx. Mantener el correo aprobado mientras se aclara el requisito para una asociación externa.
- **NAV-03 · FAIL**. http://127.0.0.1:8123/index.html — Los dos enlaces institucionales están ausentes en los ocho pies. Añadir los dos enlaces según D6. D6
- **PLA-02 · PARTIAL**. http://127.0.0.1:8123/mapa-del-sitio.html — El mapa contiene reglas tipográficas en un bloque style. Mover el bloque a atlas.css.
- **RET-01 · PARTIAL**. http://127.0.0.1:8123/miltli.html — Los puntos de profundidad se ocultan a 390 px. En esa anchura queda la lectura numérica, con menos contexto de la sección. Mostrar los controles de profundidad también en móvil.
- **VIS-08 · FAIL**. https://luismac2022.github.io/HUMAN/sitemap.xml — Sitemap local XML válido con siete loc. En GitHub Pages, sitemap.xml, mapa-del-sitio.html, creditos.html y en/index.html responden 404. Publicar el XML y los documentos faltantes en el origen público cuando se apruebe la versión.
- **VIS-11 · FAIL**. https://luismac2022.github.io/HUMAN/ — El origen público usa github.io. El dominio de revisión tampoco pertenece a unam.mx. Registrar la excepción de la asociación externa. D3

## Observaciones (S) y sugerencias (R)

- **CTL-03 · NOT-VERIFIED**. http://127.0.0.1:8123/index.html — El viewport permite zoom. Prueba de ampliación pendiente.
- **CON-03 · PARTIAL**. http://127.0.0.1:8123/index.html#equipo — La cita de Iñaki Moreno supera 30 palabras. Se conserva por indicación de la asociación.
- **EST-03 · PARTIAL**. http://127.0.0.1:8123/index.html — Inventario de 11 archivos HTML y 1 PDF. Las métricas de uso requieren datos de la asociación.
- **NAV-10 · PARTIAL**. http://127.0.0.1:8123/sitemap.xml — Siete páginas del XML accesibles desde Inicio. 404.html se usa como página de error. Tres archivos históricos redirigen y carecen de un enlace desde Inicio.

## Preguntas para la persona responsable del sitio (NEEDS-HUMAN)

- **COD-01** ¿Qué perfil de validación CSS acepta la feria para propiedades de contenedor y View Transitions?
- **CON-08** ¿Qué dirección de la asociación y qué enlace de mapa se pueden mostrar en la portada?
- **IMG-07** ¿Existe una cuenta institucional autorizada para la leyenda en el pie?
- **NAV-03** ¿La organización de la feria aprueba la redacción de la línea que identifica a FES Acatlán y UNAM?
- **VIS-08** ¿Cuándo se publicarán el sitemap y las tres páginas que devuelven 404 en el dominio de referencia?
- **CON-06** ¿Quién revisa la vigencia de los contenidos y del formulario de reclutamiento, y cuándo los revisó por última vez?
- **EST-02** ¿Se revisan estadísticas de navegación y, en ese caso, quién las revisa y qué cambio produjo la última revisión?
- **FUN-03** ¿Hay un informe de disponibilidad o monitoreo del dominio público que se pueda aportar?
- **NAV-11** ¿Quién revisa los vínculos, con qué herramienta y cada cuánto?
- **RET-03** ¿Qué pantalla confirma un envío válido en el formulario externo? ¿Se puede aportar una captura?
- **SOP-03** ¿Quién gestiona, revisa, diseña, desarrolla y publica el contenido?
- **USE-01** ¿Qué validaciones con visitantes o personas expertas se hicieron durante la planificación y en qué fechas?
- **CLA-12** ¿Se puede confirmar el menú y el buscador en Firefox y Safari con el mismo protocolo?
- **IMG-09** ¿Qué documento de identidad digital corresponde a esta asociación externa, si la feria exige alguno?
- **EST-03** ¿Se dispone de un informe agregado de visitas y de fuentes de tráfico?

## Conflictos del lineamiento aplicados (CF-xx → decisión usada)

- **CF-01** Leyenda verificada en las ocho páginas.
- **CF-02** Créditos requeridos en el pie.
- **CF-03** GA4 como equivalente. Se documenta D5.
- **CF-04** D8, una pantalla a 1024 × 768.
- **CF-05** Se revisaron marcado, CSS y la página 404.
- **CF-06** Axe WCAG 2.2 AA y comprobaciones de teclado.
- **CF-07** Equivalentes de navegador, HTML, Flash, longdesc y analítica.
- **CF-08** La entrevista es un vínculo externo.
- **CF-09** Prevalece la lista de verificación.
- **CF-10** Se revisó la portada inglesa.
- **D1** IMG-01 a IMG-04. Asociación externa. Se conserva el logotipo de HUMAN STEM.
- **D2** VIS-05. Los títulos conservan la identidad de la asociación.
- **D3** VIS-11. El dominio de referencia público es GitHub Pages y la copia de revisión es privada.
- **D4** CLA-10. Se admiten el cielo nocturno y el subsuelo oscuro con el umbral de contraste.
- **D5** EST-01. La asociación carece de un identificador institucional de Google Analytics.
- **D6** NAV-03. Se aplicó la línea y los enlaces del borrador en la revisión. La redacción queda por validar con la feria.
- **D7** VIS-10. El sitio carece de una sección de noticias o eventos periódicos.
- **D8** CLA-11. La prueba de una sola pantalla usa 1024 × 768.

## Fuera de alcance

- La copia de revisión usa acceso privado. La disponibilidad de los enlaces públicos de referencia se evaluó por separado.
- La reproducción local no requiere conexiones a terceros. El correo, las redes, el formulario y la guía externa se abren por acción de la persona visitante.
- Las redirecciones históricas se conservan para enlaces anteriores. La sonda 404 se comprobó con GET.

## Anexo A — páginas muestreadas

| URL | Profundidad | Estado HTTP |
|---|---:|---:|
| http://127.0.0.1:8123/index.html | 0 | 200 |
| http://127.0.0.1:8123/superman.html | 1 | 200 |
| http://127.0.0.1:8123/miltli.html | 1 | 200 |
| http://127.0.0.1:8123/mapa-del-sitio.html | 1 | 200 |
| http://127.0.0.1:8123/creditos.html | 1 | 200 |
| http://127.0.0.1:8123/uso-responsable-ia.html | 1 | 200 |
| http://127.0.0.1:8123/404.html | Sonda | 200 |
| http://127.0.0.1:8123/en/index.html | 1 | 200 |
| https://luismac2022.github.io/HUMAN/catic-404-check | Sonda | 404 |

## Anexo B — tabla completa

| ID | Nivel | Estado | Páginas | Evidencia |
|---|---|---|---|---|
| ACC-07 | M* | PARTIAL | 7/8 | http://127.0.0.1:8123/miltli.html — Jerarquía de encabezados válida. Miltli usa una plantilla de cabecera y pie diferente. |
| CLA-10 | M | FAIL | 3/7 con excepción o fondo claro | http://127.0.0.1:8123/creditos.html — Las páginas de créditos, mapa y política usan un fondo oscuro para la lectura. D4 cubre los proyectos, no estas páginas. |
| COD-01 | M | PARTIAL | — | http://127.0.0.1:8123/index.html — Nu Html Checker local registró 0 errores HTML y 30 diagnósticos CSS. El validador marca reglas modernas, entre ellas @view-transition y container-type. |
| COH-02 | M | PARTIAL | — | http://127.0.0.1:8123/miltli.html#final — «Nos vemos arriba» exige inferir el destino #superficie. |
| CON-08 | M | FAIL | — | http://127.0.0.1:8123/index.html — La portada carece de dirección postal y enlace a mapa. La dirección quedó pendiente de confirmación. |
| EST-01 | M | FAIL | 0/8 | http://127.0.0.1:8123/index.html — La muestra no incorpora GA4 ni GTM. El proyecto carece del identificador institucional. |
| IMG-07 | M | FAIL | 0/8 cumplen el dominio | http://127.0.0.1:8123/index.html — La leyenda identifica a HUMAN STEM y utiliza human.stem.org@gmail.com. La regla pide dominio unam.mx. |
| NAV-03 | M | FAIL | 0/8 | http://127.0.0.1:8123/index.html — Los dos enlaces institucionales están ausentes en los ocho pies. |
| PLA-02 | M | PARTIAL | — | http://127.0.0.1:8123/mapa-del-sitio.html — El mapa contiene reglas tipográficas en un bloque style. |
| RET-01 | M | PARTIAL | — | http://127.0.0.1:8123/miltli.html — Los puntos de profundidad se ocultan a 390 px. En esa anchura queda la lectura numérica, con menos contexto de la sección. |
| VIS-08 | M | FAIL | 4/7 loc HTTP 200 | https://luismac2022.github.io/HUMAN/sitemap.xml — Sitemap local XML válido con siete loc. En GitHub Pages, sitemap.xml, mapa-del-sitio.html, creditos.html y en/index.html responden 404. |
| VIS-11 | M | FAIL | — | https://luismac2022.github.io/HUMAN/ — El origen público usa github.io. El dominio de revisión tampoco pertenece a unam.mx. |
| ACC-01 | M | NEEDS-HUMAN | 8/8 | http://127.0.0.1:8123/index.html — Axe sin violaciones en 8 páginas. La ronda manual de ampliación y controles se reservó para la entrega. |
| CON-06 | M | NEEDS-HUMAN | — | http://127.0.0.1:8123/miltli.html#profundidad — La convocatoria se identifica como de septiembre de 2026 y remite al equipo para confirmar su vigencia. |
| EST-02 | M | NEEDS-HUMAN | — | http://127.0.0.1:8123/index.html — Pendiente el proceso de revisión de estadísticas. |
| FUN-03 | M | NEEDS-HUMAN | — | https://luismac2022.github.io/HUMAN/ — GET de la portada pública: 200. El seguimiento de disponibilidad continua requiere evidencia adicional. |
| NAV-11 | M | NEEDS-HUMAN | 8/8 en la muestra | http://127.0.0.1:8123/index.html — El rastreo local encontró cero archivos o anclas rotos. Falta la práctica periódica de revisión. |
| RET-03 | M | NEEDS-HUMAN | — | http://127.0.0.1:8123/miltli.html#profundidad — Se inspeccionó el enlace de Google Forms con GET. Falta comprobar la pantalla de confirmación de ese servicio. |
| SOP-03 | R | NEEDS-HUMAN | — | http://127.0.0.1:8123/index.html — Falta identificar las personas responsables de edición y mantenimiento. |
| USE-01 | M | NEEDS-HUMAN | — | http://127.0.0.1:8123/index.html — Pruebas de esta entrega documentadas en las capturas. Pendiente el registro del proceso de planificación. |
| ACC-03 | M | NOT-VERIFIED | — | http://127.0.0.1:8123/index.html — Contenido presente en HTML. La navegación desactivada se comprobó en la versión final. |
| ANI-03 | M | NOT-VERIFIED | — | http://127.0.0.1:8123/miltli.html — Alternativas presentes en la fuente. La prueba de navegador sin JavaScript se realizó en la versión final. |
| CLA-12 | M | NOT-VERIFIED | — | http://127.0.0.1:8123/index.html — Chromium 153 comprobado. Queda pendiente reproducir la prueba en Gecko y WebKit. |
| CTL-03 | R | NOT-VERIFIED | — | http://127.0.0.1:8123/index.html — El viewport permite zoom. Prueba de ampliación pendiente. |
| FUN-06 | M | NOT-VERIFIED | — | http://127.0.0.1:8123/miltli.html — Hay reglas @media print y un PDF. Falta una captura de impresión de la línea base. |
| IMG-09 | M | NOT-VERIFIED | — | http://127.0.0.1:8123/index.html — No se aportaron lineamientos adicionales de identidad como EXTRA_SOURCES. |
| NAV-06 | M | NOT-VERIFIED | — | http://127.0.0.1:8123/mapa-del-sitio.html?q=composta — Buscador disponible en el pie y filtro presente en la fuente. La interacción de la línea base quedó pendiente. |
| ACC-04 | S | PASS | — | http://127.0.0.1:8123/miltli.html — Miltli a 390 px: cuerpo 16px, interlínea normal y familia "Trebuchet MS", Arial, sans-serif. |
| CLA-06 | S | PASS | — | http://127.0.0.1:8123/miltli.html#raices — Párrafos, listas de materiales y controles están agrupados por etapa. |
| CTL-01 | S | N/A | — | http://127.0.0.1:8123/miltli.html — Guía de lectura y demostraciones explorables sin un proceso de envío local. |
| RET-02 | S | PASS | — | http://127.0.0.1:8123/index.html#colabora — Correo de contacto en la sección Colabora y en los pies. |
| SOP-02 | S | N/A | — | http://127.0.0.1:8123/index.html — Sitio estático sin complementos de CMS. |
| ACC-05 | R | N/A | — | http://127.0.0.1:8123/superman.html#entrevista — Enlace a entrevista externa, sin reproductor ni audio incrustado. |
| CLA-02 | R | PASS | — | http://127.0.0.1:8123/index.html — La muestra de 1024 × 768 deja espacio entre encabezados, controles y pie. |
| CLA-05 | R | PASS | — | http://127.0.0.1:8123/index.html — Mayúsculas reservadas para rótulos, cursiva para énfasis y citas, negrita para etiquetas. |
| CLA-08 | R | PASS | — | http://127.0.0.1:8123/superman.html — Constelación y navegación de profundidad enlazan con las secciones de los proyectos. |
| COH-01 | R | PASS | — | http://127.0.0.1:8123/index.html — La navegación y los títulos identifican Proyecto Superman y Programa Miltli de manera consistente. |
| CON-02 | R | PASS | — | http://127.0.0.1:8123/index.html — Cada proyecto reúne su explicación y sus recursos en una página. |
| CON-03 | R | PARTIAL | — | http://127.0.0.1:8123/index.html#equipo — La cita de Iñaki Moreno supera 30 palabras. Se conserva por indicación de la asociación. |
| CON-04 | R | PASS | — | http://127.0.0.1:8123/superman.html#glosario — El glosario define EMG, músculos antagonistas y umbral. |
| CON-07 | R | N/A | — | http://127.0.0.1:8123/en/index.html — El sitio carece de un servicio de traducción automática. Se ofrece la portada en inglés. |
| EST-03 | R | PARTIAL | — | http://127.0.0.1:8123/index.html — Inventario de 11 archivos HTML y 1 PDF. Las métricas de uso requieren datos de la asociación. |
| IMG-10 | R | PASS | 8/8 | http://127.0.0.1:8123/index.html — Cabeceras intactas a 1024 × 768, con los cuatro enlaces principales visibles. |
| NAV-07 | R | PASS | — | http://127.0.0.1:8123/index.html — Créditos, mapa, ambos proyectos, portada inglesa y política se alcanzan desde la portada en un clic. |
| NAV-10 | R | PARTIAL | 7/11 archivos HTML | http://127.0.0.1:8123/sitemap.xml — Siete páginas del XML accesibles desde Inicio. 404.html se usa como página de error. Tres archivos históricos redirigen y carecen de un enlace desde Inicio. |
| PLA-01 | R | N/A | — | http://127.0.0.1:8123/index.html — No se utiliza imagen de título institucional de la UNAM. El logotipo propio usa SVG. |
| RET-04 | R | N/A | — | http://127.0.0.1:8123/index.html — PDF por enlace y diagramas SVG nativos, sin complementos. |
| VIS-06 | R | PASS | — | http://127.0.0.1:8123/miltli.html#final — Descarga de la guía de compostaje en PDF para consulta sin conexión. |
| VIS-07 | R | N/A | — | http://127.0.0.1:8123/index.html — No se proporcionó una lista formal PREVIOUS_URLS. Se conservaron tres redirecciones históricas y las anclas de misión y visión. |
| ACC-02 | M | PASS | — | http://127.0.0.1:8123/miltli.html — Sin destellos rápidos. Animaciones del sitio limitadas y navegación con movimiento reducido. |
| ACC-08 | M* | PASS | — | http://127.0.0.1:8123/superman.html#funcionamiento — El simulador tiene leyenda y explicación. La guía presenta las capas y cuidados por escrito junto a las figuras. |
| ACC-09 | M* | PASS | — | http://127.0.0.1:8123/superman.html#funcionamiento — La explicación de músculos y la guía de capas están disponibles en el HTML aunque sus demostraciones sean interactivas. |
| ANI-01 | M | PASS | 8/8 | http://127.0.0.1:8123/index.html — No hay recursos Flash. La navegación está en enlaces HTML. |
| AYU-01 | M | PASS | — | http://127.0.0.1:8123/superman.html#funcionamiento — La página se recorre por enlaces nombrados. Los controles de la prótesis tienen instrucciones junto al simulador. |
| AYU-02 | M | PASS | — | http://127.0.0.1:8123/miltli.html#huellas — Las instrucciones del simulador y de compostaje se ubican junto a la tarea. |
| CLA-01 | M | PASS | — | http://127.0.0.1:8123/index.html — Las capturas permiten identificar la cabecera, las entradas a cada proyecto y la información de la portada. |
| CLA-03 | M | PASS | — | http://127.0.0.1:8123/miltli.html — El vaivén responde al desplazamiento y la constelación cambia con la sección. Las nubes se desactivan y la flecha decorativa tiene tres repeticiones. |
| CLA-04 | M | PASS | 8/8 | http://127.0.0.1:8123/miltli.html — Los enlaces corridos tienen un color :visited distinto en la capa común y en la guía. |
| CLA-07 | M | PASS | — | http://127.0.0.1:8123/index.html#quienes-somos — Párrafos cortos y listas para los procedimientos. El texto de misión y visión se conserva íntegro. |
| CLA-09 | M | PASS | — | http://127.0.0.1:8123/miltli.html#final — Los enlaces de lectura del mapa, del texto y del PDF se distinguen con subrayado. |
| CLA-11 | M | PASS | 2/2 | http://127.0.0.1:8123/index.html — 1024 × 768. Altura de documento ES 768 px y EN 768 px. |
| COH-03 | M | PASS | 8/8 | http://127.0.0.1:8123/index.html — Ocho títulos únicos, descriptivos y de hasta 70 caracteres. |
| CON-01 | M | PASS | — | http://127.0.0.1:8123/index.html — La captura a 1024 × 768 muestra la entrada institucional y enlaces a los dos proyectos en la escena inicial. |
| CON-05 | M | PASS | — | http://127.0.0.1:8123/miltli.html#raices — Miltli explica los materiales domésticos con ejemplos. Superman acompaña el simulador con definiciones. |
| ERR-01 | M | PASS | — | https://luismac2022.github.io/HUMAN/catic-404-check — La ruta inexistente en el dominio público devuelve 404. El archivo local 404.html muestra el mensaje visible. |
| ERR-02 | M | PASS | — | http://127.0.0.1:8123/404.html — El 404 describe el problema y da acceso a la portada y al mapa. |
| ERR-03 | M | PASS | — | http://127.0.0.1:8123/404.html — La página de error incluye salida al Inicio, mapa y correo. La sonda del dominio público devuelve 404. |
| FUN-01 | M | PASS | — | http://127.0.0.1:8123/index.html — Abrir el proyecto, consultar la guía y ubicar contacto requieren un clic desde la portada. |
| FUN-02 | M | PASS | — | http://127.0.0.1:8123/miltli.html — La guía y el simulador se identifican por su proyecto. El formulario de reclutamiento conserva su texto de destino. |
| FUN-04 | M | PASS | 8/8 | http://127.0.0.1:8123/index.html — Cero object, embed y applet en la muestra. El PDF se ofrece mediante un enlace. |
| FUN-05 | M* | PASS | 8/8 | http://127.0.0.1:8123/index.html — Cero frames e iframes en la muestra. |

| IDI-01 | M | PASS | — | http://127.0.0.1:8123/en/index.html — Portada completa en inglés. Los dos proyectos del stand están en español y su enlace indica el idioma en la portada inglesa. |

| IDI-02 | M | PASS | — | http://127.0.0.1:8123/en/index.html — English en el pie y Español en el pie inglés, con hreflang. |

| IDI-03 | M | PASS | — | http://127.0.0.1:8123/en/index.html — Portada y etiquetas inglesas revisadas. La organización y los nombres propios conservan la referencia en español. |
| IMG-05 | M | PASS | 8/8 | http://127.0.0.1:8123/index.html — Ocho páginas de contenido incluyen pie con leyenda. |
| IMG-06 | M | PASS | 8/8 | http://127.0.0.1:8123/index.html — Los ocho pies muestran © 2026 HUMAN STEM. |
| IMG-08 | M | PASS | 8/8 | http://127.0.0.1:8123/creditos.html — Créditos desde el pie de las ocho páginas. |
| NAV-01 | M | PASS | 2/2 rutas de proyecto | http://127.0.0.1:8123/superman.html — Profundidad máxima de la muestra enlazada: 1. Los dos proyectos incluyen Inicio y el proyecto actual en nav.ruta. |
| NAV-02 | M | PASS | 8/8 | http://127.0.0.1:8123/index.html — Logotipo con alternativa de HUMAN STEM que apunta a index.html en las ocho cabeceras. |
| NAV-04 | M | PASS | — | http://127.0.0.1:8123/index.html — Desde la cabecera hay enlaces directos a la asociación, ambos proyectos y la colaboración. |
| NAV-05 | M | PASS | — | http://127.0.0.1:8123/mapa-del-sitio.html — Mapa HTML con listas de enlaces y acceso directo desde el pie. |
| NAV-08 | M | PASS | 8/8 | http://127.0.0.1:8123/index.html — Los ocho menús contienen Quiénes somos, Proyecto Superman, Programa Miltli y Colabora, con equivalentes en inglés. |
| NAV-09 | M | PASS | — | http://127.0.0.1:8123/index.html — Quiénes somos identifica a la asociación, los proyectos nombran actividades, Colabora indica participación. |
| RET-05 | M | PASS | 8/8 | http://127.0.0.1:8123/index.html — Los ocho pies muestran la fecha 2026-11-09. Antigüedad de 1 día. |
| VIS-01 | M | PASS | 8/8 | http://127.0.0.1:8123/index.html — Meta keywords no vacías y pertinentes. Las etiquetas originales se conservaron. |
| VIS-02 | M | PASS | 8/8 | http://127.0.0.1:8123/index.html — Ocho meta descriptions específicas, todas conservadas. |
| VIS-03 | M | PASS | 8/8 | http://127.0.0.1:8123/index.html — Rutas primarias semánticas. El alias histórico con guiones bajos queda fuera de la muestra. |
| VIS-04 | M | PASS | 8/8 | http://127.0.0.1:8123/index.html — Todas las imágenes tienen alt. El logo identifica el sitio y el paisaje decorativo usa alt vacío. |
| VIS-09 | M | PASS | — | https://luismac2022.github.io/HUMAN/ — Metadatos pertinentes. El texto solo para lector anuncia controles y la portada pública coincide para los dos agentes HTTP. |
| VIS-12 | M | PASS | — | http://127.0.0.1:8123/index.html — Los enlaces públicos y metadatos usan nombres de dominio. La IP corresponde solo al servidor de pruebas. |
| ACC-06 | M* | N/A | — | http://127.0.0.1:8123/index.html — No hay mapas de imagen HTML. |
| ACC-10 | M* | N/A | — | http://127.0.0.1:8123/index.html — La muestra carece de tablas de datos o de diseño. |
| ANI-02 | M | N/A | — | http://127.0.0.1:8123/index.html — Equivalencia obsoleta cubierta por ANI-01. |
| CTL-02 | M | N/A | — | http://127.0.0.1:8123/index.html — El contenido auditado carece de servicios propios con autenticación. |
| IMG-01 | M | N/A | — | http://127.0.0.1:8123/index.html — D1. La asociación externa utiliza su propia identidad y no se presenta como dependencia de la UNAM. |
| IMG-02 | M | N/A | — | http://127.0.0.1:8123/index.html — D1. La asociación externa utiliza su propia identidad y no se presenta como dependencia de la UNAM. |
| IMG-03 | M | N/A | — | http://127.0.0.1:8123/index.html — D1. La asociación externa utiliza su propia identidad y no se presenta como dependencia de la UNAM. |
| IMG-04 | M | N/A | — | http://127.0.0.1:8123/index.html — D1. La asociación externa utiliza su propia identidad y no se presenta como dependencia de la UNAM. |
| IMG-11 | M | N/A | — | http://127.0.0.1:8123/index.html — La composición institucional del escudo corresponde a D1. La cabecera propia se probó a las anchuras de la muestra. |
| SOP-01 | M | N/A | — | http://127.0.0.1:8123/index.html — Sitio estático sin CMS. |
| VIS-05 | M | N/A | — | http://127.0.0.1:8123/index.html — D2. La asociación externa conserva su nombre en los títulos. |
| VIS-10 | M | N/A | — | http://127.0.0.1:8123/index.html — D7. Carece de publicaciones periódicas y el XML lista páginas estables. |
| VIS-13 | M | N/A | — | http://127.0.0.1:8123/superman.html#entrevista — La entrevista sale a Instagram mediante un enlace. La muestra carece de medios incrustados. |

## Anexo C — JSON

```json
{
  "protocol": "catic-2016/v1.0",
  "target": "http://127.0.0.1:8123/",
  "date": "2026-11-10",
  "verdict": "NO_CUMPLE",
  "capabilities": [
    "FETCH",
    "RENDER",
    "EXEC",
    "SOURCE"
  ],
  "sample_size": 9,
  "results": [
    {
      "id": "ACC-07",
      "level": "M*",
      "status": "PARTIAL",
      "pages": "7/8",
      "evidence": "http://127.0.0.1:8123/miltli.html — Jerarquía de encabezados válida. Miltli usa una plantilla de cabecera y pie diferente.",
      "fix": "Integrar Miltli con la plantilla común.",
      "conflict": null,
      "attested": null
    },
    {
      "id": "CLA-10",
      "level": "M",
      "status": "FAIL",
      "pages": "3/7 con excepción o fondo claro",
      "evidence": "http://127.0.0.1:8123/creditos.html — Las páginas de créditos, mapa y política usan un fondo oscuro para la lectura. D4 cubre los proyectos, no estas páginas.",
      "fix": "Usar fondo claro y texto oscuro en los documentos de apoyo.",
      "conflict": "D4",
      "attested": null
    },
    {
      "id": "COD-01",
      "level": "M",
      "status": "PARTIAL",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Nu Html Checker local registró 0 errores HTML y 30 diagnósticos CSS. El validador marca reglas modernas, entre ellas @view-transition y container-type.",
      "fix": "Revisar el perfil CSS de la feria y conservar la mejora progresiva probada en Chromium.",
      "conflict": "CF-05 · CF-07",
      "attested": null
    },
    {
      "id": "COH-02",
      "level": "M",
      "status": "PARTIAL",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html#final — «Nos vemos arriba» exige inferir el destino #superficie.",
      "fix": "Nombrar el destino como «Volver a la superficie».",
      "conflict": null,
      "attested": null
    },
    {
      "id": "CON-08",
      "level": "M",
      "status": "FAIL",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — La portada carece de dirección postal y enlace a mapa. La dirección quedó pendiente de confirmación.",
      "fix": "Añadir la dirección y el mapa tras recibir los datos aprobados.",
      "conflict": null,
      "attested": null
    },
    {
      "id": "EST-01",
      "level": "M",
      "status": "FAIL",
      "pages": "0/8",
      "evidence": "http://127.0.0.1:8123/index.html — La muestra no incorpora GA4 ni GTM. El proyecto carece del identificador institucional.",
      "fix": "Registrar D5. No se incorpora una etiqueta sin el identificador institucional.",
      "conflict": "CF-03 · D5",
      "attested": null
    },
    {
      "id": "IMG-07",
      "level": "M",
      "status": "FAIL",
      "pages": "0/8 cumplen el dominio",
      "evidence": "http://127.0.0.1:8123/index.html — La leyenda identifica a HUMAN STEM y utiliza human.stem.org@gmail.com. La regla pide dominio unam.mx.",
      "fix": "Mantener el correo aprobado mientras se aclara el requisito para una asociación externa.",
      "conflict": null,
      "attested": null
    },
    {
      "id": "NAV-03",
      "level": "M",
      "status": "FAIL",
      "pages": "0/8",
      "evidence": "http://127.0.0.1:8123/index.html — Los dos enlaces institucionales están ausentes en los ocho pies.",
      "fix": "Añadir los dos enlaces según D6.",
      "conflict": "D6",
      "attested": null
    },
    {
      "id": "PLA-02",
      "level": "M",
      "status": "PARTIAL",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/mapa-del-sitio.html — El mapa contiene reglas tipográficas en un bloque style.",
      "fix": "Mover el bloque a atlas.css.",
      "conflict": null,
      "attested": null
    },
    {
      "id": "RET-01",
      "level": "M",
      "status": "PARTIAL",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html — Los puntos de profundidad se ocultan a 390 px. En esa anchura queda la lectura numérica, con menos contexto de la sección.",
      "fix": "Mostrar los controles de profundidad también en móvil.",
      "conflict": null,
      "attested": null
    },
    {
      "id": "VIS-08",
      "level": "M",
      "status": "FAIL",
      "pages": "4/7 loc HTTP 200",
      "evidence": "https://luismac2022.github.io/HUMAN/sitemap.xml — Sitemap local XML válido con siete loc. En GitHub Pages, sitemap.xml, mapa-del-sitio.html, creditos.html y en/index.html responden 404.",
      "fix": "Publicar el XML y los documentos faltantes en el origen público cuando se apruebe la versión.",
      "conflict": null,
      "attested": null
    },
    {
      "id": "VIS-11",
      "level": "M",
      "status": "FAIL",
      "pages": null,
      "evidence": "https://luismac2022.github.io/HUMAN/ — El origen público usa github.io. El dominio de revisión tampoco pertenece a unam.mx.",
      "fix": "Registrar la excepción de la asociación externa.",
      "conflict": "D3",
      "attested": null
    },
    {
      "id": "ACC-01",
      "level": "M",
      "status": "NEEDS-HUMAN",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Axe sin violaciones en 8 páginas. La ronda manual de ampliación y controles se reservó para la entrega.",
      "fix": null,
      "conflict": "CF-06",
      "attested": null
    },
    {
      "id": "CON-06",
      "level": "M",
      "status": "NEEDS-HUMAN",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html#profundidad — La convocatoria se identifica como de septiembre de 2026 y remite al equipo para confirmar su vigencia.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "EST-02",
      "level": "M",
      "status": "NEEDS-HUMAN",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Pendiente el proceso de revisión de estadísticas.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "FUN-03",
      "level": "M",
      "status": "NEEDS-HUMAN",
      "pages": null,
      "evidence": "https://luismac2022.github.io/HUMAN/ — GET de la portada pública: 200. El seguimiento de disponibilidad continua requiere evidencia adicional.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "NAV-11",
      "level": "M",
      "status": "NEEDS-HUMAN",
      "pages": "8/8 en la muestra",
      "evidence": "http://127.0.0.1:8123/index.html — El rastreo local encontró cero archivos o anclas rotos. Falta la práctica periódica de revisión.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "RET-03",
      "level": "M",
      "status": "NEEDS-HUMAN",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html#profundidad — Se inspeccionó el enlace de Google Forms con GET. Falta comprobar la pantalla de confirmación de ese servicio.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "SOP-03",
      "level": "R",
      "status": "NEEDS-HUMAN",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Falta identificar las personas responsables de edición y mantenimiento.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "USE-01",
      "level": "M",
      "status": "NEEDS-HUMAN",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Pruebas de esta entrega documentadas en las capturas. Pendiente el registro del proceso de planificación.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ACC-03",
      "level": "M",
      "status": "NOT-VERIFIED",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Contenido presente en HTML. La navegación desactivada se comprobó en la versión final.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ANI-03",
      "level": "M",
      "status": "NOT-VERIFIED",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html — Alternativas presentes en la fuente. La prueba de navegador sin JavaScript se realizó en la versión final.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CLA-12",
      "level": "M",
      "status": "NOT-VERIFIED",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Chromium 153 comprobado. Queda pendiente reproducir la prueba en Gecko y WebKit.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CTL-03",
      "level": "R",
      "status": "NOT-VERIFIED",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — El viewport permite zoom. Prueba de ampliación pendiente.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "FUN-06",
      "level": "M",
      "status": "NOT-VERIFIED",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html — Hay reglas @media print y un PDF. Falta una captura de impresión de la línea base.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "IMG-09",
      "level": "M",
      "status": "NOT-VERIFIED",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — No se aportaron lineamientos adicionales de identidad como EXTRA_SOURCES.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "NAV-06",
      "level": "M",
      "status": "NOT-VERIFIED",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/mapa-del-sitio.html?q=composta — Buscador disponible en el pie y filtro presente en la fuente. La interacción de la línea base quedó pendiente.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ACC-04",
      "level": "S",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html — Miltli a 390 px: cuerpo 16px, interlínea normal y familia \"Trebuchet MS\", Arial, sans-serif.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CLA-06",
      "level": "S",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html#raices — Párrafos, listas de materiales y controles están agrupados por etapa.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CTL-01",
      "level": "S",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html — Guía de lectura y demostraciones explorables sin un proceso de envío local.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "RET-02",
      "level": "S",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html#colabora — Correo de contacto en la sección Colabora y en los pies.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "SOP-02",
      "level": "S",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Sitio estático sin complementos de CMS.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ACC-05",
      "level": "R",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/superman.html#entrevista — Enlace a entrevista externa, sin reproductor ni audio incrustado.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CLA-02",
      "level": "R",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — La muestra de 1024 × 768 deja espacio entre encabezados, controles y pie.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CLA-05",
      "level": "R",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Mayúsculas reservadas para rótulos, cursiva para énfasis y citas, negrita para etiquetas.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CLA-08",
      "level": "R",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/superman.html — Constelación y navegación de profundidad enlazan con las secciones de los proyectos.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "COH-01",
      "level": "R",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — La navegación y los títulos identifican Proyecto Superman y Programa Miltli de manera consistente.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CON-02",
      "level": "R",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Cada proyecto reúne su explicación y sus recursos en una página.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CON-03",
      "level": "R",
      "status": "PARTIAL",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html#equipo — La cita de Iñaki Moreno supera 30 palabras. Se conserva por indicación de la asociación.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CON-04",
      "level": "R",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/superman.html#glosario — El glosario define EMG, músculos antagonistas y umbral.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CON-07",
      "level": "R",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/en/index.html — El sitio carece de un servicio de traducción automática. Se ofrece la portada en inglés.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "EST-03",
      "level": "R",
      "status": "PARTIAL",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Inventario de 11 archivos HTML y 1 PDF. Las métricas de uso requieren datos de la asociación.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "IMG-10",
      "level": "R",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Cabeceras intactas a 1024 × 768, con los cuatro enlaces principales visibles.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "NAV-07",
      "level": "R",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Créditos, mapa, ambos proyectos, portada inglesa y política se alcanzan desde la portada en un clic.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "NAV-10",
      "level": "R",
      "status": "PARTIAL",
      "pages": "7/11 archivos HTML",
      "evidence": "http://127.0.0.1:8123/sitemap.xml — Siete páginas del XML accesibles desde Inicio. 404.html se usa como página de error. Tres archivos históricos redirigen y carecen de un enlace desde Inicio.",
      "fix": "Conservar los alias para entradas históricas.",
      "conflict": null,
      "attested": null
    },
    {
      "id": "PLA-01",
      "level": "R",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — No se utiliza imagen de título institucional de la UNAM. El logotipo propio usa SVG.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "RET-04",
      "level": "R",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — PDF por enlace y diagramas SVG nativos, sin complementos.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "VIS-06",
      "level": "R",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html#final — Descarga de la guía de compostaje en PDF para consulta sin conexión.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "VIS-07",
      "level": "R",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — No se proporcionó una lista formal PREVIOUS_URLS. Se conservaron tres redirecciones históricas y las anclas de misión y visión.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ACC-02",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html — Sin destellos rápidos. Animaciones del sitio limitadas y navegación con movimiento reducido.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ACC-08",
      "level": "M*",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/superman.html#funcionamiento — El simulador tiene leyenda y explicación. La guía presenta las capas y cuidados por escrito junto a las figuras.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ACC-09",
      "level": "M*",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/superman.html#funcionamiento — La explicación de músculos y la guía de capas están disponibles en el HTML aunque sus demostraciones sean interactivas.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ANI-01",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — No hay recursos Flash. La navegación está en enlaces HTML.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "AYU-01",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/superman.html#funcionamiento — La página se recorre por enlaces nombrados. Los controles de la prótesis tienen instrucciones junto al simulador.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "AYU-02",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html#huellas — Las instrucciones del simulador y de compostaje se ubican junto a la tarea.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CLA-01",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Las capturas permiten identificar la cabecera, las entradas a cada proyecto y la información de la portada.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CLA-03",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html — El vaivén responde al desplazamiento y la constelación cambia con la sección. Las nubes se desactivan y la flecha decorativa tiene tres repeticiones.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CLA-04",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/miltli.html — Los enlaces corridos tienen un color :visited distinto en la capa común y en la guía.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CLA-07",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html#quienes-somos — Párrafos cortos y listas para los procedimientos. El texto de misión y visión se conserva íntegro.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CLA-09",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html#final — Los enlaces de lectura del mapa, del texto y del PDF se distinguen con subrayado.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CLA-11",
      "level": "M",
      "status": "PASS",
      "pages": "2/2",
      "evidence": "http://127.0.0.1:8123/index.html — 1024 × 768. Altura de documento ES 768 px y EN 768 px.",
      "fix": null,
      "conflict": "CF-04 · D8",
      "attested": null
    },
    {
      "id": "COH-03",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Ocho títulos únicos, descriptivos y de hasta 70 caracteres.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CON-01",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — La captura a 1024 × 768 muestra la entrada institucional y enlaces a los dos proyectos en la escena inicial.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "CON-05",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html#raices — Miltli explica los materiales domésticos con ejemplos. Superman acompaña el simulador con definiciones.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ERR-01",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "https://luismac2022.github.io/HUMAN/catic-404-check — La ruta inexistente en el dominio público devuelve 404. El archivo local 404.html muestra el mensaje visible.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ERR-02",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/404.html — El 404 describe el problema y da acceso a la portada y al mapa.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ERR-03",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/404.html — La página de error incluye salida al Inicio, mapa y correo. La sonda del dominio público devuelve 404.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "FUN-01",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Abrir el proyecto, consultar la guía y ubicar contacto requieren un clic desde la portada.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "FUN-02",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/miltli.html — La guía y el simulador se identifican por su proyecto. El formulario de reclutamiento conserva su texto de destino.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "FUN-04",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Cero object, embed y applet en la muestra. El PDF se ofrece mediante un enlace.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "FUN-05",
      "level": "M*",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Cero frames e iframes en la muestra.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "IDI-01",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/en/index.html — Portada completa en inglés. Los dos proyectos del stand están en español y su enlace indica el idioma en la portada inglesa.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "IDI-02",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/en/index.html — English en el pie y Español en el pie inglés, con hreflang.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "IDI-03",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/en/index.html — Portada y etiquetas inglesas revisadas. La organización y los nombres propios conservan la referencia en español.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "IMG-05",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Ocho páginas de contenido incluyen pie con leyenda.",
      "fix": null,
      "conflict": "CF-01",
      "attested": null
    },
    {
      "id": "IMG-06",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Los ocho pies muestran © 2026 HUMAN STEM.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "IMG-08",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/creditos.html — Créditos desde el pie de las ocho páginas.",
      "fix": null,
      "conflict": "CF-02",
      "attested": null
    },
    {
      "id": "NAV-01",
      "level": "M",
      "status": "PASS",
      "pages": "2/2 rutas de proyecto",
      "evidence": "http://127.0.0.1:8123/superman.html — Profundidad máxima de la muestra enlazada: 1. Los dos proyectos incluyen Inicio y el proyecto actual en nav.ruta.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "NAV-02",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Logotipo con alternativa de HUMAN STEM que apunta a index.html en las ocho cabeceras.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "NAV-04",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Desde la cabecera hay enlaces directos a la asociación, ambos proyectos y la colaboración.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "NAV-05",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/mapa-del-sitio.html — Mapa HTML con listas de enlaces y acceso directo desde el pie.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "NAV-08",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Los ocho menús contienen Quiénes somos, Proyecto Superman, Programa Miltli y Colabora, con equivalentes en inglés.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "NAV-09",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Quiénes somos identifica a la asociación, los proyectos nombran actividades, Colabora indica participación.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "RET-05",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Los ocho pies muestran la fecha 2026-11-09. Antigüedad de 1 día.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "VIS-01",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Meta keywords no vacías y pertinentes. Las etiquetas originales se conservaron.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "VIS-02",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Ocho meta descriptions específicas, todas conservadas.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "VIS-03",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Rutas primarias semánticas. El alias histórico con guiones bajos queda fuera de la muestra.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "VIS-04",
      "level": "M",
      "status": "PASS",
      "pages": "8/8",
      "evidence": "http://127.0.0.1:8123/index.html — Todas las imágenes tienen alt. El logo identifica el sitio y el paisaje decorativo usa alt vacío.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "VIS-09",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "https://luismac2022.github.io/HUMAN/ — Metadatos pertinentes. El texto solo para lector anuncia controles y la portada pública coincide para los dos agentes HTTP.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "VIS-12",
      "level": "M",
      "status": "PASS",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Los enlaces públicos y metadatos usan nombres de dominio. La IP corresponde solo al servidor de pruebas.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ACC-06",
      "level": "M*",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — No hay mapas de imagen HTML.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ACC-10",
      "level": "M*",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — La muestra carece de tablas de datos o de diseño.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "ANI-02",
      "level": "M",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Equivalencia obsoleta cubierta por ANI-01.",
      "fix": null,
      "conflict": "CF-07",
      "attested": null
    },
    {
      "id": "CTL-02",
      "level": "M",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — El contenido auditado carece de servicios propios con autenticación.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "IMG-01",
      "level": "M",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — D1. La asociación externa utiliza su propia identidad y no se presenta como dependencia de la UNAM.",
      "fix": null,
      "conflict": "D1",
      "attested": null
    },
    {
      "id": "IMG-02",
      "level": "M",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — D1. La asociación externa utiliza su propia identidad y no se presenta como dependencia de la UNAM.",
      "fix": null,
      "conflict": "D1",
      "attested": null
    },
    {
      "id": "IMG-03",
      "level": "M",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — D1. La asociación externa utiliza su propia identidad y no se presenta como dependencia de la UNAM.",
      "fix": null,
      "conflict": "D1",
      "attested": null
    },
    {
      "id": "IMG-04",
      "level": "M",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — D1. La asociación externa utiliza su propia identidad y no se presenta como dependencia de la UNAM.",
      "fix": null,
      "conflict": "D1",
      "attested": null
    },
    {
      "id": "IMG-11",
      "level": "M",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — La composición institucional del escudo corresponde a D1. La cabecera propia se probó a las anchuras de la muestra.",
      "fix": null,
      "conflict": "D1",
      "attested": null
    },
    {
      "id": "SOP-01",
      "level": "M",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — Sitio estático sin CMS.",
      "fix": null,
      "conflict": null,
      "attested": null
    },
    {
      "id": "VIS-05",
      "level": "M",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — D2. La asociación externa conserva su nombre en los títulos.",
      "fix": null,
      "conflict": "D2",
      "attested": null
    },
    {
      "id": "VIS-10",
      "level": "M",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/index.html — D7. Carece de publicaciones periódicas y el XML lista páginas estables.",
      "fix": null,
      "conflict": "D7",
      "attested": null
    },
    {
      "id": "VIS-13",
      "level": "M",
      "status": "N/A",
      "pages": null,
      "evidence": "http://127.0.0.1:8123/superman.html#entrevista — La entrevista sale a Instagram mediante un enlace. La muestra carece de medios incrustados.",
      "fix": null,
      "conflict": null,
      "attested": null
    }
  ]
}
```
