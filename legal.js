/** Scrolls the scroll-container to the target section by id. */
function scrollToSection(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  }
}

/** Translates vertical wheel input to horizontal scroll. */
function initWheelScroll() {
  const container = document.querySelector('.scroll-container');
  if (!container) return;
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
initWheelScroll();
initLangToggle();
