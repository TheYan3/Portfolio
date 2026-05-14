/** Updates active dot via IntersectionObserver on the visible card. */
function observeCarouselSlides(viewport, cards, dotsEl) {
   const dots = dotsEl.querySelectorAll(".carousel-dot");
   const observer = new IntersectionObserver(
      (entries) => {
         entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const i = cards.indexOf(entry.target);
            dots.forEach((d, j) => d.classList.toggle("is-active", j === i));
         });
      },
      { root: viewport, threshold: 0.5 }
   );
   cards.forEach((c) => observer.observe(c));
}

/** Creates and appends one dot button per slide, wired to scrollIntoView. */
function buildCarouselDots(cards, dotsEl) {
   cards.forEach((card, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Referenz " + (i + 1));
      dot.addEventListener("click", () => {
         card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      });
      dotsEl.appendChild(dot);
   });
}

/** Initializes the references carousel with scroll-snap and IntersectionObserver dots. */
function initReferencesCarousel() {
   const viewport = document.querySelector(".carousel-viewport");
   const dots = document.querySelector(".carousel-dots");
   if (!viewport || !dots || dots.children.length > 0) return;
   const cards = [...viewport.querySelectorAll(".reference-card")];
   if (cards.length === 0) return;
   buildCarouselDots(cards, dots);
   observeCarouselSlides(viewport, cards, dots);
}
