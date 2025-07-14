
// htmlPath.js: maneja correctamente entorno local con subcarpetas (ej. /Website_The_Rolling_Volts/Nosotros/)

export function htmlPath() {
    const currentURL = window.location.href;
    const urlObj = new URL(currentURL);
    const isLocalhost = urlObj.hostname === 'localhost';

    const pathname = urlObj.pathname;
    const pathSegments = pathname.split('/').filter(Boolean); // elimina strings vacíos

    let basePath = '';
    let relativePath = '/';

    if (isLocalhost) {
        // Ej: /Website_The_Rolling_Volts/Nosotros/ => base: /Website_The_Rolling_Volts, relativa: /Nosotros/
        if (pathSegments.length > 0) {
            basePath = '/' + pathSegments[0];
        }
        if (pathSegments.length > 1) {
            relativePath += pathSegments.slice(1).join('/') + '/';
        }
    } else {
        // Producción: base solo es dominio, relative es todo el path
        basePath = '';
        relativePath = pathname.endsWith('/') ? pathname : pathname + '/';
    }

    const absolute = isLocalhost ? urlObj.origin + basePath : urlObj.origin;

    console.log('🌐 Ruta absoluta:', absolute);
    console.log('📁 Ruta relativa:', relativePath);
	/*
    return {
        absolute,
        relative: relativePath
    };
	*/
	return absolute + '/';
}
