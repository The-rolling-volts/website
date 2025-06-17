// Como no puedo acceder dinamicamente a las rutas de los directorios html con js >:C
// dato que tambien seria un fallo de seguridad bien perron :v
// para los archivos que necesiten acceder a la raiz del directorio
// se pondra un atributo data-path="path" en el tag html
// que me brindara la info que necesito para poner rutas absolutas sin complique

export function htmlPath(){
// la funcion accede al path en el dataset del tag html y adquiere la ruta necesitada
	const htmlPath = document.querySelector('html').dataset.path;
	if( htmlPath == 'root' || htmlPath =='' || htmlPath == '')
		return './';
	else return htmlPath+'/';
}