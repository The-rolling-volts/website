/* ----------------------------------------------------------
   articleNavbar.js  (versión móvil-segura)
   ---------------------------------------------------------- */
console.log('Se cargó articleNavbar');

function initNavbar() {
  console.log('Inicializando navbar de artículo');

  const articles = document.querySelectorAll('article[id]');
  const navLinks = document.querySelectorAll('#navbarArticle a');
  if (!articles.length || !navLinks.length) return;

  /* --- ¿qué elemento se desplaza? --- */
  let scrollContainer = window;
  const root = document.scrollingElement || document.documentElement;

  if (root.scrollHeight <= root.clientHeight) {
    scrollContainer =
      Array.from(document.querySelectorAll('*'))
        .find(el =>
          el.scrollHeight > el.clientHeight &&
          /auto|scroll/.test(getComputedStyle(el).overflowY)
        ) || window;
  }

  /* --- resalta enlace activo --- */
  function updateActiveLink() {
    const scrollY =
      scrollContainer === window
        ? (document.scrollingElement || document.documentElement).scrollTop
        : scrollContainer.scrollTop;

    console.log('scrolleando:', scrollY);

    let current = '';
    articles.forEach(article => {
      const top = article.offsetTop;
      const h   = article.clientHeight;
      if (scrollY >= top - h / 3) current = article.id;
    });

    navLinks.forEach(link =>
      link.classList.toggle('active', link.hash === `#${current}`)
    );
  }

  updateActiveLink();

  /* --- listeners para todas las plataformas --- */
  window.addEventListener('scroll',   updateActiveLink, { passive: true });
  document.addEventListener('scroll', updateActiveLink, { passive: true });

  /* --- toggle de visibilidad --- */
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

/* --- bootstrap --- */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbar);
} else {
  initNavbar();
}
