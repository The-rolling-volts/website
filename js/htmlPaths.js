
// htmlPath.js mejorado: usa data-path si está definido, y si no, deduce la ruta base desde la URL

export function htmlPath() {
    const htmlElement = document.querySelector('html');
    const datasetPath = htmlElement ? htmlElement.dataset.path : null;

    if (datasetPath && datasetPath !== '' && datasetPath !== 'root') {
        return datasetPath.endsWith('/') ? datasetPath : datasetPath + '/';
    }

    // Si no hay dataset válido, deduce la ruta base desde la URL actual
    const currentURL = window.location.href;
    const pathParts = currentURL.split('/');

    // Quita todo después del último "/"
    pathParts.pop();

    // Reconstruye la ruta base relativa
    const basePath = pathParts.join('/') + '/';

    // Extrae solo la parte después del dominio
    const url = new URL(basePath);
    return url.pathname.startsWith('/') ? url.pathname : '/' + url.pathname;
}
