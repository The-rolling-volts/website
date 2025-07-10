import { Element } from "./Element.js";
import { ScriptTag } from "./ScriptTag.js";
import { htmlPath } from "./htmlPath.js";
//import { Menu } from "./Menu.js";
import { Footer } from "./footer.js";
import { WebComponent } from "./WebComponent.js";
/*
Se creo una clase que reemplaza las antiguas clases Menu y Footer, Footer es dependiente de un elemento llamado overlay entonces hay que ver se añade ese elemento usando la clase WebComponent para que este justo despues del footer
Tambien hay que poner todos los elementos del hrefMap
*/
window.onload = function () {
    const HTML = new Element(document.getElementsByTagName('html')[0]);
    const path = htmlPath();
    console.log(path);
    const hrefMap = {
        'The Rolling Volts':'index.html',
        'Inicio': 'index.html',
        'Gestión de Proyecto': 'aprendizaje/gestion.html',
        'Trabajo Colaborativo': 'aprendizaje/colaborativo.html',
        'Proceso de Aprendizaje': 'aprendizaje/proceso.html',
        'Recomendaciones': 'aprendizaje/recomendaciones.html',
        'Nosotros': 'Nosotros/index.html',
    };
    const menu = new WebComponent(path, document.createElement('nav'), hrefMap, 'navbar sticky', 'menu.html', '.menu-item,.logo', 'first');
    const footer = new Footer(path);
    //const footer = new WebComponent(path,document.createElement('footer'),'footer','footer.html','footer-item')

    const styleCSS = new ScriptTag('link', '', `href;${path}css/style.css`, 'rel;stylesheet preload prefetch', 'as;style', 'async;true');
    const favicon = new ScriptTag('link','',`href;${path}img/simbolos/logoWhite.svg`,'type;image/svg+xml','async;true','rel;icon');
    const footerCSS = new ScriptTag('link','',`href;${path}css/footer.css`,'rel;stylesheet preload prefetch','as;style','async;true');
    const scriptJS = new ScriptTag('script', '', `src;${path}js/script.js`, 'as;script', 'async;true');


    

    //Usar esto para acceder a las rutas en vez de data-path en cada pagina
    const currentURL = window.location.href;
    console.log(currentURL);

}
