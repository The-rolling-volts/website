
import { htmlPath } from './htmlPath.js';
import { Element } from './Element.js';

export class WebComponent extends Element {
    constructor(path, element, urlMap, className, htmlFile, hrefClass, position = 'last', options = {}) {
        super(element);
        this.path = path;//path es la ruta actual del archivo
        this.htmlFile = htmlFile;//htmlFile es un strind del nombre del .html que tiene el webComponent
        this.className = className; //className es un string con los nombres de la clase del presente elemento
		this.urlMap = urlMap; // Son las rutas relativas a reemplazar
		this.hrefClass = hrefClass; //son las clases con las que luego se reemplaza href
		this.position = position; //es si se añade primero o ultimo al body
		//options permite cargar varias funciones a la clase WebComponent
		this.onload = options.onload || null; //una función para cargar scripts u otros elementos despues de que se ha cargado el webcomponent
		this.setAttributes(`class;${className}`);
		this.load = this.load.bind(this);

        this.addToElement(undefined, this.position);// cuando el primer parametro es indefinido. Este elemento se añade por defecto al body

        if (!(this.htmlFile == undefined || this.urlMap == undefined || this.hrefClass == undefined)) {
            this.load();
        }
    }

    load() {
        fetch(`${this.path}webComponents/${this.htmlFile}`)
            .then(res => res.text())
            .then(data => {
                this.element.innerHTML = data;

                const base = htmlPath();//Después de insertar el elemento, actualiza los href
                const map = this.urlMap;

                // Unificar todos los elementos con atributos tipo URL
                const elementsWithSrc = [
                    { selector: 'a', attr: 'href' },
                    { selector: 'img', attr: 'src' },
                    { selector: 'iframe', attr: 'src' },
                    { selector: 'video', attr: 'src' },
                    { selector: 'video', attr: 'poster' },
                    { selector: 'audio', attr: 'src' },
                    { selector: 'source', attr: 'src' },
                    { selector: 'script', attr: 'src' },
                    { selector: 'link', attr: 'href' }
                ];

                elementsWithSrc.forEach(({ selector, attr }) => {
                    document.querySelectorAll(selector).forEach(el => {
                        const val = el.getAttribute(attr);
                        //console.log(base + map[val]);
                        if (val && map[val]) {
                            el.setAttribute(attr, base + map[val]);
                        }
                    });
                });

                if (typeof this.onload === 'function') this.onload();// Onload va a cargar elementos depues de que el webcomponent se haya cargado
            })
            .catch(err => console.error("Error loading WebComponent:", err));
    }
}
