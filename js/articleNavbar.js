/* ----------------------------------------------------------
   articleNavbar.js  —  Versión con IntersectionObserver
   ---------------------------------------------------------- */
console.log('Se cargó articleNavbar');

function initNavbar() {
  console.log('Inicializando navbar de artículo');

  const articles = document.querySelectorAll('article[id]');
  const navLinks = document.querySelectorAll('#navbarArticle a');
  if (!articles.length || !navLinks.length) return;

  /* ---------- 1. Resaltado de sección activa ---------- */
  const observerOptions = {
    /* Queremos que el callback dispare cuando
       el centro vertical del artículo entra en pantalla */
    root: null,                 // viewport
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0                // con rootMargin basta
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link =>
          link.classList.toggle('active', link.hash === `#${id}`)
        );
      }
    });
  }, observerOptions);

  articles.forEach(article => io.observe(article));

  /* ---------- 2. Botón “Índice” para abrir/cerrar ---------- */
  const navbar    = document.getElementById('navbarArticle');
  const toggleBtn = document.getElementById('navbarArticleToggle');

  if (navbar && toggleBtn) {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.addEventListener('click', () => {
      const open = navbar.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(open));
    });
  }
}

/* ---------- bootstrap ---------- */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbar);
} else {
  initNavbar();
}
