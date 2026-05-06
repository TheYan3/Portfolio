/** Returns true when viewport is in mobile breakpoint. */
function isMobile() {
   return window.innerWidth <= 768;
}

/** Scrolls the main container to the target section by id. */
function scrollToSection(targetId) {
   const target = document.getElementById(targetId);
   if (!target) return;
   if (isMobile()) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
   } else {
      target.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
   }
}

/** Returns the id of the section closest to the left edge of the container. */
function getActiveSectionId(container, sections) {
   let closest = null;
   let minDist = Infinity;
   sections.forEach((section) => {
      const dist = Math.abs(section.getBoundingClientRect().left - container.getBoundingClientRect().left);
      if (dist < minDist) { minDist = dist; closest = section.id; }
   });
   return closest;
}

/** Updates the active state on nav links based on current scroll position. */
function updateActiveNav(activeSectionId) {
   document.querySelectorAll(".nav-links a").forEach((link) => {
      const href = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", href === activeSectionId);
   });
}

/** Adds or removes the wheel handler on the container based on viewport width. */
function syncWheelListener(container, handler, isMobileView) {
   if (isMobileView) {
      container.removeEventListener("wheel", handler);
   } else {
      container.addEventListener("wheel", handler, { passive: false });
   }
}

/** Translates vertical wheel input to horizontal scroll (desktop only). */
function initWheelScroll() {
   const container = document.querySelector(".scroll-container");
   if (!container) return;
   const handler = (e) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY || e.deltaX;
   };
   const mq = window.matchMedia("(max-width: 768px)");
   syncWheelListener(container, handler, mq.matches);
   mq.addEventListener("change", (e) => syncWheelListener(container, handler, e.matches));
}

/** Wires each arrow button to scroll to its data-target section. */
function initArrowButtons() {
   document.querySelectorAll(".arrow-btn, .arrow-btn-back").forEach((btn) => {
      btn.addEventListener("click", () => scrollToSection(btn.dataset.target));
   });
}

/** Wires each nav link to smooth-scroll to its target section. */
function initNavLinks() {
   document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", (e) => {
         e.preventDefault();
         scrollToSection(link.getAttribute("href").replace("#", ""));
      });
   });
}

/** Observes scroll position and updates active nav link (desktop only). */
function initScrollObserver() {
   if (isMobile()) return;
   const container = document.querySelector(".scroll-container");
   if (!container) return;
   const sections = document.querySelectorAll(".section");
   container.addEventListener("scroll", () => {
      updateActiveNav(getActiveSectionId(container, sections));
   }, { passive: true });
}

/** Toggles the active language button. */
function initLangToggle() {
   document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
         document.querySelectorAll("[data-lang]").forEach((b) => b.classList.remove("active"));
         btn.classList.add("active");
      });
   });
}
