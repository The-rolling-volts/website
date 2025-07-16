import {Element} from './Element.js';
export class ScriptTag extends Element{
	constructor(type='script',
			location = document.getElementsByTagName('head')[0], 
			...valueAttribute){
		// en "type" se obtiene el tipo de 'etiqueta a crear'
		// location es el elemento del dom donde se pone el "script", por defecto va en <head>
		// el ultimo parametro pueden ser distintos atributos a poner en la etiqueta
		if(typeof type == 'string'){ // se comprueba que etiqueta se crea
			if(type == 'script')super(document.createElement('script')); // se crea el elemento de esa etiqueta
			else if(type == 'link'){
				super(document.createElement('link'));  // se crea el elemento de esa etiqueta
				this.setAttributes('type;text/css','rel;stylesheet'); // por defecto link siempre es una hoja de estilos css
			}else if(type == 'meta')super(document.createElement('meta'));  // se crea el elemento de esa etiqueta
			
			this.typeOfClass = 'ScriptTag'; // se pone el nombre de la clase

			this.setAttributes(...valueAttribute);// se añaden los atributos adicionales
			if (!(location === null || location === undefined)) {
				if (location == 'default' || location == '') location = document.getElementsByTagName('head')[0];
				if (location == 'first' || location == 'last') this.addToElement(undefined, location); //si es una de esas dos palabras, el tag se pone al final o inicio del body
				else this.addToElement(location); // se pone la etiqueta script en un parte del dom ya seleccionada
				//console.log(`Se ha añadido automaticamente : ${this.element.src}`);
			}
		}else	console.warn(`The parameter in class ${this.typeOfClass} is incorrect`);
		
	}
}