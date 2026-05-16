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
   form.querySelectorAll(".field-error").forEach((e) => e.remove());
   appendFormMsg(form, "contact.success", "form-success-msg");
}

/** Shows or updates an inline error message directly after the field. */
function showFieldError(field, key) {
   let err = field.nextElementSibling;
   if (!err?.classList.contains("field-error")) {
      err = document.createElement("span");
      err.className = "field-error";
      field.after(err);
   }
   err.textContent = getMsg(key);
}

/** Removes the inline error message after the field if present. */
function clearFieldError(field) {
   const next = field.nextElementSibling;
   if (next?.classList.contains("field-error")) next.remove();
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

/** Enables or disables the submit button based on current form validity. */
function updateSubmitButton(form) {
   const btn = form.querySelector('[type="submit"]');
   if (btn) btn.disabled = !form.checkValidity();
}

/** Marks all fields as touched to trigger validation styling. */
function markAllTouched(form) {
   form.querySelectorAll("input, textarea").forEach((f) => f.classList.add("touched"));
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
      .finally(() => { if (btn) btn.disabled = !form.checkValidity(); });
}

/** Adds blur and input listeners to show per-field errors. */
function initFieldValidation(form) {
   form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("blur", () => {
         field.classList.add("touched");
         validateField(field);
      });
      field.addEventListener("input", () => {
         updateSubmitButton(form);
         if (field.classList.contains("touched")) validateField(field);
      });
      field.addEventListener("change", () => updateSubmitButton(form));
   });
}

/** Initializes the contact form with inline validation and submit gating. */
function initContactForm() {
   const form = document.querySelector(".contact-form");
   if (!form) return;
   updateSubmitButton(form);
   initFieldValidation(form);
   form.addEventListener("submit", (e) => {
      e.preventDefault();
      markAllTouched(form);
      form.querySelectorAll("input, textarea").forEach(validateField);
      if (!form.checkValidity()) return;
      const btn = form.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;
      submitContactForm(form, btn);
   });
}
