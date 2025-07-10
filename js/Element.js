export class Element {
	constructor(element) {
		//Se recibe un elemento HTML

		this.element = element;
		this.typeOfClass = 'Element';
		// Se identifica el tipo de clase usada, lo que
		// sirve para enviar mensajes de error y alerta.

		this.setAttributes = this.setAttributes.bind(this);
		this.getAttributes = this.getAttributes.bind(this);
		this.getElement = this.getElement.bind(this);
		this.addChild = this.addChild.bind(this);
		this.insertBeforeThis = this.insertBefore.bind(this);
		this.addToElement = this.addToElement.bind(this);
		this.getTypeOfClass = this.getTypeOfClass.bind(this);
		this.getHashKey = this.getHashKey.bind(this);
		this.setGlobalStyleSheet = this.setGlobalStyleSheet.bind(this);
		this.insertRuleInGlobalStyleSheet = this.insertRuleInGlobalStyleSheet.bind(this);
		//Se les da el mismo contexto de la clase a sus funciones
	

		this.witness();
		// Revisar el metodo
		
	}

	setAttributes(...valueAttribute) {
		// Se recibe una arreglo de strings con el spread parameter
		// Cada String viene con la estructura value:Attribute
		// Se utiliza el metodo split y se crean dos variables
		// tipo string, que luego se evaluan en switch para
		// cambiar los valores de diferentes atributos.

		for (let i = 0; i < valueAttribute.length; i++) {
			
			let [value, ...rest] = valueAttribute[i].split(';');
			let attribute = rest.join(';');
			
			switch (value) {
				case 'class':
					this.element.className = attribute;
					break;
				case '+class':
					this.element.classList.add(attribute);
					break;
				case '-case':
					this.element.classList.remove(attribute);
					break;
				case 'id':
					this.element.id = attribute;
					break;
				case 'placeholder':
					this.element.placeholder = attribute;
					break;
				case 'value':
					this.element.value = attribute;
					break;
				case 'text':
					this.element.innerText = attribute;
					break;
				case 'src':
					this.element.src = attribute;
					break;
				case 'type':
					this.element.type = attribute;
					break;
				case 'innerHTML':
					this.element.innerHTML = attribute;
					break;
				case 'innerText':
					this.element.innerText = attribute;
					break;
				case 'href':
					this.element.href = attribute;
					break;
				case 'target':
					this.element.target = attribute;
					break;
				case 'rel':
					this.element.rel = attribute;
					break;
				case 'async':
					this.element.async = attribute;
					break;
				case 'as':
					this.element.as = attribute;
					break;
				case 'name':
					this.element.name = attribute;
					break;
				case 'content':
					this.element.content = attribute;
					break;
				case '':
					console.warn(`there is no given attribute for \"${value}\" in class ${this.typeOfClass}`);
					break;
				default:
					console.warn(`can not find the given attribute \"${value}\" in class ${this.typeOfClass}`);
					break;
			}
		}
	}

	getAttributes(value) {
		//La función entrega el el valor del atributo recbido en el
		//parametro value
		switch (value) {
			case 'class':
				return this.element.classList;
				break;
			case 'id':
				return this.element.id;
				break;
			case 'placeholder':
				return this.element.placeholder;
				break;
			case 'value':
				return this.element.value;
				break;
			case '':
				console.warn(`there is no given attribute for \"${value}\"
					in class ${this.typeOfClass}`);
				break;
			default:
				console.warn(`can not find the given attribute 
					in class ${this.typeOfClass}`);
				break;
		}
	}

	setStyles(...valueStyle) {
		// Se recibe un rest parameter,
		// este se evalua en un ciclo donde es partido en dos
		// variables: value y style. Value sirve para evaluar
		// la accion a realizar y style es el estilo a poner.

		let value = '',
			style = '';

		for (let i = 0; i < valueStyle.length; i++) {

			value = valueStyle[i].split(';')[0];
			style = valueStyle[i].split(';')[1];

			switch (value) {
				case 'allHeight':
					this.element.style.height = style;
					this.element.style.minHeight = style;
					this.element.style.maxHeight = style;
					break;
				case 'background-color':
					this.element.style.backgroundColor = style;
					break;
				default:
					console.warn(`can not find the given style 
						in class ${this.typeOfClass}`);
					break;
			}

		}
		
	}
	setStylesProperties(...variableValue) {
		// Este metodo añade variables css el elemento de clase

		let variable = '',
			value = '';

		for (let i = 0; i < variableValue.length; i++) {

			variable = variableValue[i].split(';')[0];
			value = variableValue[i].split(';')[1];
			// El nombre de la variable debe iniciar por --, sino se agregan los --
			this.element.style.setProperty((variable.charAt(0) != '-' || variable.charAt(1) != '-')? `--${variable}`:variable,value);
		}
		
	}

	insertBefore(elementAfter) {
		if (typeof elementAfter.typeOfClass == 'undefined') // se observa si el elemento hereda de la clase Element
			elementAfter.parentNode.insertBefore(this.element, elementAfter); // sino, (probablemente) es un elemento html y se inserta asi
		else elementAfter.getElement().parentNode.insertBefore(this.element,elementAfter.getElement()); // si es, entonces se tiene que llamar a getElement()
	}

	addToElement(father,firstOrLast = 'last') {
		// El metodo puede recibir o un string o un objeto.
		// Si recibe un objeto añade directamente el elemento
		// this.element, sino toma el string y accede al elemento
		// usando el string como un id.
		// Por ultimo, si no recibe nada agrega el elemento directo
		// al body.
		if (typeof father == 'string') {
			if (document.getElementById(father))
				if(firstOrLast == 'last') //Por defecto se añade el elemento al final
					document.getElementById(father).appendChild(this.element);
				else //sino se pone al inicio
					document.getElementById(father).prepend(this.element);
		} else if (typeof father == 'object')
			if (firstOrLast == 'last')
				father.appendChild(this.element);
			else
				father.prepend(this.element);
			
		else {
			if (document.getElementsByTagName('body')[0])
				if(firstOrLast == 'last') //Por defecto se añade el elemento al final
					document.getElementsByTagName('body')[0].appendChild(this.element);
				else //sino se pone al inicio
					document.getElementsByTagName('body')[0].prepend(this.element);
				
		}
	}

	getElement() {
		//Reterno el elemento
		return this.element;
	}
	getTypeOfClass() {
		return this.typeOfClass;
	}
	addChild(...children) {
		//Se recibe un arreglo de parametros
		//Añade hijos (elementos HTML)al elemento

		// Si no existe un listado previo con los hijos se hace uno
		if (!this.childrenHashes) this.childrenHashes = [];

		for (let child of children) {
			if (child.typeOfClass) {
				this.element.appendChild(child.getElement());
				// se añade el hash del hijo a un listado
				this.childrenHashes.push(child.getHashKey());
			}else
				this.element.appendChild(child);
				// aquellos elementos que no sean o hereden de Element no son recordados (por ahora)
		}
	
		// El ciclo for of permite operar sobre cada
		// uno de los elementos de un arreglo, de esta
		// manera child toma el valor de cada posición
		// en el arreglo y lo añade.
		

		// Dentro del ciclo for hay un condicional que evalua si existe
		// la variable typeOfClass propia de todos las clases que heredad
		// de la super clase Element. De esta manera, si se recibe una clase
		// de este tipo se accede a su valor HTML por medio del metodo 
		// getElement, de otro modo se tiene que enviar como parametro solo
		// el objeto HTML		
	}

	witness() {


		// Este metodo crea una codigo hash para el elemento actual
		// y lo guarda en un diccionario para se visualizado por
		// todo el documento

		if (!document.witness) document.witness = {};

		this.hashKey = `${this.hashcode()}`;
		//console.log('haskey: ',this.hashKey)
		//console.log('hashcode final:' + this.hashKey)
		document.witness[this.hashKey] = this.getElement();

		// El metodo solo agrega un diccionario al documento
		// el cual servira para alamacenar y crear nuevas
		// llaves que no se puedan repetir.
		
	}

	getHashKey() {
		return this.hashKey;
	}

	hashcode(limit = 0){
		
		// Este metodo crea un codigo hash a partir de el tipo
		// de la clase 'this.typeOfClass'


		let hashcode = null;

		if(limit == 0){

			
			hashcode = Array.prototype.map.call(
				this.typeOfClass , 
				x => x.charCodeAt(0)
				);
			// Primero convierte el string a una cadena de numeros


			hashcode = hashcode.reduce(
				(previous,actual) => {
					return previous + actual
				});
			// Luego suma toda la cadena de numeros


			hashcode = Math.floor(Math.random() * hashcode * 37);
			// multiplica ese valor por 37 y obtiene un numero al
			// azar desde 1 hasta 37 veces hashcode
			
		}else{
			hashcode = Math.round( Math.random * limit + limit);
			// Obtiene hasu code en un rango que va de [ limit, 2 limit]
		}

		if( document.witness[`${hashcode}`] )
			this.hashcode(hashcode);

		return hashcode;
	
		// Si la llave ya existia se llama a la misma funcion
		// sino se retorna la llave
	}
	setGlobalStyleSheet(){// Es necesario una hoja de estilos general para hacer cambios
		if (!document.getElementById('globalStyleSheet')) {// si la hoja de estilos general aun no existe, se crea una
			let generalStyleSheet = new Element(document.createElement('style'));
			generalStyleSheet.setAttributes('id;globalStyleSheet');
			generalStyleSheet.addToElement();
			return generalStyleSheet.getElement();
		} else return document.getElementById('globalStyleSheet');//si ya existe, solo se retorna
	}

	insertRuleInGlobalStyleSheet(...rules) { // Este metodo añade reglas a la hoja de estilos general
		let globalSheet = this.setGlobalStyleSheet().sheet;// se adquiere la hoja de estilos
		for (let i = 0; i < rules.length; i++) // las reglas se añaden con un ciclo for
			globalSheet.insertRule(rules[i]);
	}
}