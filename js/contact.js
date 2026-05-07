/** Resets the form and shows a timed success message. */
function showFormSuccess(form) {
   form.reset();
   form.querySelectorAll("input, textarea").forEach((f) => f.classList.remove("touched"));
   const msg = document.createElement("p");
   msg.textContent = "Deine Nachricht wurde erfolgreich versendet!";
   msg.style.cssText = "color:#00e5c3;margin-top:1rem;font-weight:600;";
   form.appendChild(msg);
   setTimeout(() => msg.remove(), 5000);
}

/** POSTs form data to send-mail.php and handles success or error. */
function submitContactForm(form, btn) {
   const fd = new FormData(form);
   fetch("send-mail.php", {
      method: "POST",
      body: new URLSearchParams({ name: fd.get("name"), email: fd.get("email"), message: fd.get("message") }),
   })
      .then((r) => r.json())
      .then((data) => {
         if (data.success) showFormSuccess(form);
         else alert(data.error || "Versand fehlgeschlagen. Bitte versuche es später erneut.");
      })
      .catch(() => alert("Netzwerkfehler. Bitte versuche es später erneut."))
      .finally(() => { if (btn) btn.disabled = !form.checkValidity(); });
}

/** Enables or disables the submit button based on current form validity. */
function updateSubmitButton(form) {
   const btn = form.querySelector('[type="submit"]');
   if (btn) btn.disabled = !form.checkValidity();
}

/** Marks all fields as touched to show all validation errors at once. */
function markAllTouched(form) {
   form.querySelectorAll("input, textarea").forEach((f) => f.classList.add("touched"));
}

/** Adds per-field blur and input/change listeners. */
function initFieldValidation(form) {
   form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("blur", () => field.classList.add("touched"));
      field.addEventListener("input", () => updateSubmitButton(form));
      field.addEventListener("change", () => updateSubmitButton(form));
   });
}

/** Initializes the contact form with onBlur validation and submit gating. */
function initContactForm() {
   const form = document.querySelector(".contact-form");
   if (!form) return;
   updateSubmitButton(form);
   initFieldValidation(form);
   form.addEventListener("submit", (e) => {
      e.preventDefault();
      markAllTouched(form);
      if (!form.checkValidity()) return;
      const btn = form.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;
      submitContactForm(form, btn);
   });
}
