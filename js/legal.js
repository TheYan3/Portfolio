/** Wires each arrow button to scroll to its data-target section. */
function initArrowButtons() {
  document.querySelectorAll('.arrow-btn, .arrow-btn-back').forEach((btn) => {
    btn.addEventListener('click', () => scrollToSection(btn.dataset.target));
  });
}

renderSocialLinks();
initArrowButtons();
initWheelScroll();
initLangToggle();
initBurgerMenu();
