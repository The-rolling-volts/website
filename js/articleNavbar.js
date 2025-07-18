/* ----------------------------------------------------------
   articleNavbar.js — Índice dinámico con IntersectionObserver
   ---------------------------------------------------------- */
console.log('Se cargó articleNavbar');

function initNavbar() {
  const navbar   = document.getElementById('navbarArticle');
  const toggleBtn = document.getElementById('navbarArticleToggle');
  if (!navbar) return;

  /* ---------- 0. Construir enlaces dinámicamente ---------- */
  // Elimina <a> de pruebas que ya existan dentro del nav (conserva el botón)
  Array.from(navbar.querySelectorAll('a')).forEach(a => a.remove());

  // Selecciona todos los <article> que tengan la clase "article" y un id
  const articles = document.querySelectorAll('article.article[id]');

  articles.forEach(article => {
    const h1 = article.querySelector('h1');      // primer título dentro del artículo
    if (!h1) return;                             // si no hay título, se omite

    const link = document.createElement('a');
    link.href = `#${article.id}`;                // href = id del artículo
    link.textContent = h1.textContent.trim();    // texto = título del artículo
    navbar.appendChild(link);
  });

  const navLinks = navbar.querySelectorAll('a');
  if (!articles.length || !navLinks.length) return;

  /* ---------- 1. Resaltado de la sección activa ---------- */
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
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

  /* ---------- 2. Botón “Índice” abrir/cerrar ---------- */
  if (toggleBtn) {
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
