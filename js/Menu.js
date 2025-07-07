import { htmlPath } from './htmlPath.js';

export class Menu { 
	constructor(path){
		this.path = path;
		this.nav = document.querySelector('.navbar.sticky');
		this.load = this.load.bind(this);
		this.load();
	}

	load() {
		fetch(`${this.path}webComponents/menu.html`)
			.then(res => res.text())
			.then(data => { 
				this.nav.innerHTML = data;

				// Después de insertar el menú, actualiza los href
				const base = htmlPath();

				// Aquí defines las rutas relativas a reemplazar
				const hrefMap = {
					'Inicio': 'index.html',
					'Gestión de Proyecto': 'aprendizaje/gestion.html',
					'Trabajo Colaborativo': 'aprendizaje/colaborativo.html',
					'Proceso de Aprendizaje': 'aprendizaje/proceso.html',
					'Recomendaciones': 'aprendizaje/recomendaciones.html',
					// Añade los demás según los textos del menú
					'Nosotros': 'nosotros.html',
				};

				document.querySelectorAll('.menu-item').forEach(link => {
					const text = link.textContent.trim();
					if (hrefMap[text]) {
						link.setAttribute('href', base + hrefMap[text]);
					}
				});
			});
	}
	/*
	load() {
		fetch(`${this.path}webComponents/menu.html`)
			.then(res => res.text())
			.then(data => { 
				this.nav.innerHTML = data
			})
	}*/
}

/*
const nav = document.querySelector('.navbar.sticky')
fetch('../webComponents/menu.html')
.then(res=>res.text())
.then(data=>{
	nav.innerHTML=data
})
*/
