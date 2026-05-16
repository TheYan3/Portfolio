/** Returns the currently active language. */
function getActiveLang() {
   return localStorage.getItem("lang") || "en";
}

/** Returns the translated string for the given key. */
function getMsg(key) {
   return translations[getActiveLang()]?.[key] || "";
}

/** Appends a timed message paragraph to the form. */
function appendFormMsg(form, key, cssClass) {
   const msg = document.createElement("p");
   msg.textContent = getMsg(key);
   msg.className = cssClass;
   form.appendChild(msg);
   setTimeout(() => msg.remove(), 5000);
}

/** Resets the form and shows a timed success message. */
function showFormSuccess(form) {
   form.reset();
   form.querySelectorAll("input, textarea").forEach((f) => f.classList.remove("touched"));
   form.querySelectorAll(".field-error").forEach((e) => (e.textContent = ""));
   appendFormMsg(form, "contact.success", "form-success-msg");
}

/** Shows an inline error message in the static span directly after the field. */
function showFieldError(field, key) {
   const err = field.nextElementSibling;
   if (err?.classList.contains("field-error")) {
      err.textContent = getMsg(key);
   }
}

/** Clears the inline error message in the static span directly after the field. */
function clearFieldError(field) {
   const err = field.nextElementSibling;
   if (err?.classList.contains("field-error")) {
      err.textContent = "";
   }
}

/** Sets customValidity on the email field when TLD is missing. */
function validateEmailTld(field) {
   if (field.type !== "email" || !field.value) return;
   const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field.value);
   field.setCustomValidity(valid ? "" : "invalid");
}

/** Returns the i18n error key matching the field's current validity state. */
function getFieldErrorKey(field) {
   if (field.validity.valueMissing) return `contact.error.${field.name}.required`;
   if (field.validity.typeMismatch || field.validity.customError) return "contact.error.email.invalid";
   return null;
}

/** Shows or clears the inline error for a single field. */
function validateField(field) {
   if (field.type === "checkbox") return;
   validateEmailTld(field);
   const key = getFieldErrorKey(field);
   key ? showFieldError(field, key) : clearFieldError(field);
}

/** Shows or clears the privacy error message. */
function validatePrivacy(form) {
   const checkbox = form.querySelector("#privacy-check");
   const err = form.querySelector(".privacy-error");
   if (!err) return;
   err.textContent = checkbox?.checked ? "" : getMsg("contact.error.privacy.required");
}

/** POSTs form data and shows inline success or error message. */
function submitContactForm(form, btn) {
   const fd = new FormData(form);
   fetch("send-mail.php", {
      method: "POST",
      body: new URLSearchParams({ name: fd.get("name"), email: fd.get("email"), message: fd.get("message") }),
   })
      .then((r) => r.json())
      .then((data) => {
         if (data.success) showFormSuccess(form);
         else appendFormMsg(form, "contact.error.server", "form-error-msg");
      })
      .catch(() => appendFormMsg(form, "contact.error.network", "form-error-msg"))
      .finally(() => { if (btn) btn.disabled = false; });
}

/** Adds blur and input listeners to show per-field errors. */
function initFieldValidation(form) {
   form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("blur", () => {
         field.classList.add("touched");
         validateField(field);
      });
      field.addEventListener("input", () => {
         if (field.classList.contains("touched")) validateField(field);
      });
   });

   const privacyCheck = form.querySelector("#privacy-check");
   if (privacyCheck) {
      privacyCheck.addEventListener("change", () => {
         privacyCheck.classList.add("touched");
         validatePrivacy(form);
      });
   }
}

/** Marks all fields as touched to trigger validation styling. */
function markAllTouched(form) {
   form.querySelectorAll("input, textarea").forEach((f) => f.classList.add("touched"));
}

/** Initializes the contact form with inline validation and submit handling. */
function initContactForm() {
   const form = document.querySelector(".contact-form");
   if (!form) return;
   initFieldValidation(form);
   form.addEventListener("submit", (e) => {
      e.preventDefault();
      markAllTouched(form);
      form.querySelectorAll("input, textarea").forEach(validateField);
      validatePrivacy(form);
      if (!form.checkValidity()) return;
      const btn = form.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;
      submitContactForm(form, btn);
   });
}
