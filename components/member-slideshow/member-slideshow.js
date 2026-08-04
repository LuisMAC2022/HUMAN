/**
 * <member-slideshow> — Carrusel accesible para elementos asignados al slot
 * "slide". Está diseñado para contener instancias de <member-card> sin
 * duplicar su contenido ni acoplarse a su Shadow DOM.
 */
class MemberSlideshow extends HTMLElement {
  #initialized = false;
  #slides = [];
  #currentIndex = 0;
  #startX = 0;
  #currentX = 0;
  #pointerId = null;
  #isDragging = false;
  #suppressClick = false;
  #abortController = null;
  #resizeObserver = null;
  #carousel = null;
  #viewport = null;
  #track = null;
  #slot = null;
  #previousControl = null;
  #nextControl = null;
  #nextButton = null;
  #indicators = null;
  #status = null;

  connectedCallback() {
    if (!this.#initialized) {
      this.attachShadow({ mode: "open" });
      this.#render();
      this.#cacheElements();
      this.#initialized = true;
    }

    this.#connectEvents();
    this.#syncSlides();
  }

  disconnectedCallback() {
    this.#abortController?.abort();
    this.#resizeObserver?.disconnect();
  }

  #render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin-block-start: clamp(28px, 5vw, 56px);
          color: var(--human-gris-texto, #333333);
          font-family: var(--font-body, Arial, Helvetica, sans-serif);
        }

        * { box-sizing: border-box; }

        .carousel {
          width: 100%;
          text-align: center;
        }

        .viewport {
          position: relative;
          width: 100%;
          overflow: hidden;
          border: 1px solid var(--human-gris-borde, #e2e7f0);
          border-radius: var(--radio, 14px);
          background: var(--human-blanco, #ffffff);
          box-shadow: var(--sombra-lg, 0 24px 60px rgba(15, 21, 48, 0.18));
          touch-action: pan-y;
          user-select: none;
          cursor: grab;
          transition: height 250ms ease;
        }

        .viewport.is-dragging { cursor: grabbing; }

        .track {
          display: flex;
          align-items: flex-start;
          transition: transform 350ms ease;
          will-change: transform;
        }

        .viewport.is-dragging .track { transition: none; }

        slot { display: contents; }

        ::slotted([slot="slide"]) {
          flex: 0 0 100%;
          min-width: 0;
          padding: clamp(18px, 4vw, 46px);
          text-align: start;
          --mc-text: var(--human-gris-texto, #333333);
          --mc-text-muted: var(--human-gris-medio, #6b7280);
          --mc-accent: var(--human-azul-medio, #38548c);
          --mc-surface: var(--human-blanco, #ffffff);
          --mc-highlight-surface: var(--human-gris-suave, #f3f5f8);
          --mc-radius: var(--radio, 14px);
          --mc-gap: clamp(24px, 4vw, 48px);
          --mc-font-display: var(--font-display, inherit);
          --mc-font-body: var(--font-body, inherit);
        }

        .edge-control {
          position: absolute;
          top: 0;
          z-index: 3;
          width: 16%;
          height: min(52%, 32rem);
          border: 0;
          padding: 0;
          background: transparent;
          color: var(--human-azul-oscuro, #1c2448);
          cursor: pointer;
        }

        .edge-control.previous { left: 0; }
        .edge-control.next { right: 0; }

        .edge-control::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 12px;
          height: 12px;
          border-top: 3px solid currentColor;
          border-right: 3px solid currentColor;
          opacity: 0;
          transition: opacity 180ms ease;
        }

        .edge-control.previous::after {
          left: clamp(12px, 3vw, 28px);
          transform: translateY(-50%) rotate(-135deg);
        }

        .edge-control.next::after {
          right: clamp(12px, 3vw, 28px);
          transform: translateY(-50%) rotate(45deg);
        }

        .edge-control:hover::after,
        .edge-control:focus-visible::after { opacity: 1; }

        .edge-control:focus-visible {
          outline: 3px solid var(--human-cyan, #33ccff);
          outline-offset: -4px;
        }

        .controls {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 14px 20px;
          margin-block-start: 18px;
        }

        .indicators {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .indicator {
          width: 10px;
          height: 10px;
          border: 0;
          border-radius: 999px;
          padding: 0;
          background: var(--human-gris-borde, #e2e7f0);
          cursor: pointer;
          transition: width 200ms ease, background 200ms ease;
        }

        .indicator.active {
          width: 28px;
          background: var(--human-azul-medio, #38548c);
        }

        .indicator:focus-visible {
          outline: 3px solid var(--human-cyan, #33ccff);
          outline-offset: 3px;
        }

        .next-button {
          padding: 11px 20px;
          border: 0;
          border-radius: 999px;
          font: inherit;
          font-family: var(--font-technical, inherit);
          font-weight: 700;
          color: var(--human-blanco, #ffffff);
          background: var(--human-azul-oscuro, #1c2448);
          cursor: pointer;
          transition: transform 180ms ease, background 180ms ease;
        }

        .next-button:hover {
          background: var(--human-azul-medio, #38548c);
          transform: translateY(-1px);
        }

        .next-button:focus-visible {
          outline: 3px solid var(--human-cyan, #33ccff);
          outline-offset: 3px;
        }

        .help {
          margin: 12px 0 0;
          color: var(--human-gris-medio, #6b7280);
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          white-space: nowrap;
          border: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .viewport,
          .track,
          .indicator,
          .next-button,
          .edge-control::after { transition: none; }
        }
      </style>

      <section
        class="carousel"
        role="region"
        aria-roledescription="carrusel"
        aria-label="Miembros de Human STEM"
        tabindex="0">
        <div class="viewport">
          <div class="track"><slot name="slide"></slot></div>

          <button class="edge-control previous" type="button" aria-label="Mostrar miembro anterior"></button>
          <button class="edge-control next" type="button" aria-label="Mostrar miembro siguiente"></button>
          <p class="status sr-only" aria-live="polite" aria-atomic="true"></p>
        </div>

        <div class="controls">
          <div class="indicators" aria-label="Seleccionar miembro"></div>
          <button class="next-button" type="button">Ver siguiente</button>
        </div>

        <p class="help">Desliza o arrastra las tarjetas. También puedes tocar los bordes o usar las flechas del teclado.</p>
      </section>
    `;
  }

  #cacheElements() {
    this.#carousel = this.shadowRoot.querySelector(".carousel");
    this.#viewport = this.shadowRoot.querySelector(".viewport");
    this.#track = this.shadowRoot.querySelector(".track");
    this.#slot = this.shadowRoot.querySelector('slot[name="slide"]');
    this.#previousControl = this.shadowRoot.querySelector(".edge-control.previous");
    this.#nextControl = this.shadowRoot.querySelector(".edge-control.next");
    this.#nextButton = this.shadowRoot.querySelector(".next-button");
    this.#indicators = this.shadowRoot.querySelector(".indicators");
    this.#status = this.shadowRoot.querySelector(".status");
  }

  #connectEvents() {
    this.#abortController?.abort();
    this.#abortController = new AbortController();
    const { signal } = this.#abortController;

    this.#slot.addEventListener("slotchange", () => this.#syncSlides(), { signal });
    this.#previousControl.addEventListener("click", () => this.#showPreviousSlide(), { signal });
    this.#nextControl.addEventListener("click", () => this.#showNextSlide(), { signal });
    this.#nextButton.addEventListener("click", () => this.#showNextSlide(), { signal });
    this.#indicators.addEventListener("click", (event) => this.#handleIndicatorClick(event), { signal });
    this.#carousel.addEventListener("keydown", (event) => this.#handleKeyboard(event), { signal });

    this.#viewport.addEventListener("pointerdown", (event) => this.#handlePointerDown(event), { signal });
    this.#viewport.addEventListener("pointermove", (event) => this.#handlePointerMove(event), { signal });
    this.#viewport.addEventListener("pointerup", (event) => this.#finishDragging(event), { signal });
    this.#viewport.addEventListener("pointercancel", (event) => this.#finishDragging(event), { signal });
    this.#viewport.addEventListener("lostpointercapture", (event) => this.#finishDragging(event), { signal });

    this.addEventListener("click", (event) => {
      if (!this.#suppressClick) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    }, { capture: true, signal });

    window.addEventListener("resize", () => {
      this.#updateCarousel(false);
      this.#measureActiveSlide();
    }, { signal });
  }

  #syncSlides() {
    this.#slides = this.#slot.assignedElements({ flatten: true });
    this.#currentIndex = Math.min(this.#currentIndex, Math.max(0, this.#slides.length - 1));

    this.#resizeObserver?.disconnect();
    this.#resizeObserver = new ResizeObserver((entries) => {
      if (entries.some((entry) => entry.target === this.#slides[this.#currentIndex])) {
        this.#measureActiveSlide();
      }
    });

    this.#indicators.replaceChildren();

    this.#slides.forEach((slide, index) => {
      const memberName = slide.querySelector("member-card")?.getAttribute("name")?.trim();
      const slideLabel = memberName
        ? `${index + 1} de ${this.#slides.length}: ${memberName}`
        : `${index + 1} de ${this.#slides.length}`;

      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "diapositiva");
      slide.setAttribute("aria-label", slideLabel);
      this.#resizeObserver.observe(slide);

      const indicator = document.createElement("button");
      indicator.type = "button";
      indicator.className = "indicator";
      indicator.dataset.index = String(index);
      indicator.setAttribute("aria-label", memberName ? `Mostrar a ${memberName}` : `Mostrar miembro ${index + 1}`);
      this.#indicators.append(indicator);
    });

    const label = this.getAttribute("aria-label")?.trim();
    this.#carousel.setAttribute("aria-label", label || "Miembros de Human STEM");
    this.#updateCarousel(false);
  }

  #normalizeIndex(index) {
    if (this.#slides.length === 0) return 0;
    return (index + this.#slides.length) % this.#slides.length;
  }

  #goToSlide(index) {
    this.#currentIndex = this.#normalizeIndex(index);
    this.#updateCarousel(true);
  }

  #showNextSlide() {
    this.#goToSlide(this.#currentIndex + 1);
  }

  #showPreviousSlide() {
    this.#goToSlide(this.#currentIndex - 1);
  }

  #updateCarousel(animate) {
    if (this.#slides.length === 0) {
      this.#track.style.transform = "translate3d(0, 0, 0)";
      this.#viewport.style.height = "auto";
      return;
    }

    if (!animate) {
      this.#track.style.transition = "none";
    }

    this.#track.style.transform = `translate3d(-${this.#currentIndex * 100}%, 0, 0)`;

    this.#slides.forEach((slide, index) => {
      const isActive = index === this.#currentIndex;
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.toggleAttribute("inert", !isActive);
    });

    [...this.#indicators.children].forEach((indicator, index) => {
      const isActive = index === this.#currentIndex;
      indicator.classList.toggle("active", isActive);
      if (isActive) {
        indicator.setAttribute("aria-current", "true");
      } else {
        indicator.removeAttribute("aria-current");
      }
    });

    const activeSlide = this.#slides[this.#currentIndex];
    this.#status.textContent = `Mostrando ${activeSlide.getAttribute("aria-label")}.`;
    this.#measureActiveSlide();

    if (!animate) {
      requestAnimationFrame(() => {
        this.#track.style.removeProperty("transition");
      });
    }
  }

  #measureActiveSlide() {
    requestAnimationFrame(() => {
      const activeSlide = this.#slides[this.#currentIndex];
      if (!activeSlide) return;
      const height = Math.ceil(activeSlide.getBoundingClientRect().height);
      if (height > 0) this.#viewport.style.height = `${height}px`;
    });
  }

  #handleIndicatorClick(event) {
    const indicator = event.target.closest("button[data-index]");
    if (!indicator) return;
    this.#goToSlide(Number(indicator.dataset.index));
  }

  #handleKeyboard(event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (this.#isInteractiveEvent(event)) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.#showNextSlide();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.#showPreviousSlide();
    } else if (event.key === "Home") {
      event.preventDefault();
      this.#goToSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      this.#goToSlide(this.#slides.length - 1);
    }
  }

  #handlePointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (this.#isInteractiveEvent(event)) return;

    this.#isDragging = true;
    this.#pointerId = event.pointerId;
    this.#startX = event.clientX;
    this.#currentX = event.clientX;
    this.#viewport.classList.add("is-dragging");
    this.#viewport.setPointerCapture(event.pointerId);
  }

  #handlePointerMove(event) {
    if (!this.#isDragging || event.pointerId !== this.#pointerId) return;

    this.#currentX = event.clientX;
    const dragDistance = this.#currentX - this.#startX;
    const basePosition = this.#currentIndex * this.#viewport.clientWidth;
    const translatedPosition = basePosition - dragDistance;

    this.#track.style.transform = `translate3d(-${translatedPosition}px, 0, 0)`;
  }

  #finishDragging(event) {
    if (!this.#isDragging || event.pointerId !== this.#pointerId) return;

    const dragDistance = this.#currentX - this.#startX;
    const threshold = Math.min(80, Math.max(48, this.#viewport.clientWidth * 0.12));

    this.#isDragging = false;
    this.#pointerId = null;
    this.#viewport.classList.remove("is-dragging");

    if (this.#viewport.hasPointerCapture(event.pointerId)) {
      this.#viewport.releasePointerCapture(event.pointerId);
    }

    if (Math.abs(dragDistance) >= threshold) {
      if (dragDistance < 0) this.#showNextSlide();
      else this.#showPreviousSlide();
    } else {
      this.#updateCarousel(true);
    }

    if (Math.abs(dragDistance) > 8) {
      this.#suppressClick = true;
      setTimeout(() => {
        this.#suppressClick = false;
      }, 0);
    }
  }

  #isInteractiveEvent(event) {
    return event.composedPath().some((node) =>
      node instanceof Element && node.matches(
        "a, button, input, textarea, select, summary, [contenteditable='true']"
      )
    );
  }
}

if (!customElements.get("member-slideshow")) {
  customElements.define("member-slideshow", MemberSlideshow);
}
