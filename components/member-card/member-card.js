/**
 * <member-card> — Tarjeta de presentación de un miembro.
 *
 * Atributos:
 *   name          (req) Nombre de la persona.
 *   eyebrow       (opc) Texto pequeño sobre el nombre.
 *   photo-src     (req) Ruta de la imagen (idealmente 4:5).
 *   photo-alt     (req) Texto alternativo de la imagen.
 *   caption       (opc) Pie de foto.
 *   heading-level (opc) 2|3|4 — nivel del heading del nombre. Default: 2.
 *   photo-ratio   (opc) Proporción CSS de la foto. Default: 4 / 5.
 *   action-href   (opc) Destino del botón de acción.
 *   action-label  (opc) Texto del botón. Default: "Conocer más".
 *
 * Slots:
 *   summary          Resumen destacado (1 párrafo).
 *   (default)        Párrafos de bio.
 *   highlight-title  Título del bloque destacado.
 *   highlight        Contenido del bloque destacado.
 */
class MemberCard extends HTMLElement {
  static observedAttributes = [
    "name",
    "eyebrow",
    "photo-src",
    "photo-alt",
    "caption",
    "heading-level",
    "photo-ratio",
    "action-href",
    "action-label"
  ];

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
    const actionHref = this.getAttribute("action-href") ?? "";
    const actionLabel = this.getAttribute("action-label") ?? "Conocer más";
    const requestedPhotoRatio = this.getAttribute("photo-ratio") ?? "";
    const ratioParts = requestedPhotoRatio.match(/^\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*$/);
    const photoRatio = ratioParts && Number(ratioParts[1]) > 0 && Number(ratioParts[2]) > 0
      ? `${Number(ratioParts[1])} / ${Number(ratioParts[2])}`
      : "4 / 5";
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
        @container (min-width: 40rem) {
          article { grid-template-columns: minmax(14rem, 2fr) 3fr; align-items: start; }
        }
        figure { margin: 0; }
        img {
          display: block;
          inline-size: 100%;
          block-size: auto;
          aspect-ratio: ${photoRatio};
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
          color: var(--mc-accent, #38548c);
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
        .action {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          margin-block-start: 0.5rem;
          padding: 0.75rem 1.1rem;
          border-radius: 999px;
          background: var(--mc-accent, #1c2448);
          color: #fff;
          font-weight: 700;
          line-height: 1.2;
          text-decoration: none;
          transition: transform 180ms ease, filter 180ms ease;
        }
        .action:hover { filter: brightness(1.12); transform: translateY(-1px); }
        .action:focus-visible { outline: 3px solid #33ccff; outline-offset: 3px; }
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
          ${actionHref ? `<a class="action" href="${actionHref}">${actionLabel}<span aria-hidden="true">→</span></a>` : ""}
          <section class="highlight" aria-labelledby="mc-highlight-title" hidden>
            <slot name="highlight-title" id="mc-highlight-title"></slot>
            <slot name="highlight"></slot>
          </section>
        </div>
      </article>
    `;

    const highlight = this.shadowRoot.querySelector(".highlight");
    const hasHighlight = this.querySelector('[slot="highlight"], [slot="highlight-title"]');
    highlight.hidden = !hasHighlight;
  }
}

customElements.define("member-card", MemberCard);
