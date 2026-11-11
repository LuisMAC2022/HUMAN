(() => {
  'use strict';
  document.documentElement.classList.add('js-enabled');

  const sections = [...document.querySelectorAll('section[data-depth], footer[data-depth]')];
  const stops = [...document.querySelectorAll('[data-stop]')];
  const readout = document.getElementById('depth-value');
  const caption = document.getElementById('depth-caption');
  const hero = document.querySelector('.hero');
  const underground = document.getElementById('subsuelo');
  const route = document.getElementById('journey-progress');
  const motionButton = document.querySelector('.motion-toggle');
  const motionLabel = document.getElementById('motion-label');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionPaused = reducedMotion.matches;
  let ticking = false;
  let activeIndex = -1;
  let metrics = [];
  const routeLength = route.getTotalLength();
  route.style.strokeDasharray = String(routeLength);
  route.style.strokeDashoffset = String(routeLength);

  // A deterministic scatter keeps the soil consistent between visits.
  const stones = document.querySelector('.stones');
  const fragment = document.createDocumentFragment();
  let seed = 129;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  for (let i = 0; i < 100; i++) {
    const stone = document.createElement('span');
    stone.className = 'pebble';
    const width = 4 + random() * 15;
    stone.style.cssText = `left:${3 + random() * 94}%;top:${random() * 99}%;width:${width}px;height:${width * (.35 + random() * .3)}px;--rotate:${random() * 180}deg;opacity:${.12 + random() * .18}`;
    fragment.append(stone);
  }
  stones.append(fragment);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -25px 0px' });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

  const materialButtons = [...document.querySelectorAll('[data-material-button]')];
  const materialDescriptions = [
    'Empieza con ramas pequeñas y materiales secos para dejar pasar el aire.',
    'Agrega restos crudos de frutas y verduras, café usado o material vegetal fresco.',
    'Cubre los residuos verdes con hojas secas, pasto seco o cartón sin recubrimientos.'
  ];
  const compostScene = document.querySelector('.compost-scene');
  const materialCaption = document.getElementById('material-caption');
  const materialCallouts = [...document.querySelectorAll('[data-material]')];

  function selectMaterial(index) {
    compostScene.dataset.selectedMaterial = String(index);
    materialCaption.textContent = materialDescriptions[index];
    materialButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
    materialCallouts.forEach(callout => callout.classList.toggle('selected', Number(callout.dataset.material) === index));
  }
  materialButtons.forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => selectMaterial(Number(button.dataset.materialButton)));
  });
  selectMaterial(0);

  const stepButtons = [...document.querySelectorAll('[data-step]')];
  const processScene = document.querySelector('.process-scene');
  const stageCount = document.getElementById('stage-count');
  const stageTag = document.getElementById('stage-tag');
  const stageTitle = document.getElementById('stage-title');
  const stageDescription = document.getElementById('stage-description');
  const nextStep = document.getElementById('next-step');
  const stages = [
    { tag: 'CAPAS QUE SE COMPLEMENTAN', title: 'Secos → verdes → secos.', description: 'Deja una base que permita circular el aire. Después de los residuos verdes, añade una cubierta seca.' },
    { tag: 'HUMEDAD SIN EXCESOS', title: 'Húmeda, sin encharcar.', description: 'Revisa la mezcla cada semana. Si está seca, agrega un poco de agua: busca la humedad de una esponja exprimida.' },
    { tag: 'EL AIRE TAMBIÉN ES PARTE', title: 'Mezcla y deja respirar.', description: 'Mezcla al menos una vez cada 10 días. Integra el material exterior con el del centro.' },
    { tag: 'UN HÁBITO QUE CRECE', title: 'Agrega. Mezcla. Cubre.', description: 'Continúa incorporando residuos y materiales secos. Al terminar, deja los restos de cocina siempre cubiertos.' }
  ];
  let currentStep = 0;

  function selectStep(index) {
    currentStep = index;
    const stage = stages[index];
    processScene.dataset.currentStep = String(index);
    stageCount.textContent = `${String(index + 1).padStart(2, '0')} / 04`;
    stageTag.textContent = stage.tag;
    stageTitle.textContent = stage.title;
    stageDescription.textContent = stage.description;
    stepButtons.forEach((button, i) => {
      button.classList.toggle('active', i === index);
      button.setAttribute('aria-pressed', String(i === index));
    });
    nextStep.setAttribute('aria-label', index === stages.length - 1 ? 'Volver al primer paso' : `Ver el paso ${index + 2}`);
    nextStep.firstChild.textContent = index === stages.length - 1 ? 'Volver al inicio ' : 'Siguiente paso ';
  }
  stepButtons.forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => selectStep(Number(button.dataset.step)));
  });
  nextStep.disabled = false;
  function advanceStep() {
    selectStep((currentStep + 1) % stages.length);
  }
  nextStep.addEventListener('click', advanceStep);
  selectStep(0);

  let materialTimer = 0;
  let processTimer = 0;
  window.humanStemDemo = {
    capas(active) {
      clearInterval(materialTimer);
      if (active) {
        materialTimer = setInterval(() => {
          const current = Number(compostScene.dataset.selectedMaterial);
          selectMaterial((current + 1) % materialButtons.length);
        }, 6500);
      }
    },
    composta(active) {
      clearInterval(processTimer);
      if (active) processTimer = setInterval(advanceStep, 6000);
    }
  };

  function measure() {
    metrics = sections.map(section => ({
      top: section.getBoundingClientRect().top + window.scrollY,
      depth: Number(section.dataset.depth),
      title: section.dataset.title
    }));
    requestUpdate();
  }

  function update() {
    const y = window.scrollY;
    const focus = y + window.innerHeight * .36;
    let index = 0;
    metrics.forEach((section, i) => { if (focus >= section.top) index = i; });
    const current = metrics[index];
    const next = metrics[Math.min(index + 1, metrics.length - 1)];
    let depth = current.depth;
    if (next.top > current.top) {
      const fraction = Math.max(0, Math.min(1, (focus - current.top) / (next.top - current.top)));
      depth += (next.depth - current.depth) * fraction;
    }
    if (y < 40) depth = 0;
    readout.textContent = depth.toFixed(1);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pageProgress = maxScroll > 0 ? y / maxScroll : 0;
    document.body.style.setProperty('--scroll-progress', String(Math.min(1, pageProgress * 1.17)));
    const worldProgress = Math.max(0, Math.min(1, (focus - (underground.getBoundingClientRect().top + y)) / (underground.offsetHeight - window.innerHeight * .4)));
    route.style.strokeDashoffset = String(routeLength * (1 - worldProgress));
    document.body.classList.toggle('below-ground', y > hero.offsetHeight - window.innerHeight * .45);
    if (activeIndex !== index) {
      activeIndex = index;
      caption.textContent = current.title;
      const navIndex = Math.min(index, stops.length - 1);
      stops.forEach((stop, i) => {
        stop.classList.toggle('active', i === navIndex);
        if (i === navIndex) stop.setAttribute('aria-current', 'location');
        else stop.removeAttribute('aria-current');
      });
    }
    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function setMotion(paused) {
    motionPaused = paused;
    document.body.classList.toggle('motion-paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', paused ? 'Activar las animaciones decorativas' : 'Pausar las animaciones decorativas');
    motionLabel.textContent = paused ? 'Activar movimiento' : 'Pausar movimiento';
    requestUpdate();
  }

  motionButton.addEventListener('click', () => setMotion(!motionPaused));
  reducedMotion.addEventListener('change', event => setMotion(event.matches));
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('load', measure);
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(underground);
  setMotion(motionPaused);
  measure();
})();
