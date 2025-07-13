import { Element } from "./Element.js";
import { ScriptTag } from "./ScriptTag.js";
import { htmlPath } from "./htmlPath.js";
import { WebComponent } from "./WebComponent.js";

window.onload = function () {
    //const HTML = new Element(document.getElementsByTagName('html')[0]);
    const path = htmlPath();
    console.log(path);
    const hrefMap = {
        'The Rolling Volts':'index.html',
        'Inicio': 'index.html',
        'Proceso de Aprendizaje':'procesoDeAprendizaje/index.html', //
        'Gestión de Proyecto':'procesoDeAprendizaje/index.html',
        'Trabajo Colaborativo':'procesoDeAprendizaje/index.html',
        'Proceso de Aprendizaje':'procesoDeAprendizaje/index.html',
        'Recomendaciones':'procesoDeAprendizaje/index.html',
        'Producto de Ingeniería':'productoDeIngenieria/index.html', //
        'Modulos':'modulos/index.html', //
        'Gestión de Producción y Automatización':'modulos/gestion/index.html', // //
        'Análisis de simulación de planta':'modulos/gestion/index.html',
        'Consideración de aspectos':'modulos/gestion/index.html',
        'Propuesta para Sistema MES':'modulos/gestion/index.html',
        'Industria 4.0 en la Automatización':'modulos/industria4/index.html', // //
        'Diagramas de instrumentación':'modulos/industria4/index.html',
        'Arquitectura de control':'modulos/industria4/index.html',
        'Aplicación de Industria 4.0':'modulos/industria4/index.html',
        'Planeación del Proyecto':'modulos/planeacion/index.html', // //
        'Cronograma':'modulos/planeacion/index.html',
        'Evaluación Económica de Proyectos':'modulos/evaluacionEconomica/index.html', // //
        'Presupuesto Financiero':'modulos/evaluacionEconomica/index.html',
        'Indicadores Financieros':'modulos/evaluacionEconomica/index.html',
        'Oferta Comercial':'modulos/evaluacionEconomica/index.html',
        'Celda de Manufactura Robotizada':'modulos/celdaManufactura/index.html', // //
        'Análisis de Robotización':'modulos/celdaManufactura/index.html',
        'Diseño de celda robotizada':'modulos/celdaManufactura/index.html',
        'Celda en RobotStudio':'modulos/celdaManufactura/index.html',
        'Análisis y Gestión de Riesgos':'modulos/celdaManufactura/index.html',
        'Digital Factory':'modulos/digitalFactory/index.html', // //
        'Modelación en Siemens NX':'modulos/digitalFactory/index.html',
        'Controladores Industriales(PLC)':'modulos/PLC/index.html', // //
        'Desglose de Problema':'modulos/PLC/index.html',
        'Implementación':'modulos/PLC/index.html',
        'SCADA':'modulos/SCADA/index.html', // //
        'Desarrollo HMI':'modulos/SCADA/index.html',
        'Incorporación HMI':'modulos/SCADA/index.html',
        'Productos':'productos/index.html', //
        'Scooter':'productos/index.html',
        'Cargo E- Bike':'productos/index.html',
        'Mountain E-Bike':'productos/index.html',
        'Nosotros': 'Nosotros/index.html',
    };
    const styleCSS = new ScriptTag('link', '', `href;${path}css/style.css`, 'rel;stylesheet preload prefetch', 'as;style', 'async;true');
    const favicon = new ScriptTag('link','',`href;${path}img/simbolos/logoWhite.svg`,'type;image/svg+xml','async;true','rel;icon');
    const footerCSS = new ScriptTag('link','',`href;${path}css/footer.css`,'rel;stylesheet preload prefetch','as;style','async;true');
    const scriptJS = new ScriptTag('script', null , `src;${path}js/menu.js`, 'as;script', 'async;true'); //se pasa null para que no se añada automaticamente el script

    const menu = new WebComponent(
        path, document.createElement('nav'), hrefMap, 'navbar sticky', 'menu.html', '.menu-item,.logo', 'first',
        { onload: () => { scriptJS.addToElement(); } } // esta función carga el script menu.js despues de que se cargo el webcomponent
    );
    const overlayMenu = new WebComponent(path, document.createElement('div'), undefined, 'overlay', undefined, undefined); //CREO QUE ESTO SE PUEDE HACER CON ELEMENT
    const footer = new WebComponent(path, document.createElement('footer'), hrefMap, 'footer', 'footer.html', 'footer-item');

    //Usar esto para acceder a las rutas en vez de data-path en cada pagina
    const currentURL = window.location.href;
    console.log(currentURL);
}
