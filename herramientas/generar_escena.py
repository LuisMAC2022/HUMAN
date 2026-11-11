#!/usr/bin/env python3
"""Genera las ilustraciones vectoriales de la escena del horizonte.

Uso (desde la raíz del sitio):  python3 herramientas/generar_escena.py

Todo es determinista (semilla fija): volver a ejecutarlo produce los mismos
archivos en assets/escena/. Edita los parámetros y vuelve a generar en vez
de retocar los SVG a mano.
"""
import math
import random
from pathlib import Path

SALIDA = Path(__file__).resolve().parent.parent / "assets" / "escena"
SALIDA.mkdir(parents=True, exist_ok=True)

# Valores de la escena definidos en :root de comun.css.
PALETA = {
    "tinta": "#294839",
    "noche": "#0a141d",
    "pasto": "#75964f",
    "pasto_sombra": "#4c7149",
    "loma_lejos": "#c2d1a3",
    "loma_cerca": "#9eb879",
    "suelo_1": "#a16c45",
    "suelo_2": "#825336",
    "suelo_3": "#5b4132",
    "suelo_4": "#292f2a",
    "copa": "#60845b",
    "copa_borde": "#3e6247",
    "copa_luz": "#85a16c",
    "copa_sombra": "#547a52",
    "copa_clara": "#6f9566",
    "tronco": "#a08053",
    "tronco_borde": "#516446",
    "corteza": "#755f42",
    "raiz": "#705037",
    "raiz_fina": "#8a6a4a",
    "piedra": "#b98b59",
    "vehiculo_borde": "#1d3328",
    "ventana": "#cfe0e6",
    "estrella": "#e9e4c9",
    "destello": "#fff3cf",
    "luna_halo": "#f3e3b8",
    "luna_luz": "#f7edcf",
    "luna_medio": "#e6d5a8",
    "luna_sombra": "#c9b587",
    "luna_crater": "#b9a67c",
}


def guardar(nombre, svg):
    (SALIDA / nombre).write_text(svg.strip() + "\n", encoding="utf-8")
    print(f"{nombre:22s} {len(svg) / 1024:6.1f} KB")


# ---------------------------------------------------------------- estrellas
def estrellas():
    """Mosaico de estrellas que se repite en ambos ejes."""
    rnd = random.Random(7)
    w, h = 720, 520
    puntos = []
    for _ in range(120):
        x, y = rnd.uniform(0, w), rnd.uniform(0, h)
        r = rnd.choice([.45, .55, .7, .7, .9, 1.15, 1.4])
        o = rnd.uniform(.25, .8)
        puntos.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" opacity="{o:.2f}"/>')
    destellos = []
    for _ in range(5):
        x, y, s = rnd.uniform(30, w - 30), rnd.uniform(30, h - 30), rnd.uniform(3.2, 5.5)
        k = s * .22
        destellos.append(
            f'<path d="M{x:.1f} {y - s:.1f}L{x + k:.1f} {y - k:.1f}L{x + s:.1f} {y:.1f}L{x + k:.1f} {y + k:.1f}'
            f'L{x:.1f} {y + s:.1f}L{x - k:.1f} {y + k:.1f}L{x - s:.1f} {y:.1f}L{x - k:.1f} {y - k:.1f}Z" opacity=".8"/>')
    guardar("estrellas.svg", f'''
<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
<g fill="{PALETA['estrella']}">{"".join(puntos)}</g>
<g fill="{PALETA['destello']}">{"".join(destellos)}</g>
</svg>''')


# --------------------------------------------------------------------- luna
def luna():
    guardar("luna.svg", f'''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
<defs>
  <radialGradient id="halo"><stop offset=".42" stop-color="{PALETA['luna_halo']}" stop-opacity=".34"/><stop offset="1" stop-color="{PALETA['luna_halo']}" stop-opacity="0"/></radialGradient>
  <radialGradient id="disco" cx=".4" cy=".36"><stop stop-color="{PALETA['luna_luz']}"/><stop offset=".7" stop-color="{PALETA['luna_medio']}"/><stop offset="1" stop-color="{PALETA['luna_sombra']}"/></radialGradient>
</defs>
<circle cx="120" cy="120" r="120" fill="url(#halo)"/>
<circle cx="120" cy="120" r="62" fill="url(#disco)"/>
<g fill="{PALETA['luna_crater']}" opacity=".5">
  <ellipse cx="100" cy="98" rx="17" ry="13"/><ellipse cx="138" cy="112" rx="12" ry="15"/>
  <ellipse cx="112" cy="143" rx="15" ry="10"/><circle cx="150" cy="148" r="6"/><circle cx="84" cy="128" r="5"/>
  <circle cx="134" cy="82" r="4.5"/>
</g>
</svg>''')


# ------------------------------------------------------------------- sierra
def onda(x, periodo, fases):
    """Suma de senos periódica en `periodo`."""
    return sum(a * math.sin(2 * math.pi * k * x / periodo + f) for k, a, f in fases)


def sierra():
    """Lomas lejanas; se repite en horizontal."""
    w, h = 1400, 150
    capas = [
        (PALETA["loma_lejos"], 64, [(1, 27, .4), (2, 12, 2.1)]),
        (PALETA["loma_cerca"], 106, [(1, 16, 3.0), (2, 10, .7)]),
    ]
    partes = []
    for color, base, fases in capas:
        pts = [f"{x},{base + onda(x, w, fases):.0f}" for x in range(0, w + 1, 20)]
        partes.append(f'<polygon fill="{color}" points="0,{h} {" ".join(pts)} {w},{h}"/>')
    guardar("sierra.svg", f'''
<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" preserveAspectRatio="none">
{"".join(partes)}
</svg>''')


# -------------------------------------------------------------------- suelo
def suelo():
    """Textura transparente de pasto y piedras. Los estratos están en comun.css."""
    rnd = random.Random(11)
    w, h = 1400, 520
    piedras = []
    for _ in range(72):
        x, y = rnd.uniform(0, w), rnd.uniform(25, h - 10)
        rx = rnd.uniform(1.5, 6.5)
        ry = rx * rnd.uniform(.35, .6)
        piedras.append(f"M{x:.0f} {y:.0f}a{rx:.0f} {max(1, ry):.0f} 0 1 0 {2 * rx:.0f} 0"
                       f"a{rx:.0f} {max(1, ry):.0f} 0 1 0 {-2 * rx:.0f} 0")

    pasto = []
    x = 0
    while x < w:
        alto = rnd.uniform(3, 9)
        inclinacion = rnd.uniform(-4, 4)
        pasto.append(f"M{x:.0f} 11l{inclinacion:.0f} {-alto:.0f}")
        x += rnd.uniform(6, 17)

    guardar("suelo.svg", f'''
<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" preserveAspectRatio="none">
<path d="{"".join(piedras)}" fill="{PALETA['piedra']}" opacity=".25"/>
<path d="{"".join(pasto)}" stroke="{PALETA['pasto_sombra']}" stroke-width="1.6" stroke-linecap="round" fill="none"/>
</svg>''')


# -------------------------------------------------------------------- árbol
def raices(rnd, origen, fondo):
    """Raíces ramificadas que bajan desde `origen` hasta más allá de `fondo`.

    Devuelve {grosor: "trayecto SVG"} con los trazos agrupados por grosor.
    """
    grosores = [7, 5, 3.6, 2.6, 1.8, 1.2, .8]
    grupos = {g: [] for g in grosores}

    def anotar(grosor, d):
        cercano = min(grosores, key=lambda g: abs(g - grosor))
        grupos[cercano].append(d)

    def rama(x, y, ang, largo, grosor, nivel):
        if grosor < .75 or y > fondo + 40 or nivel > 6:
            return
        pasos = 3
        for _ in range(pasos):
            ang2 = ang + rnd.uniform(-.28, .28)
            ang2 = ang2 * .86 + (math.pi / 2) * .14  # las raíces tienden a bajar
            nx = x + math.cos(ang2) * largo / pasos
            ny = y + math.sin(ang2) * largo / pasos
            cx = (x + nx) / 2 + rnd.uniform(-6, 6)
            cy = (y + ny) / 2 + rnd.uniform(-4, 4)
            anotar(grosor, f"M{x:.0f} {y:.0f}Q{cx:.0f} {cy:.0f} {nx:.0f} {ny:.0f}")
            if rnd.random() < .30 and nivel < 3:
                lado = rnd.choice([-1, 1])
                rama(nx, ny, ang2 + lado * rnd.uniform(.5, 1.0), largo * rnd.uniform(.5, .72),
                     grosor * rnd.uniform(.5, .66), nivel + 1)
            x, y, ang = nx, ny, ang2
            grosor *= .86
        rama(x, y, ang, largo * .86, grosor, nivel + 1)

    ox, oy = origen
    rama(ox, oy, math.pi / 2, 190, 7.5, 0)  # raíz pivotante: la que «baja a Miltli»
    for ang, largo, grosor in [(2.55, 150, 5.2), (.62, 150, 5.2), (2.05, 170, 4.6), (1.1, 170, 4.6),
                               (2.95, 120, 3.6), (.2, 120, 3.6)]:
        rama(ox + math.cos(ang) * 8, oy, ang, largo, grosor, 1)
    return grupos


def arbol():
    # El pasto cruza y = 342 en el viewBox de 380 × 1000 (ver comun.css).
    rnd = random.Random(5)
    w, h, suelo_y = 380, 1000, 342
    grupos = raices(rnd, (190, suelo_y), h)
    trazos = "".join(
        f'<path d="{"".join(ds)}" stroke="{PALETA["raiz" if g > 2.5 else "raiz_fina"]}" stroke-width="{g}"/>'
        for g, ds in grupos.items() if ds
    )
    copa = ("M1201 162c-51 4-73-35-51-66-7-35 19-62 51-62 13-38 67-41 91-15"
            " 35-30 81-12 89 23 39-3 66 30 53 64 21 30-6 66-46 64-31 36-69 25-88 1"
            "-32 24-73 24-99-9Z")
    guardar("arbol.svg", f'''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}">
<defs>
  <path id="copa" d="{copa}"/>
  <clipPath id="recorte-copa"><use href="#copa"/></clipPath>
</defs>
<g fill="none" stroke-linecap="round">{trazos}</g>
<ellipse cx="190" cy="{suelo_y}" rx="48" ry="6" fill="{PALETA['tinta']}" opacity=".12"/>
<g transform="translate(-1126 17)" stroke-linejoin="round">
  <path d="m1295 322-9-116-33-39 9-9 37 32 5-76 19 1 4 94 37-33 10 11-46 55 9 76q3 4 13 7-24-4-34 0-15-5-35 0 12-4 14-7Z"
        fill="{PALETA['tronco']}" stroke="{PALETA['tronco_borde']}" stroke-width="3"/>
  <use href="#copa" fill="{PALETA['copa']}"/>
  <g clip-path="url(#recorte-copa)">
    <path d="M1296 176q39-34 78-36 37-10 58-45l24 50-33 68-91 3Z" fill="{PALETA['copa_sombra']}"/>
    <path d="M1148 93q43-3 73-30 36-31 74-35l10-40-149 18Z" fill="{PALETA['copa_clara']}"/>
  </g>
  <use href="#copa" fill="none" stroke="{PALETA['copa_borde']}" stroke-width="3"/>
  <path d="M1179 84c2-19 23-30 43-24m39-22c19-9 36-4 45 10m46 26c26-5 40 12 37 29m-180 39q25 19 44-2m70 14q24 14 42-2"
        fill="none" stroke="{PALETA['copa_luz']}" stroke-width="4" stroke-linecap="round"/>
  <path d="m1305 283 3 25m5-75-1 29m8 26 2 12" stroke="{PALETA['corteza']}" stroke-width="2.5" stroke-linecap="round"/>
</g>
</svg>''')


# -------------------------------------------------------------------- brote
def brote():
    guardar("brote.svg", f'''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200">
<g fill="none" stroke="{PALETA['raiz']}" stroke-linecap="round" >
  <path d="M60 120q-3 22 2 44" stroke-width="2.6"/><path d="M61 140q-14 10-20 26" stroke-width="1.6"/>
  <path d="M61 146q13 9 17 24" stroke-width="1.6"/><path d="M62 164q-2 14 3 30" stroke-width="1.3"/>
</g>
<path d="M60 120V62" stroke="{PALETA['copa_borde']}" stroke-width="4" stroke-linecap="round"/>
<path d="M60 92C28 94 18 70 22 52c26-3 46 10 38 40Z" fill="{PALETA['copa']}" stroke="{PALETA['copa_borde']}" stroke-width="3" stroke-linejoin="round"/>
<path d="M60 74C58 44 80 30 100 36c0 26-14 42-40 38Z" fill="{PALETA['copa_luz']}" stroke="{PALETA['copa_borde']}" stroke-width="3" stroke-linejoin="round"/>
</svg>''')


# ---------------------------------------------------------------- camioneta
def camioneta():
    """Carrocería sin ruedas (las ruedas giran aparte) y la rueda."""
    guardar("camioneta.svg", f'''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 120">
<!-- carga: una compostera y un arbolito -->
<path d="M30 60V40h34v20Z" fill="{PALETA['suelo_3']}" stroke="{PALETA['tronco']}" stroke-width="2" stroke-linejoin="round"/>
<path d="M30 47h34M41 40v20m12-20v20" stroke="{PALETA['tronco']}" stroke-width="1.4"/>
<path d="M82 60V34" stroke="{PALETA['copa_borde']}" stroke-width="2.6" stroke-linecap="round"/>
<path d="M82 46c-14 1-18-9-16-17 11-1 20 4 16 17Zm0-8c-1-12 8-18 17-16 0 11-6 18-17 16Z" fill="{PALETA['copa_luz']}" stroke="{PALETA['copa_borde']}" stroke-width="2" stroke-linejoin="round"/>
<!-- carrocería -->
<path d="M14 92V60h96l12-30q2-5 8-5h38q6 0 9 5l18 30h18q9 1 11 11v21h-18a22 22 0 0 0-44 0H80a22 22 0 0 0-44 0Z"
      fill="{PALETA['tinta']}" stroke="{PALETA['vehiculo_borde']}" stroke-width="2.6" stroke-linejoin="round"/>
<path d="M127 34h20v24h-29Zm27 0h13q3 0 5 3l12 21h-30Z" fill="{PALETA['ventana']}" opacity=".88"/>
<path d="M14 72h100m6-12v32m38-32v32" stroke="{PALETA['vehiculo_borde']}" stroke-width="1.4" opacity=".6" fill="none"/>
<path d="M166 68h10" stroke="{PALETA['vehiculo_borde']}" stroke-width="2.2" stroke-linecap="round"/>
<rect x="212" y="65" width="12" height="9" rx="2" fill="#ffe9b0"/>
<rect x="12" y="64" width="6" height="12" rx="1.5" fill="#e0664f"/>
</svg>''')

    rayos = "".join(f'<path d="M0 -6V-13" transform="rotate({a})"/>' for a in range(0, 360, 72))
    guardar("rueda.svg", f'''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -20 40 40">
<circle r="18.5" fill="{PALETA['noche']}" stroke="{PALETA['vehiculo_borde']}" stroke-width="2.4"/>
<circle r="13" fill="none" stroke="{PALETA['vehiculo_borde']}" stroke-width="1" opacity=".5"/>
<g stroke="{PALETA['vehiculo_borde']}" stroke-width="2.4" stroke-linecap="round">{rayos}</g>
<circle r="4" fill="{PALETA['vehiculo_borde']}"/>
</svg>''')


if __name__ == "__main__":
    estrellas()
    luna()
    sierra()
    suelo()
    arbol()
    brote()
    camioneta()
