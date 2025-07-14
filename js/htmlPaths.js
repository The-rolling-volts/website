export function htmlPath(){
	const baseURL = window.location.origin;
	const pathname = window.location.pathname;

	// Si estás en GitHub Pages o en dominio personalizado
	const subdir = pathname.split('/')[1]; // ['', 'Website_The_Rolling_Volts', 'index.html']

	if (subdir && (location.hostname.includes("github.io") || location.hostname.includes("therollingvolts.com"))) {
		return `/${subdir}/`;
	}

	// En entorno local
	const htmlPath = document.querySelector('html').dataset.path;
	if (htmlPath === 'root' || htmlPath === '') return './';
	else return htmlPath + '/';
}
