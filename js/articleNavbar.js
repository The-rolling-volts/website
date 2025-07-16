/* ----------------------------------------------------------
   articleNavbar.js
   1. Resalta sección activa mientras se hace scroll
   2. Botón “Índice” (derecha) para mostrar/ocultar el panel
   ---------------------------------------------------------- */
console.log('Se cargó articleNavbar');

function initNavbar() {
  console.log('Inicializando navbar de artículo');

  /* -------- Elementos principales -------- */
  const articles  = document.querySelectorAll('article[id]');
  const navLinks  = document.querySelectorAll('#navbarArticle a');
  if (!articles.length || !navLinks.length) return;

  /* -------- Contenedor que se desplaza -------- */
  let scrollContainer = window;                       // por defecto
  const root = document.scrollingElement || document.documentElement;

  if (root.scrollHeight <= root.clientHeight) {
    // El documento no se desplaza; buscamos un contenedor scrollable
    scrollContainer =
      Array.from(document.querySelectorAll('*'))
        .find(el =>
          el.scrollHeight > el.clientHeight &&
          /auto|scroll/.test(getComputedStyle(el).overflowY)
        ) || window;
  }

  /* -------- Resaltado de enlace activo -------- */
  function updateActiveLink() {
    const scrollY = scrollContainer === window
      ? window.pageYOffset
      : scrollContainer.scrollTop;

    let current = '';
    articles.forEach(article => {
      const top    = article.offsetTop;
      const height = article.clientHeight;
      if (scrollY >= top - height / 3) current = article.id;
    });

    navLinks.forEach(link =>
      link.classList.toggle('active', link.hash === `#${current}`)
    );
  }

  updateActiveLink();
  scrollContainer.addEventListener('scroll', updateActiveLink, { passive: true });

  /* -------- Toggle mostrar/ocultar -------- */
  const navbar    = document.getElementById('navbarArticle');
  const toggleBtn = document.getElementById('navbarArticleToggle');

  if (navbar && toggleBtn) {
    // Panel oculto por defecto ⇒ aria-expanded="false"
    toggleBtn.setAttribute('aria-expanded', 'false');

    function toggleNavbar() {
      const isOpen = navbar.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    }

    toggleBtn.addEventListener('click', toggleNavbar);
  }
}

/* -------- Arranque -------- */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbar);
} else {
  initNavbar();
}
