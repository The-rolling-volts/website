import { Element } from "./Element.js";
import { ScriptTag } from "./ScriptTag.js";
import { htmlPath } from "./htmlPath.js";
import { WebComponent } from "./WebComponent.js";

window.onload = function () {
    const path = htmlPath();
    //const path = paths.absolute + '/';
    console.log(path);
    const urlMap = {
        'index.html':'index.html',
        './procesoDeAprendizaje/index.html':'procesoDeAprendizaje/index.html',
        './productoDeIngenieria/index.html':'productoDeIngenieria/index.html', //
        './modulos/index.html':'modulos/index.html', //
        './modulos/gestion/index.html':'modulos/gestion/index.html', // //
        './modulos/industria4/index.html':'modulos/industria4/index.html', // //
        './modulos/planeacion/index.html':'modulos/planeacion/index.html', // //
        './modulos/evaluacionEconomica/index.html':'modulos/evaluacionEconomica/index.html', // //
        './modulos/celdaManufactura/index.html':'modulos/celdaManufactura/index.html', // //
        './modulos/digitalFactory/index.html':'modulos/digitalFactory/index.html', // //
        './modulos/PLC/index.html':'modulos/PLC/index.html', // //
        './modulos/SCADA/index.html':'modulos/SCADA/index.html', // //
        './productos/index.html':'productos/index.html', //
        './Nosotros/index.html': 'Nosotros/index.html',
        '#': 'index.html'
    };
    const urlMapFooter = {
        './Nosotros/index.html#johan' : 'Nosotros/index.html#johan',
        './Nosotros/index.html#david' : 'Nosotros/index.html#david',
        './Nosotros/index.html#andres': 'Nosotros/index.html#andres',
        './Nosotros/index.html#luis' : 'Nosotros/index.html#luis',
        '#': 'index.html',
        'index.html' : 'index.html'
    }
    const styleCSS = new ScriptTag('link', '', `href;${path}css/style.css`, 'rel;stylesheet preload prefetch', 'as;style', 'async;true');
    const favicon = new ScriptTag('link','',`href;${path}img/simbolos/logoWhite.svg`,'type;image/svg+xml','async;true','rel;icon');
    const footerCSS = new ScriptTag('link','',`href;${path}css/footer.css`,'rel;stylesheet preload prefetch','as;style','async;true');
    const menuJS = new ScriptTag('script', null , `src;${path}js/menu.js`, 'as;script', 'async;true'); //se pasa null para que no se añada automaticamente el script
    const overlayMenu = new Element(document.createElement('div')); //overlay es un elemento que no esta dentro del nav del menu pero es importante para su funcionamiento
    overlayMenu.setAttributes('class;overlay');

    const menu = new WebComponent(
        path, document.createElement('nav'), urlMap, 'navbar sticky', 'menu.html', '.menu-item,.logo', 'first',
        {
            onload: () => {
                overlayMenu.addToElement();//se carga overlay al body
                menuJS.addToElement();// esta función carga el script menu.js despues de que se cargo el webcomponent
            }
        } 
    );
    const footer = new WebComponent(path, document.createElement('footer'), urlMapFooter, 'footer', 'footer.html', 'footer-item');
    //Usar esto para acceder a las rutas en vez de data-path en cada pagina
    //const currentURL = window.location.href;
    //console.log(currentURL);
}
