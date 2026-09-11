const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const header = $(".site-header");
const menuButton = $(".menu-button");
const mobileMenu = $(".mobile-menu");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
}, { passive: true });

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  mobileMenu.classList.toggle("open", !open);
  document.body.classList.toggle("menu-open", !open);
});

$$('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px" });

$$('[data-reveal]').forEach((element, index) => {
  element.style.setProperty('--delay', `${Math.min(index % 6, 5) * 70}ms`);
  revealObserver.observe(element);
});

const projectGrid = $("#project-grid");
const projects = window.KI_PROJECTS || [];

function renderProjects() {
  if (!projectGrid) return;
  if (!projects.length) {
    projectGrid.innerHTML = '<p class="empty-projects">Nuevos proyectos próximamente.</p>';
    return;
  }

  projectGrid.innerHTML = projects.map((project, index) => `
    <article class="project-card" data-reveal style="--delay:${index * 80}ms">
      <a class="project-visual" href="${project.url}" target="_blank" rel="noreferrer" aria-label="Ver proyecto ${project.name}">
        <img src="${project.image}" alt="Vista del proyecto ${project.name}" loading="eager" decoding="async">
        <span class="project-status"><i></i>${project.status}</span>
        ${project.logo ? `<img class="project-logo" src="${project.logo}" alt="Logo de ${project.name}">` : ''}
      </a>
      <div class="project-content">
        <div class="project-meta"><span>${project.category}</span><span>${project.year}</span></div>
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        ${project.metrics ? `<ul class="project-metrics">${project.metrics.map(metric => `<li>${metric}</li>`).join('')}</ul>` : ''}
        <div class="project-footer">
          <div class="project-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
          <a class="case-link" href="${project.caseStudy || project.url}" ${project.caseStudy ? '' : 'target="_blank" rel="noreferrer"'}>Ver caso de éxito <span>↗</span></a>
        </div>
      </div>
    </article>
  `).join('');

  $$('[data-reveal]', projectGrid).forEach(el => revealObserver.observe(el));
}

renderProjects();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const heroArtwork = $('.hero-artwork');
if (!reduceMotion && heroArtwork) {
  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - .5) * 10;
    const y = (event.clientY / window.innerHeight - .5) * 8;
    heroArtwork.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.08)`;
  }, { passive: true });
}

const contactForm = $('#contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const body = encodeURIComponent(`Hola, quiero conversar sobre un proyecto con KI Technologies.\n\nNombre: ${data.get('name')}\nEmpresa: ${data.get('company') || 'No indicada'}\nCorreo: ${data.get('email')}\n\nProyecto:\n${data.get('message')}`);
  window.open(`https://wa.me/50664218397?text=${body}`, '_blank', 'noopener,noreferrer');
});


const year = $('#year');
if (year) year.textContent = new Date().getFullYear();
