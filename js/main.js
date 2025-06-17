import { Element } from "./Element.js";
import { ScriptTag } from "./ScriptTag.js";
import { htmlPath } from "./htmlPath.js";
import { Menu } from "./Menu.js";
import { Footer } from "./footer.js";
/*
Nota: las clases Menu y Footer son identicas, tiene mas sentido crear una nueva clase
llamada WebComponent y pasar como parametros los valores de menu y footer en vez de tener dos clases

*/
window.onload = function () {
    const HTML = new Element(document.getElementsByTagName('html')[0]);
    const path = htmlPath();
    console.log(path);
    const menu = new Menu(path);
    const footer = new Footer(path);

    const styleCSS = new ScriptTag('link','',`href;${path}css/style.css`,'rel;stylesheet preload prefetch','as;style','async;true');
    const footerCSS = new ScriptTag('link','',`href;${path}css/footer.css`,'rel;stylesheet preload prefetch','as;style','async;true');
    const scriptJS = new ScriptTag('script', '', `src;${path}js/script.js`, 'as;script', 'async;true');

    //Usar esto para acceder a las rutas en vez de data-path en cada pagina
    const currentURL = window.location.href;
    console.log(currentURL);

}
