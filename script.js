/** Scrolls the main container to the target section by id. */
function scrollToSection(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  }
}

/** Returns the id of the section closest to the left edge of the container. */
function getActiveSectionId(container, sections) {
  let closest = null;
  let minDist = Infinity;

  sections.forEach((section) => {
    const dist = Math.abs(section.getBoundingClientRect().left - container.getBoundingClientRect().left);
    if (dist < minDist) {
      minDist = dist;
      closest = section.id;
    }
  });

  return closest;
}

/** Updates the active state on nav links based on current scroll position. */
function updateActiveNav(activeSectionId) {
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href').replace('#', '');
    link.classList.toggle('active', href === activeSectionId);
  });
}

/** Translates vertical wheel input to horizontal scroll. */
function initWheelScroll() {
  const container = document.querySelector('.scroll-container');
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    container.scrollLeft += e.deltaY || e.deltaX;
  }, { passive: false });
}

/** Initializes arrow button click handlers. */
function initArrowButtons() {
  document.querySelectorAll('.arrow-btn, .arrow-btn-back').forEach((btn) => {
    btn.addEventListener('click', () => scrollToSection(btn.dataset.target));
  });
}

/** Initializes nav link click handlers. */
function initNavLinks() {
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSection(link.getAttribute('href').replace('#', ''));
    });
  });
}

/** Observes scroll position and updates active nav link. */
function initScrollObserver() {
  const container = document.querySelector('.scroll-container');
  const sections = document.querySelectorAll('.section');

  container.addEventListener('scroll', () => {
    const activeId = getActiveSectionId(container, sections);
    updateActiveNav(activeId);
  }, { passive: true });
}

/** Toggles the active language button in the header. */
function initLangToggle() {
  document.querySelectorAll('.lang-toggle .lang').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-toggle .lang').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

initArrowButtons();
initNavLinks();
initScrollObserver();
initWheelScroll();
initLangToggle();
