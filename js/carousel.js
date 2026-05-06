/** Moves the carousel to index (wrapping), updates transform and active dot. */
function goToSlide(state, index) {
   state.current = ((index % state.N) + state.N) % state.N;
   state.track.style.transform = "translateX(-" + state.current * (100 / state.N) + "%)";
   state.dots.querySelectorAll(".carousel-dot").forEach((d, i) => {
      d.classList.toggle("is-active", i === state.current);
   });
}

/** Creates and appends one dot button per slide, wired to goToSlide. */
function buildCarouselDots(state) {
   [...Array(state.N)].forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Referenz " + (i + 1));
      dot.addEventListener("click", () => goToSlide(state, i));
      state.dots.appendChild(dot);
   });
}

/** Adds touch-swipe support to a carousel track element. */
function initCarouselSwipe(track, onSwipeLeft, onSwipeRight) {
   let startX = 0;
   track.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
   track.addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) diff > 0 ? onSwipeLeft() : onSwipeRight();
   }, { passive: true });
}

/** Builds the references carousel with dot navigation and wrapping swipe support. */
function initReferencesCarousel() {
   const track = document.querySelector(".carousel-track");
   const dots = document.querySelector(".carousel-dots");
   if (!track || !dots || dots.children.length > 0) return;
   const cards = [...track.querySelectorAll(".reference-card")];
   if (cards.length === 0) return;
   const state = { track, dots, N: cards.length, current: 0 };
   track.style.width = state.N * 100 + "%";
   cards.forEach((c) => { c.style.width = 100 / state.N + "%"; });
   buildCarouselDots(state);
   initCarouselSwipe(track, () => goToSlide(state, state.current + 1), () => goToSlide(state, state.current - 1));
}
