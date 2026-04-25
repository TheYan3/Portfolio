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

/** Returns the index of the currently snapped section. */
function getActiveSectionIndex(container, sections) {
  const containerLeft = container.getBoundingClientRect().left;
  let closest = 0;
  let minDist = Infinity;

  sections.forEach((section, index) => {
    const dist = Math.abs(section.getBoundingClientRect().left - containerLeft);
    if (dist < minDist) {
      minDist = dist;
      closest = index;
    }
  });

  return closest;
}

/** Navigates to the next or previous section based on scroll direction. */
function navigateByDelta(delta, container, sections) {
  const currentIndex = getActiveSectionIndex(container, sections);
  const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + (delta > 0 ? 1 : -1)));
  scrollToSection(sections[nextIndex].id);
}

/** Initializes wheel-to-horizontal-scroll handler with throttle. */
function initWheelScroll() {
  const container = document.querySelector('.scroll-container');
  const sections = document.querySelectorAll('.section');
  let isScrolling = false;

  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isScrolling) return;
    isScrolling = true;
    navigateByDelta(e.deltaY || e.deltaX, container, sections);
    setTimeout(() => { isScrolling = false; }, 800);
  }, { passive: false });
}

/** Initializes arrow button click handlers. */
function initArrowButtons() {
  document.querySelectorAll('.arrow-btn').forEach((btn) => {
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

initArrowButtons();
initNavLinks();
initScrollObserver();
initWheelScroll();
