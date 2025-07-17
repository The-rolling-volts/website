/*───────────────────────────────────────────────────────────────
  Slider Header con control de tiempo y dots clicables
────────────────────────────────────────────────────────────────*/
(function () {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
  } else {
    initSlider();
  }

  function initSlider() {
    const slider = document.querySelector('header.headerArticle .slider, .slider');
    if (!slider) return;

    const delay  = parseInt(slider.dataset.delay, 10) || 3000;
    const ul     = slider.querySelector('ul');
    const slides = Array.from(ul.children);

    let current = 0;
    let timer;

    /*----------- 1. Paginación ------------------------------------------------*/
    let pager = slider.querySelector('aside');
    if (!pager) {
      pager = document.createElement('aside');
      slider.appendChild(pager);
    }

    slides.forEach((_, i) => {
      const dot = document.createElement('a');       // ← ancla, no button
      dot.href   = '#';
      dot.role   = 'button';
      dot.ariaLabel = `Ir al slide ${i + 1}`;
      dot.addEventListener('click', e => {
        e.preventDefault();                          // evita salto de página
        gotoSlide(i, true);
      });
      pager.appendChild(dot);
    });
    const dots = Array.from(pager.children);

    /*----------- 2. Estado inicial -------------------------------------------*/
    slides[current].classList.add('current');
    updateDots();
    restartTimer();

    /*----------- 3. Navegación ------------------------------------------------*/
    function gotoSlide(n, byUser = false) {
      slides[current].classList.remove('current');
      slides[current].classList.add('prev');

      current = (n + slides.length) % slides.length;

      slides[current].classList.add('current');
      slides[current].classList.remove('prev');

      updateDots();
      if (byUser) restartTimer();
    }
    function next()               { gotoSlide(current + 1); }
    function updateDots()         { dots.forEach((d, i) => d.classList.toggle('current_dot', i === current)); }
    function restartTimer()       { clearInterval(timer); timer = setInterval(next, delay); }

    /*----------- 4. Autoplay y pausa on-hover --------------------------------*/
    slider.addEventListener('mouseenter', () => clearInterval(timer), { passive: true });
    slider.addEventListener('mouseleave', restartTimer,               { passive: true });

    /*----------- 5. Swipe táctil ---------------------------------------------*/
    let startX = 0;
    ul.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    ul.addEventListener('touchend',   e => {
      const delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 40) gotoSlide(current + (delta < 0 ? 1 : -1), true);
    }, { passive: true });
  }
})();
