/* articleNavbar.js */
console.log('Se cargó articleNavbar');

function initNavbar() {
  console.log('Inicializando navbar de artículo');

  /* -------- Elementos a controlar -------- */
  const articles = document.querySelectorAll('article[id]');
  const navLinks = document.querySelectorAll('#navbarArticle a');
  if (!articles.length || !navLinks.length) return;

  /* -------- Averiguamos quién se desplaza --------
     1. Si <body>/<html> realmente se desplazan, usamos window.
     2. En caso contrario buscamos el primer ancestro que tenga
        desplazamiento vertical (scrollHeight > clientHeight).        */
  let scrollContainer = window;                       // por defecto
  const root = document.scrollingElement || document.documentElement;

  if (root.scrollHeight <= root.clientHeight) {
    // El documento no se desplaza; buscamos un contenedor scrollable
    scrollContainer = Array.from(document.querySelectorAll('*'))
      .find(el => el.scrollHeight > el.clientHeight && getComputedStyle(el).overflowY.match(/auto|scroll/)) || window;
  }

  /* -------- Función que actualiza el enlace activo -------- */
  function updateActiveLink() {
    console.log('scrolleando');
    const scrollY = scrollContainer === window ? window.pageYOffset
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

  // Ejecuta al cargar y en cada desplazamiento
  updateActiveLink();
  scrollContainer.addEventListener('scroll', updateActiveLink, { passive: true });
}

/* Ejecuta ahora si el DOM está listo; de lo contrario espera */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbar);
} else {
  initNavbar();
}
