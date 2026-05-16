const socialLinks = [
   {
      label: "Email",
      href: "mailto:yannic-jundt@gmx.de",
      viewBox: "0 0 16 16",
      path: "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z",
   },
   {
      label: "LinkedIn",
      href: "https://linkedin.com",
      target: "_blank",
      viewBox: "0 0 448 512",
      path: "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z",
   },
   {
      label: "GitHub",
      href: "https://github.com/TheYan3",
      target: "_blank",
      viewBox: "0 0 16 16",
      path: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z",
   },
];

const references = [
   {
      quoteKey: "reference.1.quote",
      authorName: "Matthias Arnoldy",
      authorRole: "Project Join",
   },
   {
      quoteKey: "reference.2.quote",
      authorName: "Jonas Weber",
      authorRole: "Project Join",
   },
   //{
   // quoteKey: "reference.3.quote",
   //authorName: "Laura Hoffmann",
   //authorRole: "Project DA Bubble",
   //},
];

const aboutFacts = [
   {
      icon: "assets/img/Icons/icon-location.svg",
      textKey: "about.fact.location",
   },
   { icon: "assets/img/Icons/Icon Remote.svg", textKey: "about.fact.remote" },
];

const skills = [
   { name: "Angular", icon: "assets/img/Icons/Angular-new-logo-small 1.svg" },
   { name: "TypeScript", icon: "assets/img/Icons/Icon.svg" },
   { name: "JavaScript", icon: "assets/img/Icons/Javascript.svg" },
   { name: "HTML", icon: "assets/img/Icons/html.svg" },
   { name: "CSS", icon: "assets/img/Icons/Icons.svg" },
   { name: "REST-API", icon: "assets/img/Icons/Api.svg" },
   { name: "Supabase", icon: "assets/img/Icons/Skills all courses.svg" },
   { name: "Git", icon: "assets/img/Icons/git.svg" },
   { name: "Scrum", icon: "assets/img/Icons/scrum.svg" },
   { name: "Firebase", icon: "assets/img/Icons/Firebase.svg" },
   { name: "Challenge me", img: "assets/img/Icons/Group 42.svg" },
];

const projects = [
   {
      number: 1,
      title: "Project Join",
      aboutKey: "project.1.about",
      technologies: "Angular, TypeScript, HTML, CSS, Firebase",
      imgSrc: "assets/img/Join.svg",
      githubUrl: "https://github.com/TheYan3/Join",
      liveUrl: "https://join.yannicjundt.de",
      footerLabelKey: "project.label.group",
      footerTextKey: "project.2.footer",
   },
   {
      number: 2,
      title: "Project Fallen Angeles",
      aboutKey: "project.2.about",
      technologies: "JavaScript, HTML, CSS",
      imgSrc: "assets/img/Fallen_Angeles.png",
      githubUrl: "https://github.com/TheYan3/Fallen-Angles",
      liveUrl: "https://fallenangeles.yannicjundt.de",
      footerLabelKey: "project.label.learned",
      footerTextKey: "project.1.footer",
   },
   //{
   //number: 3,
   //title: "Project DA Bubble",
   //aboutKey: "project.3.about",
   //technologies: "JavaScript, HTML, CSS",
   //imgSrc: "assets/img/da-bubble.png",
   //githubUrl: "#",
   //liveUrl: "#",
   //footerLabelKey: "project.label.group",
   // footerTextKey: "project.3.footer",
   //},
   {
      number: 4,
      titleKey: "project.4.title",
      ongoing: true,
      descriptionKey: "project.4.description",
   },
];
