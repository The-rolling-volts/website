import { ScriptTag } from "./ScriptTag.js";
import { htmlPath } from "./htmlPath.js";
import { WebComponent } from "./WebComponent.js";

//window.addEventListener("load", function () {
  const path = htmlPath();
  console.log(path);
  const urlMapModulos = {
    './img/gestion.webp': 'modulos/img/gestion.webp',
    './img/industry4.webp': 'modulos/img/industry4.webp',
    './img/planeacion.webp': 'modulos/img/planeacion.webp',
    './img/economic.webp': 'modulos/img/economic.webp',
    './img/celda.webp': 'modulos/img/celda.webp',
    './img/digitalFactory.webp': 'modulos/img/digitalFactory.webp',
    './img/PLC.webp': 'modulos/img/PLC.webp',
    './img/SCADA.webp': 'modulos/img/SCADA.webp'
  };

  const articleNewsCardCSS = new ScriptTag(
    'link',
    '',
    `href;${path}css/articleNewsCard.css`,
    'rel;stylesheet preload prefetch', 'as;style', 'async;true'
  );

  const modulosWebComponent = new WebComponent(
    path,
    document.createElement('div'),
    urlMapModulos,
    'containerArticleCard',
    'modulos.html',
    '.thumbnail',
    'last'
  );
//});
