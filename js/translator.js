/** @param {string} lang */
function applyTextNodes(lang) {
   document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (translations[lang]?.[key]) el.textContent = translations[lang][key];
   });
}

/** @param {string} lang */
function applyPlaceholders(lang) {
   document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (translations[lang]?.[key]) el.placeholder = translations[lang][key];
   });
}

/** @param {string} lang */
function applyHtmlNodes(lang) {
   document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.dataset.i18nHtml;
      if (translations[lang]?.[key]) el.innerHTML = translations[lang][key];
   });
}

/** @param {string} lang */
function updateToggleButtons(lang) {
   document.querySelectorAll(".lang").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
   });
}

/** @param {string} lang */
function setLang(lang) {
   applyTextNodes(lang);
   applyPlaceholders(lang);
   applyHtmlNodes(lang);
   updateToggleButtons(lang);
   localStorage.setItem("lang", lang);
}

/** Initializes language toggle */
function initLangToggle() {
   const saved = localStorage.getItem("lang") || "en";
   setLang(saved);
   document.querySelectorAll(".lang").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
   });
}
