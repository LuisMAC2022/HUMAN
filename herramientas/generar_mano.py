#!/usr/bin/env python3
"""Imprime el marcado SVG de la mano del simulador (superman.html).

Uso:  python3 herramientas/generar_mano.py

La mano se ve de perfil, con la palma hacia abajo y los dedos hacia la
derecha. Cada dedo es una cadena de tres falanges; cada articulación es un
<g> cuyo `transform="rotate(…)"` actualiza js/superman.js. El índice queda
al frente y junto al pulgar: así «señalar» se lee como un índice extendido
en horizontal y no como otro gesto.

Si cambias medidas aquí, copia la salida dentro del grupo #mano de
superman.html y ajusta las posturas en js/superman.js.
"""

# nombre, (x, y) del nudillo, largos de falange, grosores, ángulos de reposo
DEDOS = [
    ("menique", (247, 236), (29, 19, 15), (10.5, 9.5, 8.5), (9, 6, 5)),
    ("anular", (250, 230), (37, 24, 18), (12, 11, 9.5), (4, 6, 5)),
    ("medio", (252, 224), (40, 26, 19), (12.5, 11.5, 10), (-1, 6, 5)),
    ("indice", (254, 217), (38, 25, 19), (13, 12, 10.5), (-6, 5, 4)),
]
PULGAR = ("pulgar", (222, 244), (28, 22), (13.5, 11.5), (30, 8))


def capsula(largo, grosor, punta=False):
    r = grosor / 2
    ancho = largo + (r if punta else grosor)
    return f'<rect x="{-r:g}" y="{-r:g}" width="{ancho:g}" height="{grosor:g}" rx="{r:g}"/>'


def dedo(nombre, origen, largos, grosores, reposo):
    x, y = origen
    lineas = [f'<g class="dedo dedo--{nombre}" transform="translate({x} {y})">']
    sangria = "  "
    cierres = []
    for i, (largo, grosor, angulo) in enumerate(zip(largos, grosores, reposo), start=1):
        ultima = i == len(largos)
        lineas.append(f'{sangria}<g id="{nombre}-{i}" transform="rotate({angulo})">')
        lineas.append(f'{sangria}  {capsula(largo, grosor, punta=ultima)}')
        if not ultima:
            lineas.append(f'{sangria}  <g transform="translate({largo} 0)">')
            cierres.append((sangria, largo))
            sangria += "    "
        else:
            lineas.append(f'{sangria}</g>')
    for sangria_previa, largo in reversed(cierres):
        lineas.append(f'{sangria_previa}  </g>')
        lineas.append(f'{sangria_previa}  <circle class="nudo" cx="{largo}" r="1.8"/>')
        lineas.append(f'{sangria_previa}</g>')
    lineas.append('  <circle class="nudo" r="2.3"/>')
    lineas.append('</g>')
    return "\n".join(lineas)


if __name__ == "__main__":
    for d in DEDOS:
        print(dedo(*d))
    print(dedo(*PULGAR))
