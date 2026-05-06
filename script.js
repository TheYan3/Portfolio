renderSocialLinks();
renderAboutFacts();
renderReferences();
renderSkills();
renderProjects();

initArrowButtons();
initNavLinks();
initScrollObserver();
initWheelScroll();
initLangToggle();
initBurgerMenu();
initContactForm();
initProjectExpand();

if (isMobile()) {
   initReferencesCarousel();
}

window.addEventListener("resize", () => {
   if (isMobile()) initReferencesCarousel();
}, { once: true });
