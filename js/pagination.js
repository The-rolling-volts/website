// pagination.js
import { htmlPath } from './htmlPath.js';

const svgArrow = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
     fill="currentColor" aria-hidden="true">
  <path fill-rule="evenodd"
        d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z"
        clip-rule="evenodd"></path>
</svg>`;

const PAGINATION_MAP = {
  'modulos/industria4/index.html': {
    prev: { href: 'index.html',                                  text: 'Inicio'      },
    next: { href: 'modulos/gestion/index.html',                  text: 'Modulo 2'    }
  },
  'modulos/gestion/index.html': {
    prev: { href: 'modulos/industria4/index.html',               text: 'Modulo 1'    },
    next: { href: 'modulos/planeacion/index.html',               text: 'Modulo 3'    }
  },
  'modulos/planeacion/index.html': {
    prev: { href: 'modulos/gestion/index.html',                  text: 'Modulo 2'    },
    next: { href: 'modulos/evaluacionEconomica/index.html',      text: 'Modulo 4'    }
  },
  'modulos/evaluacionEconomica/estudioDeMercado.html': {
    prev: { href: 'modulos/planeacion/index.html',               text: 'Modulo 3'    },
    next: { href: 'modulos/evaluacionEconomica/index.html',      text: 'Modulo 4.2'  }
  },
  'modulos/evaluacionEconomica/index.html': {
    prev: { href: 'modulos/evaluacionEconomica/estudioDeMercado.html', text: 'Modulo 4.1' },
    next: { href: 'modulos/celdaManufactura/index.html',         text: 'Modulo 5'    }
  },
  'modulos/celdaManufactura/index.html': {
    prev: { href: 'modulos/evaluacionEconomica/index.html', text: 'Modulo 4.2'    },
    next: { href: 'modulos/digitalFactory/index.html',           text: 'Modulo 6'    }
  },
  'modulos/digitalFactory/index.html': {
    prev: { href: 'modulos/celdaManufactura/index.html',         text: 'Modulo 5'    },
    next: { href: 'modulos/PLC/index.html',                      text: 'Modulo 7'    }
  },
  'modulos/PLC/index.html': {
    prev: { href: 'modulos/digitalFactory/index.html',           text: 'Modulo 6'    },
    next: { href: 'modulos/SCADA/index.html',                    text: 'Modulo 8'    }
  },
  'modulos/SCADA/index.html': {
    prev: { href: 'modulos/PLC/index.html',                      text: 'Modulo 7'    },
    next: { href: 'index.html',                                  text: 'Inicio'      }
  }
};

// Construye e inserta la paginación.
export function initPagination() {
  const base = htmlPath(); // prefijo relativo calculado dinámicamente
  const pathname = window.location.pathname.replace(/\\/g, '/');

  // Busca la primera coincidencia en el mapa
  let config = null;
  for (const key in PAGINATION_MAP) {
    if (pathname.includes(key)) {
      config = PAGINATION_MAP[key];
      break;
    }
  }
  // Si no coincide nada → enlaces vacíos (según tu condición final)
  if (!config) {
    config = {
      prev: { href: '', text: '' },
      next: { href: '', text: '' }
    };
  }

  // Crea el <nav>
  const nav = document.createElement('nav');
  nav.className = 'pagination';

  const aPrev = document.createElement('a');
  aPrev.className = 'previous';
  aPrev.href = config.prev.href ? base + config.prev.href : '';
  aPrev.innerHTML = `${svgArrow} ${config.prev.text}`;

  const aNext = document.createElement('a');
  aNext.className = 'next';
  aNext.href = config.next.href ? base + config.next.href : '';
  aNext.innerHTML = `${config.next.text} ${svgArrow}`;

  nav.appendChild(aPrev);
  nav.appendChild(aNext);

  // Inserta: después de <header>
  const header = document.querySelector('header');
  if (header) header.insertAdjacentElement('afterend', nav);

  // Inserta copia: antes de <footer>
  const footer = document.querySelector('footer');
  if (footer) footer.insertAdjacentElement('beforebegin', nav.cloneNode(true));
}

// pagination.js
function autoStart() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPagination);
  } else {
    initPagination(); // el DOM ya está listo
  }
}
autoStart();