/** Opens the mobile menu overlay and locks body scroll. */
function openMenu(overlay, burgerBtn) {
   overlay.classList.add("is-open");
   overlay.setAttribute("aria-hidden", "false");
   burgerBtn.setAttribute("aria-expanded", "true");
   document.body.style.overflow = "hidden";
}

/** Closes the mobile menu overlay and restores body scroll. */
function closeMenu(overlay, burgerBtn) {
   overlay.classList.remove("is-open");
   overlay.setAttribute("aria-hidden", "true");
   burgerBtn.setAttribute("aria-expanded", "false");
   document.body.style.overflow = "";
}

/** Wires overlay nav links to close the menu then scroll to their target. */
function bindMenuLinks(overlay, burgerBtn) {
   overlay.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
         e.preventDefault();
         closeMenu(overlay, burgerBtn);
         const id = link.getAttribute("href").replace("#", "");
         setTimeout(() => scrollToSection(id), 320);
      });
   });
}

/** Opens/closes the mobile burger menu overlay. */
function initBurgerMenu() {
   const burgerBtn = document.querySelector(".burger-btn");
   const overlay = document.querySelector(".mobile-menu-overlay");
   const closeBtn = document.querySelector(".mobile-menu-close");
   if (!burgerBtn || !overlay) return;
   burgerBtn.addEventListener("click", () => openMenu(overlay, burgerBtn));
   closeBtn.addEventListener("click", () => closeMenu(overlay, burgerBtn));
   bindMenuLinks(overlay, burgerBtn);
}
