// La función directTo cumple retorna una funcion para abrir
// un enlace, esto en la misma pestaña u en otra.


export function directTo(url,typeOfTarget="new"){


	if(typeof url == 'string'){

		if(typeof typeOfTarget != 'string')
			console.warn('La url recibida no es valida');
		else if (typeOfTarget == 'new' || typeOfTarget == '_blank')
			return () => window.open(url);
		else if (typeOfTarget == 'self' || typeOfTarget == '_self')
			return () => document.location=url;

	}else
		console.warn('La url recibida no es valida');

	return null;
}


// La funcion recibe una URL
// Para que la URL pueda redirigir a una pagina en linea
// debe tener el siguiente texto a su inicio : "https://"
// De otro modo, redirigira a un archivo en el fichero local

// El objetivo de la función es retonar otra funcion que sea
// ejecutable en diferentes clases u objetos

// Primero se obtienen dos parametros, sino se ingresa el
// se toma por defecto el valor "new"
// Luego se evalua el tipo de parametros, si los parametros
// no son strings entonces se retorna una funcion nula y se
// advierte de la equivocación.

// Luego se evalua si la ventana se abrira en la misma pestaña
// o en otra por medio de retornar un arrow function.

// Como se ve, por condicion hay dos valores validos, uno
// corresponde a un texto arbitrario dado por tu amo y señor (yo)
// el otro corresponde al valor que se pone como target en HTML
