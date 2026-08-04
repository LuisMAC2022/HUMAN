# member-slideshow

## Propósito
Carrusel manual y accesible para presentar varias instancias de `<member-card>` en el mismo espacio. No duplica el contenido de las tarjetas y no depende de su Shadow DOM.

## Uso
```html
<script src="components/member-card/member-card.js" defer></script>
<script src="components/member-slideshow/member-slideshow.js" defer></script>

<member-slideshow aria-label="Miembros de Human STEM">
  <div slot="slide">
    <member-card name="Nombre" ...>...</member-card>
  </div>
  <div slot="slide">
    <member-card name="Otro miembro" ...>...</member-card>
  </div>
</member-slideshow>
```

## Interacción
- Arrastre horizontal con mouse, stylus o pantalla táctil.
- Tap o click en las zonas laterales.
- Botón “Ver siguiente” e indicadores seleccionables.
- Flechas izquierda/derecha, `Home` y `End` cuando el carrusel tiene el foco.
- Movimiento desactivado cuando el visitante usa `prefers-reduced-motion`.

## Accesibilidad
- Región etiquetada como carrusel.
- Cada tarjeta se anuncia como “diapositiva N de M”.
- Las tarjetas fuera de vista usan `aria-hidden` e `inert`, evitando foco accidental.
- El cambio de tarjeta se comunica mediante una región `aria-live`.
- Los controles laterales no cubren la zona inferior donde viven los enlaces de acción de las tarjetas.
