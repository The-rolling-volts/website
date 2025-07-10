import { htmlPath } from './htmlPath.js';
import { Element } from './Element.js';
export class WebComponent  extends Element{ 
    constructor(path, element, hrefMap, className, htmlFile,hrefClass,position='last') {
        super(element);
        this.path = path;//path es la ruta actual del archivo
        this.htmlFile = htmlFile;//htmlFile es un strind del nombre del .html que tiene el webComponent
        this.className = className; //className es un string con los nombres de la clase del presente elemento
		this.hrefMap = hrefMap; // Son las rutas relativas a reemplazar
		this.hrefClass = hrefClass; //son las clases con las que luego se reemplaza href
		this.position = position; //es si se añade primero o ultimo al body
		this.setAttributes(`class;${className}`);
		this.load = this.load.bind(this);
		this.load();
		this.addToElement(undefined,this.position);
	}

	load() {
		fetch(`${this.path}webComponents/${this.htmlFile}`)
			.then(res => res.text())
			.then(data => { 
				this.setAttributes(`innerHTML;${data}`)
				//this.element.innerHTML = data;
				const base = htmlPath();//Después de insertar el elemento, actualiza los href
				document.querySelectorAll(this.hrefClass).forEach(link => {
					const text = link.textContent.trim();
					if (this.hrefMap[text]) {
						link.setAttribute('href', base + this.hrefMap[text]);
					}
				});
			});
    }
}

