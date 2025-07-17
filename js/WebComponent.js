
import { htmlPath } from './htmlPath.js';
import { Element } from './Element.js';

export class WebComponent extends Element {
    constructor(path, element, urlMap, className, htmlFile, filterClass, position = 'last', options = {}) {
        super(element);
        this.path = path;//path es la ruta actual del archivo
        this.htmlFile = htmlFile;//htmlFile es un strind del nombre del .html que tiene el webComponent
        this.className = className; //className es un string con los nombres de la clase del presente elemento
		this.urlMap = urlMap; // Son las rutas relativas a reemplazar
		this.filterClass = filterClass; //son las clases con las que luego se reemplaza href
		this.position = position; //es si se añade primero o ultimo al body
		//options permite cargar varias funciones a la clase WebComponent
		this.onload = options.onload || null; //una función para cargar scripts u otros elementos despues de que se ha cargado el webcomponent
		this.setAttributes(`class;${className}`);
		this.load = this.load.bind(this);

        this.addToElement(undefined, this.position);// cuando el primer parametro es indefinido. Este elemento se añade por defecto al body

        if (!(this.htmlFile == undefined || this.urlMap == undefined || this.filterClass == undefined)) {
            this.load();
        }
    }
load() {
    fetch(`${this.path}webComponents/${this.htmlFile}`)
        .then(res => res.text())
        .then(data => {
            // 1. Inserta el HTML del componente
            this.element.innerHTML = data;

            // 2. Prepara datos necesarios
            const base   = htmlPath();   // ruta absoluta base
            const map    = this.urlMap;  // diccionario de reemplazo
            const scope  = this.element; // restringe la búsqueda al componente

            // 3. Tabla de selectores que incluyen atributos con URL
            const elementsWithSrc = [
                { selector: 'a',      attr: 'href'  },
                { selector: 'img',    attr: 'src'   },
                { selector: 'iframe', attr: 'src'   },
                { selector: 'video',  attr: 'src'   },
                { selector: 'video',  attr: 'poster'},
                { selector: 'audio',  attr: 'src'   },
                { selector: 'source', attr: 'src'   },
                { selector: 'script', attr: 'src'   },
                { selector: 'link',   attr: 'href'  }
            ];

            // 4. Reemplaza solo los elementos que cumplan el filtro
            elementsWithSrc.forEach(({ selector, attr }) => {
                scope.querySelectorAll(selector).forEach(el => {
                    // -- FILTRO -------------------------------------------------
                    if (this.filterClass) {
                        // El elemento debe cumplir al menos una de las condiciones:
                        //  a) poseer la(s) clase(s) indicadas
                        //  b) ser descendiente de un elemento que las posea
                        const matchesFilter = el.matches(this.filterClass) ||
                                              el.closest(this.filterClass);
                        if (!matchesFilter) return; // ignora este elemento
                    }
                    // -----------------------------------------------------------

                    const val = el.getAttribute(attr);
                    if (val && map[val]) {
                        el.setAttribute(attr, base + map[val]);
                    }
                });
            });

            // 5. Ejecuta onload (si existe)
            if (typeof this.onload === 'function') this.onload();
        })
        .catch(err => console.error('Error loading WebComponent:', err));
}

}
