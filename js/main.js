import { Element } from "./Element.js";
import { ScriptTag } from "./ScriptTag.js";
import { htmlPath } from "./htmlPath.js";
import { WebComponent } from "./WebComponent.js";

window.onload = function () {
    const path = htmlPath();
    const urlMap = {
        'index.html': 'index.html',
        './img/simbolos/logoWhite.svg':'img/simbolos/logoWhite.svg',
        './procesoDeAprendizaje/index.html':'procesoDeAprendizaje/index.html',
        './productoDeIngenieria/index.html':'productoDeIngenieria/index.html', //
        './modulos/index.html':'modulos/index.html', //
        './modulos/gestion/index.html':'modulos/gestion/index.html', // //
        './modulos/industria4/index.html':'modulos/industria4/index.html', // //
        './modulos/planeacion/index.html':'modulos/planeacion/index.html', // //
        './modulos/evaluacionEconomica/index.html': 'modulos/evaluacionEconomica/index.html',
        './modulos/evaluacionEconomica/estudioDeMercado.html': 'modulos/evaluacionEconomica/estudioDeMercado.html',
        './modulos/evaluacionEconomica/index.html#article1':'modulos/evaluacionEconomica/index.html#article1',
        './modulos/evaluacionEconomica/index.html#article2':'modulos/evaluacionEconomica/index.html#article2',
        './modulos/evaluacionEconomica/index.html#article3':'modulos/evaluacionEconomica/index.html#article3',
        './modulos/evaluacionEconomica/index.html#article4':'modulos/evaluacionEconomica/index.html#article4',
        './modulos/celdaManufactura/index.html':'modulos/celdaManufactura/index.html', // //
        './modulos/digitalFactory/index.html':'modulos/digitalFactory/index.html', // //
        './modulos/PLC/index.html':'modulos/PLC/index.html', // //
        './modulos/SCADA/index.html':'modulos/SCADA/index.html', // //
        './productos/index.html':'productos/index.html', //
        './Nosotros/index.html': 'Nosotros/index.html',
        './img/mountainBike.png': 'img/mountainBike.png',
        './img/scooter.PNG': 'img/scooter.PNG',
        './img/cargoBike.PNG': 'img/cargoBike.PNG',
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
    const footerCSS = new ScriptTag('link', '', `href;${path}css/footer.css`, 'rel;stylesheet preload prefetch', 'as;style', 'async;true');
    const articleTemplateCSS = new ScriptTag('link', '', `href;${path}css/article-template.css`, 'rel;stylesheet preload prefetch', 'as;style', 'async;true');
    const headerArticleCSS = new ScriptTag('link','',`href;${path}css/headerArticle.css`,'rel;stylesheet preload prefetch','as;style','async;true');

    const menuJS = new ScriptTag('script', null , `src;${path}js/menu.js`, 'as;script', 'async;true'); //se pasa null para que no se añada automaticamente el script
    const overlayMenu = new Element(document.createElement('div')); //overlay es un elemento que no esta dentro del nav del menu pero es importante para su funcionamiento
    overlayMenu.setAttributes('class;overlay');

    const menu = new WebComponent(
        path, document.createElement('nav'), urlMap, 'navbar sticky', 'menu.html', '.navbar', 'first',
        {
            onload: () => {
                overlayMenu.addToElement();//se carga overlay al body
                menuJS.addToElement();// esta función carga el script menu.js despues de que se cargo el webcomponent
            }
        } 
    );
    const footer = new WebComponent(path, document.createElement('footer'), urlMapFooter, 'footer', 'footer.html', '.footer');

        { 
        const articleNavbarCSS = new ScriptTag('link', '', `href;${path}css/articleNavbar.css`, 'rel;stylesheet preload prefetch', 'as;style', 'async;true');
/* ----------------------------------------------------------
➊ Construir dinámicamente el índice de artículo
---------------------------------------------------------- */
        const navBarArticle = new Element(document.createElement('nav'));
        navBarArticle.setAttributes('id;navbarArticle', 'class;navbarArticle');

        const navToggle = new Element(document.createElement('button'));
        navToggle.setAttributes(
        'id;navbarArticleToggle',
        'class;navbarArticle__toggle',
        'type;button',
        'aria-expanded;true',
        'innerText;Índice'
        );

        navBarArticle.addChild(navToggle);         // <button> → <nav>
        navBarArticle.addToElement(document.body,  'first');// <nav>   → <body> (al principio)
                                    
        const articleNavbarJS = new ScriptTag('script', 'last', `src;${path}js/articleNavbar.js`, 'as;script', 'async;true', 'type;text/javascript');

        const headerArticleJS = new ScriptTag('script', 'last', `src;${path}js/headerArticle.js`, 'as;script', 'async;true', 'type;text/javascript');
    
        const paginationJS      = new ScriptTag('script','last',`src;${path}js/pagination.js`,'as;script','async;true','type;module');
        
    }

}
