/** Resets the form and shows a timed success message. */
function showFormSuccess(form) {
   form.reset();
   form.classList.remove("validated");
   const msg = document.createElement("p");
   msg.textContent = "Deine Nachricht wurde erfolgreich versendet!";
   msg.style.cssText = "color:#00e5c3;margin-top:1rem;font-weight:600;";
   form.appendChild(msg);
   setTimeout(() => msg.remove(), 5000);
}

/** POSTs name, email and message to send-mail.php and handles success or error. */
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
      .finally(() => { if (btn) btn.disabled = false; });
}

/** Submits the contact form via POST to send-mail.php and shows inline success or error feedback. */
function initContactForm() {
   const form = document.querySelector(".contact-form");
   if (!form) return;
   form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.classList.add("validated");
      if (!form.checkValidity()) return;
      const btn = form.querySelector('[type="submit"]') || form.querySelector("button");
      if (btn) btn.disabled = true;
      submitContactForm(form, btn);
   });
}
