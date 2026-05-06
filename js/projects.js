/** Toggles expand/collapse on a single project card. */
function toggleProjectCard(card) {
   const btn = card.querySelector(".project-toggle-btn:not(.project-toggle-btn--bottom)");
   const expanded = card.classList.toggle("is-expanded");
   btn.setAttribute("aria-expanded", expanded);
}

/** Binds both toggle buttons on each project card wrapper to expand or collapse it. */
function initProjectExpand() {
   document.querySelectorAll(".project-card-wrapper").forEach((wrapper) => {
      const card = wrapper.querySelector(".project-card");
      const btn = wrapper.querySelector(".project-toggle-btn:not(.project-toggle-btn--bottom)");
      const btnBottom = wrapper.querySelector(".project-toggle-btn--bottom");
      if (!btn || !card) return;
      btn.addEventListener("click", () => toggleProjectCard(card));
      if (btnBottom) btnBottom.addEventListener("click", () => toggleProjectCard(card));
   });
}
