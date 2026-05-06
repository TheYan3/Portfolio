/** Returns the header HTML of a project card. */
function buildCardHeaderHTML(project) {
   return `<div class="project-card-header">
      <span class="project-number">${project.number}</span>
      <h3>${project.title}</h3>
   </div>`;
}

/** Returns the about HTML of a project card. */
function buildCardAboutHTML(project) {
   return `<div class="project-about">
      <span class="detail-label">About the project</span>
      <p>${project.about}</p>
   </div>`;
}

/** Returns the project image with GitHub and Live-Test links for a card. */
function buildCardMediaHTML(project) {
   return `<div class="project-card-media">
      <img src="${project.imgSrc}" alt="${project.title}" />
      <div class="project-links">
         <a href="${project.githubUrl}" class="btn-secondary">GitHub</a>
         <a href="${project.liveUrl}" class="btn-primary">Live Test</a>
      </div>
   </div>`;
}

/** Returns the technologies list for the card body. */
function buildCardBodyHTML(project) {
   return `<div class="project-card-body">
      <ul class="project-details">
         <li>
            <span class="detail-label">Technologies I have used</span>
            <p>${project.technologies}</p>
         </li>
      </ul>
   </div>`;
}

/** Returns the collapsible section HTML of a project card. */
function buildCardCollapsibleHTML(project) {
   return `<div class="project-card-collapsible">
      ${buildCardBodyHTML(project)}
      <div class="project-card-footer">
         <span class="detail-label">${project.footerLabel}</span>
         <p>${project.footerText}</p>
      </div>
   </div>`;
}

/** Returns the full HTML for a regular project card. */
function buildProjectCardHTML(project) {
   return `<div class="project-card-wrapper">
      <article class="project-card">
         ${buildCardHeaderHTML(project)}
         <div class="project-card-main">
            <div class="project-card-content">
               ${buildCardAboutHTML(project)}
               <button class="project-toggle-btn" aria-expanded="false">
                  Show me more <span class="toggle-arrow">&#9660;</span>
               </button>
               ${buildCardCollapsibleHTML(project)}
            </div>
            ${buildCardMediaHTML(project)}
         </div>
      </article>
      <button class="project-toggle-btn project-toggle-btn--bottom">
         Show me less <span class="toggle-arrow">&#9650;</span>
      </button>
   </div>`;
}

/** Returns the full HTML for the ongoing project card. */
function buildOngoingCardHTML(project) {
   return `<article class="project-card project-card--ongoing">
      ${buildCardHeaderHTML(project)}
      <p>${project.description}</p>
      <a href="#contact" class="btn-primary">Let's talk</a>
   </article>`;
}

/** Returns a social link anchor with inline SVG icon. */
function buildSocialLinkHTML(link) {
   const target = link.target ? `target="${link.target}"` : "";
   return `<a href="${link.href}" ${target} class="socialContainer" aria-label="${link.label}">
      <svg class="socialSvg" viewBox="${link.viewBox}">
         <path d="${link.path}" />
      </svg>
   </a>`;
}

/** Returns a reference card with quote, divider and author. */
function buildReferenceCardHTML(ref) {
   return `<div class="reference-card">
      <blockquote>"${ref.quote}"</blockquote>
      <div class="reference-divider"></div>
      <div class="reference-author">
         <p class="author-name">${ref.authorName}</p>
         <p class="author-role">${ref.authorRole}</p>
      </div>
   </div>`;
}

/** Returns a masked-icon fact item for the about section. */
function buildFactHTML(fact) {
   return `<div class="fact">
      <span class="fact-icon" style="mask-image: url('${fact.icon}'); -webkit-mask-image: url('${fact.icon}');"></span>
      <span>${fact.text}</span>
   </div>`;
}

/** Returns a masked SVG div or an img tag, depending on whether skill.img is set. */
function buildSkillIconHTML(skill) {
   if (skill.img) {
      return `<img src="${skill.img}" alt="${skill.name}" />`;
   }
   return `<div class="skill-icon" style="mask-image: url('${skill.icon}'); -webkit-mask-image: url('${skill.icon}');"></div>`;
}

/** Returns the full HTML for a single skill item. */
function buildSkillItemHTML(skill) {
   return `<div class="skill-item">
      ${buildSkillIconHTML(skill)}
      <span>${skill.name}</span>
   </div>`;
}

/** Renders social links into every .social-links and .contact-footer-social container. */
function renderSocialLinks() {
   const html = socialLinks.map(buildSocialLinkHTML).join("");
   document.querySelectorAll(".social-links, .contact-footer-social").forEach((el) => {
      el.innerHTML = html;
   });
}

/** Renders all reference cards into the carousel track. */
function renderReferences() {
   const track = document.querySelector(".carousel-track");
   if (!track) return;
   track.innerHTML = references.map(buildReferenceCardHTML).join("");
}

/** Renders all about-facts into the facts container. */
function renderAboutFacts() {
   const container = document.querySelector(".about-facts");
   if (!container) return;
   container.innerHTML = aboutFacts.map(buildFactHTML).join("");
}

/** Renders all skill items into the skills grid. */
function renderSkills() {
   const grid = document.querySelector(".skills-grid");
   if (!grid) return;
   grid.innerHTML = skills.map(buildSkillItemHTML).join("");
}

/** Renders all project cards into the projects grid. */
function renderProjects() {
   const grid = document.querySelector(".projects-grid");
   if (!grid) return;
   grid.innerHTML = projects
      .map((p) => (p.ongoing ? buildOngoingCardHTML(p) : buildProjectCardHTML(p)))
      .join("");
}
