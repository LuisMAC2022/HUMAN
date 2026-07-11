/**
 * <member-card> — Tarjeta de presentación de un miembro.
 *
 * Atributos:
 *   name       (req)  Nombre de la persona. Se usa como <h2>.
 *   eyebrow    (opc)  Texto pequeño sobre el nombre. Ej: "Quiénes somos".
 *   photo-src  (req)  Ruta de la imagen (idealmente 4:5).
 *   photo-alt  (req)  Texto alternativo de la imagen.
 *   caption    (opc)  Pie de foto. Ej: "Iñaki Moreno, fundador".
 *   heading-level (opc) 2|3|4 — nivel del heading del nombre. Default: 2.
 *
 * Slots:
 *   summary          Resumen destacado (1 párrafo).
 *   (default)        Párrafos de bio.
 *   highlight-title  Título del bloque destacado ("Aprendizaje central").
 *   highlight        Contenido del bloque destacado.
 *
 * Theming (CSS custom properties, con fallbacks):
 *   --mc-surface, --mc-text, --mc-text-muted, --mc-accent,
 *   --mc-radius, --mc-gap, --mc-highlight-surface, --mc-font-display
 */
class MemberCard extends HTMLElement {
  static observedAttributes = ["name", "eyebrow", "photo-src", "photo-alt", "caption", "heading-level"];

  #initialized = false;

  connectedCallback() {
    if (!this.#initialized) {
      this.attachShadow({ mode: "open" });
      this.#initialized = true;
    }
    this.render();
  }

  attributeChangedCallback() {
    if (this.#initialized) this.render();
  }

  render() {
    const name = this.getAttribute("name") ?? "";
    const eyebrow = this.getAttribute("eyebrow") ?? "";
    const photoSrc = this.getAttribute("photo-src") ?? "";
    const photoAlt = this.getAttribute("photo-alt") ?? "";
    const caption = this.getAttribute("caption") ?? "";
    const level = ["2", "3", "4"].includes(this.getAttribute("heading-level"))
      ? this.getAttribute("heading-level")
      : "2";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          color: var(--mc-text, #1c1c1c);
          font-family: var(--mc-font-body, inherit);
          container-type: inline-size;
        }
        article {
          display: grid;
          gap: var(--mc-gap, 2rem);
          background: var(--mc-surface, transparent);
          border-radius: var(--mc-radius, 0);
        }
        /* Foto a la izquierda cuando la tarjeta es ancha */
        @container (min-width: 40rem) {
          article { grid-template-columns: minmax(14rem, 2fr) 3fr; align-items: start; }
        }
        figure { margin: 0; }
        img {
          display: block;
          inline-size: 100%;
          block-size: auto;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: var(--mc-radius, 0);
        }
        figcaption {
          margin-block-start: 0.5rem;
          font-size: 0.875rem;
          color: var(--mc-text-muted, #5b5b5b);
        }
        .eyebrow {
          margin: 0;
          font-size: 0.8125rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--mc-accent, #5b5b5b);
        }
        .name {
          margin: 0.25rem 0 0.75rem;
          font-family: var(--mc-font-display, inherit);
          font-size: clamp(1.5rem, 4cqi, 2.25rem);
          line-height: 1.15;
        }
        ::slotted(p) { margin: 0 0 1em; line-height: 1.6; }
        slot[name="summary"]::slotted(p) {
          font-size: 1.125rem;
          font-weight: 500;
        }
        .highlight {
          margin-block-start: 1rem;
          padding: 1.25rem 1.5rem;
          background: var(--mc-highlight-surface, #f3f3f0);
          border-radius: var(--mc-radius, 0);
        }
        .highlight[hidden] { display: none; }
        .highlight ::slotted([slot="highlight-title"]) {
          margin: 0 0 0.5rem;
          font-size: 1rem;
        }
        .highlight ::slotted([slot="highlight"]) { margin: 0; line-height: 1.6; }
      </style>

      <article>
        <figure>
          <img src="${photoSrc}" alt="${photoAlt}" width="1200" height="1500" loading="lazy">
          ${caption ? `<figcaption>${caption}</figcaption>` : ""}
        </figure>
        <div>
          ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
          <h${level} class="name">${name}</h${level}>
          <slot name="summary"></slot>
          <slot></slot>
          <section class="highlight" aria-labelledby="mc-highlight-title" hidden>
            <slot name="highlight-title" id="mc-highlight-title"></slot>
            <slot name="highlight"></slot>
          </section>
        </div>
      </article>
    `;

    // El bloque destacado solo aparece si el consumidor pasó contenido.
    const highlight = this.shadowRoot.querySelector(".highlight");
    const hasHighlight = this.querySelector('[slot="highlight"], [slot="highlight-title"]');
    highlight.hidden = !hasHighlight;
  }
}

customElements.define("member-card", MemberCard);
