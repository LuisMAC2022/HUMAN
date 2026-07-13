# Análisis: sustituir la sección “Proyecto Superman” por un componente equivalente a `member-card`

## Contexto

El repositorio ya incluye el Web Component reutilizable `member-card` en:

- `components/member-card/member-card.js`
- `components/member-card/README.md`

También está cargado en `index.html` mediante:

```html
<script src="components/member-card/member-card.js" defer></script>
```

La sección actual de “Proyecto Superman” está en `index.html`, dentro de:

```html
<section class="section section--tinta" id="proyecto-superman" aria-labelledby="titulo-superman">
```

y usa una estructura específica con estas clases:

- `.superman__head`
- `.superman__intro`
- `.superman__tags`
- `.retrato.superman__retrato`
- `#titulo-superman`

Para sustituirla por algo equivalente a la tarjeta de Iñaki, conviene migrar la cabecera de la sección a `<member-card>` y mantener la subsección de patrocinadores como contenido independiente.

---

## 1. Convertir la cabecera de “Proyecto Superman” a `<member-card>`

Actualmente “Proyecto Superman” mezcla texto, tags e imagen con clases específicas. Se puede reemplazar solo la cabecera por un `member-card`, manteniendo debajo la sección de patrocinadores.

:::task-stub{title="Reemplazar la cabecera de Proyecto Superman con member-card"}
En `index.html`, localiza la sección `#proyecto-superman`.

Dentro de esa sección, sustituye el bloque:

- `<div class="superman__head">`
- `<div class="superman__intro">`
- `<figure class="retrato superman__retrato acento-naranja">`

por un componente:

```html
<member-card
  name="Proyecto Superman"
  eyebrow="Proyecto piloto"
  photo-src="assets/founders/alvarez-4x5.webp"
  photo-alt="Retrato de Jair Álvarez, director de Proyecto Superman"
  caption="Jair Álvarez, director"
  heading-level="2">
  <p slot="summary">Prótesis de mano mioeléctricas: nuestro proyecto piloto une electrónica, manufactura aditiva y diseño centrado en las personas.</p>
  <p>Electrónica · Manufactura aditiva · Diseño centrado en las personas</p>
</member-card>
```

Conserva debajo el bloque:

```html
<section aria-labelledby="titulo-patrocinadores">
```

para no afectar patrocinadores.
:::

---

## 2. Resolver el conflicto con `aria-labelledby="titulo-superman"`

La sección actual apunta a `aria-labelledby="titulo-superman"`, pero si el título pasa a generarse dentro del Shadow DOM de `member-card`, ese `id` ya no estará disponible para nombrar la sección desde el DOM externo. Esto es importante para accesibilidad.

:::task-stub{title="Mantener un nombre accesible para la sección Proyecto Superman"}
En `index.html`, al convertir la cabecera a `<member-card>`, cambia la apertura de la sección de:

```html
<section class="section section--tinta" id="proyecto-superman" aria-labelledby="titulo-superman">
```

a una de estas opciones:

Opción simple:

```html
<section class="section section--tinta" id="proyecto-superman" aria-label="Proyecto Superman">
```

Opción semántica con heading externo visible/oculto:

```html
<section class="section section--tinta" id="proyecto-superman" aria-labelledby="titulo-superman">
  <div class="contenedor">
    <h2 id="titulo-superman" class="sr-only">Proyecto Superman</h2>
    ...
  </div>
</section>
```

Si se usa heading externo, configura el componente con `heading-level="3"` para evitar duplicar un `h2` principal dentro de la misma sección.
:::

---

## 3. Decidir cómo representar los tags del proyecto

`member-card` no tiene un slot específico para etiquetas tipo “Electrónica”, “Manufactura aditiva”, etc. Puedes integrarlas como texto normal, o extender el componente si quieres conservar el estilo visual de chips.

:::task-stub{title="Añadir soporte opcional para tags en member-card"}
Si quieres conservar los chips visuales de Proyecto Superman, edita `components/member-card/member-card.js`.

Agrega un slot opcional, por ejemplo:

```html
<slot name="tags"></slot>
```

Ubícalo después del slot `summary` y antes del contenido default.

Después, en el CSS interno del componente, añade estilos para listas asignadas al slot `tags`, por ejemplo usando:

```css
::slotted([slot="tags"]) {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
  list-style: none;
}
```

Luego en `index.html` usa:

```html
<ul slot="tags" role="list">
  <li>Electrónica</li>
  <li>Manufactura aditiva</li>
  <li>Diseño centrado en las personas</li>
</ul>
```

Mantén el contenido como lista real para conservar semántica accesible.
:::

---

## 4. Ajustar la imagen: el componente espera retrato 4:5, pero Superman usa 1:1

El CSS actual fuerza `.superman__retrato img` a `aspect-ratio: 1 / 1`, mientras `member-card` usa `aspect-ratio: 4 / 5`. Si sustituyes directamente, la imagen de Jair se verá como retrato vertical, no cuadrada.

:::task-stub{title="Permitir proporción de imagen configurable en member-card"}
En `components/member-card/member-card.js`, añade un atributo opcional como `photo-ratio`.

Actualiza `observedAttributes` para incluir:

```js
"photo-ratio"
```

Dentro de `render()`, lee el atributo:

```js
const photoRatio = this.getAttribute("photo-ratio") === "1:1" ? "1 / 1" : "4 / 5";
```

En el CSS del `<img>`, reemplaza:

```css
aspect-ratio: 4 / 5;
```

por una variable inline o custom property generada desde el atributo, por ejemplo:

```css
aspect-ratio: var(--mc-photo-ratio, 4 / 5);
```

y aplica el valor en el template.

Después, en `index.html`, usa:

```html
<member-card
  ...
  photo-ratio="1:1">
```

si quieres mantener la estética cuadrada actual de Proyecto Superman.
:::

---

## 5. Reutilizar tokens visuales en lugar de clases `.superman__*`

`member-card` permite personalización con variables CSS como `--mc-accent`, `--mc-text`, `--mc-highlight-surface`, etc. Para que “Proyecto Superman” conserve la identidad naranja/tinta sin depender de `.superman__head`, conviene definir variables en el contexto de la sección.

:::task-stub{title="Aplicar tema visual de Proyecto Superman mediante variables CSS"}
En `styles.css`, localiza el bloque de estilos de `PROYECTO SUPERMAN`.

Añade reglas específicas para el componente dentro de la sección:

```css
#proyecto-superman member-card {
  --mc-accent: var(--human-naranja);
  --mc-text: var(--human-azul-oscuro);
  --mc-text-muted: var(--human-gris-texto);
  --mc-radius: var(--radio);
  --mc-gap: clamp(32px, 5vw, 64px);
}
```

Si la sección con `.section--tinta` necesita fondo blanco o contraste especial, revisa que los valores de `--mc-text` y `--mc-text-muted` cumplan contraste WCAG AA sobre el fondo real.
:::

---

## 6. Limpiar CSS obsoleto cuando la sustitución esté completa

Si `superman__head`, `superman__intro`, `superman__tags` y `superman__retrato` dejan de usarse, quedarán estilos muertos en `styles.css`.

:::task-stub{title="Eliminar estilos obsoletos de la cabecera Superman"}
Después de migrar `index.html`, revisa `styles.css` y elimina solo las reglas que ya no tengan uso:

- `.superman__head`
- `.superman__intro .section-title`
- `.superman__intro p`
- `.superman__tags`
- `.superman__tags li`
- `.section--tinta .superman__tags li`
- `.superman__retrato img`
- `.superman__retrato` dentro del media query de `max-width: 900px`

No elimines estilos de patrocinadores, porque siguen perteneciendo a la sección `#proyecto-superman`.
:::

---

## Recomendación práctica

La sustitución mínima sería:

1. Mantener la `<section id="proyecto-superman">`.
2. Cambiar `aria-labelledby` por `aria-label="Proyecto Superman"` o añadir un heading externo.
3. Reemplazar solo `.superman__head` por `<member-card>`.
4. Dejar intacta la subsección de patrocinadores.
5. Ajustar CSS con variables `--mc-*`.
6. Opcionalmente extender `member-card` para soportar tags y ratio de imagen.

## Checks realizados en el análisis original

```bash
pwd; printf '\nAGENTS:\n'; find .. -name AGENTS.md -print; printf '\nTop files:\n'; rg --files -g '!node_modules' | head -80; printf '\nSearch terms:\n'; rg -n "superman|member-card|iñaki|inaki|member card" -S . -g '!node_modules'
```

```bash
sed -n '1,180p' components/member-card/member-card.js; printf '\n--- README ---\n'; sed -n '1,140p' components/member-card/README.md; printf '\n--- index relevant ---\n'; sed -n '88,145p' index.html; printf '\n--- css relevant ---\n'; sed -n '560,665p' styles.css; sed -n '955,980p' styles.css
```
