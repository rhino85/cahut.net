/*! DOMPurify | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.0.8/LICENSE */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.DOMPurify=t()}(this,function(){"use strict";var r=Object.hasOwnProperty,i=Object.setPrototypeOf,a=Object.isFrozen,ve=Object.keys,be=Object.freeze,e=Object.seal,t="undefined"!=typeof Reflect&&Reflect,l=t.apply,o=t.construct;l=l||function(e,t,n){return e.apply(t,n)},be=be||function(e){return e},e=e||function(e){return e},o=o||function(e,t){return new(Function.prototype.bind.apply(e,[null].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(t))))};var Te=n(Array.prototype.forEach),Ae=n(Array.prototype.indexOf),xe=n(Array.prototype.join),Se=n(Array.prototype.pop),Le=n(Array.prototype.push),Ee=n(Array.prototype.slice),ke=n(String.prototype.toLowerCase),Me=n(String.prototype.match),_e=n(String.prototype.replace),Ne=n(String.prototype.indexOf),Oe=n(String.prototype.trim),we=n(RegExp.prototype.test),De=c(RegExp),Re=c(TypeError);function n(o){return function(e){for(var t=arguments.length,n=Array(1<t?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return l(o,e,n)}}function c(r){return function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return o(r,t)}}function He(e,t){i&&i(e,null);for(var n=t.length;n--;){var r=t[n];if("string"==typeof r){var o=ke(r);o!==r&&(a(t)||(t[n]=o),r=o)}e[r]=!0}return e}function Ce(e){var t={},n=void 0;for(n in e)l(r,e,[n])&&(t[n]=e[n]);return t}var Fe=be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ze=be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","audio","canvas","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","video","view","vkern"]),Ie=be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),je=be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),Ue=be(["#text"]),Pe=be(["accept","action","align","alt","autocomplete","background","bgcolor","border","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","coords","crossorigin","datetime","default","dir","disabled","download","enctype","face","for","headers","height","hidden","high","href","hreflang","id","integrity","ismap","label","lang","list","loop","low","max","maxlength","media","method","min","minlength","multiple","name","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","type","usemap","valign","value","width","xmlns"]),We=be(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","tabindex","targetx","targety","transform","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Be=be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ge=be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),qe=e(/\{\{[\s\S]*|[\s\S]*\}\}/gm),Ke=e(/<%[\s\S]*|[\s\S]*%>/gm),Ve=e(/^data-[\-\w.\u00B7-\uFFFF]/),Ye=e(/^aria-[\-\w]+$/),Xe=e(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),$e=e(/^(?:\w+script|data):/i),Je=e(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g),Qe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function Ze(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var et=function(){return"undefined"==typeof window?null:window},tt=function(e,t){if("object"!==(void 0===e?"undefined":Qe(e))||"function"!=typeof e.createPolicy)return null;var n=null,r="data-tt-policy-suffix";t.currentScript&&t.currentScript.hasAttribute(r)&&(n=t.currentScript.getAttribute(r));var o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML:function(e){return e}})}catch(e){return console.warn("TrustedTypes policy "+o+" could not be created."),null}};return function t(e){function d(e){return t(e)}var s=0<arguments.length&&void 0!==e?e:et();if(d.version="2.0.8",d.removed=[],!s||!s.document||9!==s.document.nodeType)return d.isSupported=!1,d;var u=s.document,a=!1,l=s.document,f=s.DocumentFragment,n=s.HTMLTemplateElement,p=s.Node,r=s.NodeFilter,o=s.NamedNodeMap,i=void 0===o?s.NamedNodeMap||s.MozNamedAttrMap:o,c=s.Text,m=s.Comment,y=s.DOMParser,h=s.trustedTypes;if("function"==typeof n){var g=l.createElement("template");g.content&&g.content.ownerDocument&&(l=g.content.ownerDocument)}var v=tt(h,u),b=v?v.createHTML(""):"",T=l.implementation,A=l.createNodeIterator,x=l.getElementsByTagName,S=l.createDocumentFragment,L=u.importNode,E={};d.isSupported=T&&void 0!==T.createHTMLDocument&&9!==l.documentMode;function k(e){se&&se===e||(e&&"object"===(void 0===e?"undefined":Qe(e))||(e={}),z="ALLOWED_TAGS"in e?He({},e.ALLOWED_TAGS):I,j="ALLOWED_ATTR"in e?He({},e.ALLOWED_ATTR):U,le="ADD_URI_SAFE_ATTR"in e?He(Ce(ce),e.ADD_URI_SAFE_ATTR):ce,P="FORBID_TAGS"in e?He({},e.FORBID_TAGS):{},W="FORBID_ATTR"in e?He({},e.FORBID_ATTR):{},oe="USE_PROFILES"in e&&e.USE_PROFILES,B=!1!==e.ALLOW_ARIA_ATTR,G=!1!==e.ALLOW_DATA_ATTR,q=e.ALLOW_UNKNOWN_PROTOCOLS||!1,K=e.SAFE_FOR_JQUERY||!1,V=e.SAFE_FOR_TEMPLATES||!1,Y=e.WHOLE_DOCUMENT||!1,J=e.RETURN_DOM||!1,Q=e.RETURN_DOM_FRAGMENT||!1,Z=e.RETURN_DOM_IMPORT||!1,ee=e.RETURN_TRUSTED_TYPE||!1,$=e.FORCE_BODY||!1,te=!1!==e.SANITIZE_DOM,ne=!1!==e.KEEP_CONTENT,re=e.IN_PLACE||!1,F=e.ALLOWED_URI_REGEXP||F,V&&(G=!1),Q&&(J=!0),oe&&(z=He({},[].concat(Ze(Ue))),j=[],!0===oe.html&&(He(z,Fe),He(j,Pe)),!0===oe.svg&&(He(z,ze),He(j,We),He(j,Ge)),!0===oe.svgFilters&&(He(z,Ie),He(j,We),He(j,Ge)),!0===oe.mathMl&&(He(z,je),He(j,Be),He(j,Ge))),e.ADD_TAGS&&(z===I&&(z=Ce(z)),He(z,e.ADD_TAGS)),e.ADD_ATTR&&(j===U&&(j=Ce(j)),He(j,e.ADD_ATTR)),e.ADD_URI_SAFE_ATTR&&He(le,e.ADD_URI_SAFE_ATTR),ne&&(z["#text"]=!0),Y&&He(z,["html","head","body"]),z.table&&(He(z,["tbody"]),delete P.tbody),be&&be(e),se=e)}function M(t){Le(d.removed,{element:t});try{t.parentNode.removeChild(t)}catch(e){t.outerHTML=b}}function _(e,t){try{Le(d.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){Le(d.removed,{attribute:null,from:t})}t.removeAttribute(e)}function N(e){var t=void 0,n=void 0;if($)e="<remove></remove>"+e;else{var r=Me(e,/^[\s]+/);n=r&&r[0]}var o=v?v.createHTML(e):e;try{t=(new y).parseFromString(o,"text/html")}catch(e){}if(a&&He(P,["title"]),!t||!t.documentElement){var i=(t=T.createHTMLDocument("")).body;i.parentNode.removeChild(i.parentNode.firstElementChild),i.outerHTML=o}return e&&n&&t.body.insertBefore(l.createTextNode(n),t.body.childNodes[0]||null),x.call(t,Y?"html":"body")[0]}var O=qe,w=Ke,D=Ve,R=Ye,H=$e,C=Je,F=Xe,z=null,I=He({},[].concat(Ze(Fe),Ze(ze),Ze(Ie),Ze(je),Ze(Ue))),j=null,U=He({},[].concat(Ze(Pe),Ze(We),Ze(Be),Ze(Ge))),P=null,W=null,B=!0,G=!0,q=!1,K=!1,V=!1,Y=!1,X=!1,$=!1,J=!1,Q=!1,Z=!1,ee=!1,te=!0,ne=!0,re=!1,oe={},ie=He({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","plaintext","script","style","svg","template","thead","title","video","xmp"]),ae=He({},["audio","video","img","source","image","track"]),le=null,ce=He({},["alt","class","for","id","label","name","pattern","placeholder","summary","title","value","style","xmlns"]),se=null,ue=l.createElement("form");d.isSupported&&function(){try{var e=N("<x/><title>&lt;/title&gt;&lt;img&gt;");we(/<\/title/,e.querySelector("title").innerHTML)&&(a=!0)}catch(e){}}();function de(e){return A.call(e.ownerDocument||e,e,r.SHOW_ELEMENT|r.SHOW_COMMENT|r.SHOW_TEXT,function(){return r.FILTER_ACCEPT},!1)}function fe(e){return"object"===(void 0===p?"undefined":Qe(p))?e instanceof p:e&&"object"===(void 0===e?"undefined":Qe(e))&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName}function pe(e,t,n){E[e]&&Te(E[e],function(e){e.call(d,t,n,se)})}function me(e){var t,n=void 0;if(pe("beforeSanitizeElements",e,null),!((t=e)instanceof c||t instanceof m||"string"==typeof t.nodeName&&"string"==typeof t.textContent&&"function"==typeof t.removeChild&&t.attributes instanceof i&&"function"==typeof t.removeAttribute&&"function"==typeof t.setAttribute&&"string"==typeof t.namespaceURI))return M(e),1;var r=ke(e.nodeName);if(pe("uponSanitizeElement",e,{tagName:r,allowedTags:z}),("svg"===r||"math"===r)&&0!==e.querySelectorAll("p, br").length)return M(e),1;if(z[r]&&!P[r])return"noscript"===r&&we(/<\/noscript/i,e.innerHTML)||"noembed"===r&&we(/<\/noembed/i,e.innerHTML)?(M(e),1):(!K||e.firstElementChild||e.content&&e.content.firstElementChild||!we(/</g,e.textContent)||(Le(d.removed,{element:e.cloneNode()}),e.innerHTML?e.innerHTML=_e(e.innerHTML,/</g,"&lt;"):e.innerHTML=_e(e.textContent,/</g,"&lt;")),V&&3===e.nodeType&&(n=e.textContent,n=_e(n,O," "),n=_e(n,w," "),e.textContent!==n&&(Le(d.removed,{element:e.cloneNode()}),e.textContent=n)),pe("afterSanitizeElements",e,null),0);if(ne&&!ie[r]&&"function"==typeof e.insertAdjacentHTML)try{var o=e.innerHTML;e.insertAdjacentHTML("AfterEnd",v?v.createHTML(o):o)}catch(e){}return M(e),1}function ye(e,t,n){if(te&&("id"===t||"name"===t)&&(n in l||n in ue))return!1;if(!(G&&we(D,t)||B&&we(R,t))){if(!j[t]||W[t])return!1;if(!le[t]&&!we(F,_e(n,C,""))&&("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==Ne(n,"data:")||!ae[e])&&(!q||we(H,_e(n,C,"")))&&n)return!1}return!0}function he(e){var t=void 0,n=void 0,r=void 0,o=void 0,i=void 0;pe("beforeSanitizeAttributes",e,null);var a=e.attributes;if(a){var l={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:j};for(i=a.length;i--;){var c=(t=a[i]).name,s=t.namespaceURI;if(n=Oe(t.value),r=ke(c),l.attrName=r,l.attrValue=n,l.keepAttr=!0,l.forceKeepAttr=void 0,pe("uponSanitizeAttribute",e,l),n=l.attrValue,!l.forceKeepAttr){if("name"===r&&"IMG"===e.nodeName&&a.id)o=a.id,a=Ee(a,[]),_("id",e),_(c,e),Ae(a,o)>i&&e.setAttribute("id",o.value);else{if("INPUT"===e.nodeName&&"type"===r&&"file"===n&&l.keepAttr&&(j[r]||!W[r]))continue;"id"===c&&e.setAttribute(c,""),_(c,e)}if(l.keepAttr)if(K&&we(/\/>/i,n))_(c,e);else if(we(/svg|math/i,e.namespaceURI)&&we(De("</("+xe(ve(ie),"|")+")","i"),n))_(c,e);else{V&&(n=_e(n,O," "),n=_e(n,w," "));var u=e.nodeName.toLowerCase();if(ye(u,r,n))try{s?e.setAttributeNS(s,c,n):e.setAttribute(c,n),Se(d.removed)}catch(e){}}}}pe("afterSanitizeAttributes",e,null)}}function ge(e){var t=void 0,n=de(e);for(pe("beforeSanitizeShadowDOM",e,null);t=n.nextNode();)pe("uponSanitizeShadowNode",t,null),me(t)||(t.content instanceof f&&ge(t.content),he(t));pe("afterSanitizeShadowDOM",e,null)}return d.sanitize=function(e,t){var n=void 0,r=void 0,o=void 0,i=void 0,a=void 0;if("string"!=typeof(e=e||"\x3c!--\x3e")&&!fe(e)){if("function"!=typeof e.toString)throw Re("toString is not a function");if("string"!=typeof(e=e.toString()))throw Re("dirty is not a string, aborting")}if(!d.isSupported){if("object"===Qe(s.toStaticHTML)||"function"==typeof s.toStaticHTML){if("string"==typeof e)return s.toStaticHTML(e);if(fe(e))return s.toStaticHTML(e.outerHTML)}return e}if(X||k(t),d.removed=[],"string"==typeof e&&(re=!1),!re)if(e instanceof p)1===(r=(n=N("\x3c!--\x3e")).ownerDocument.importNode(e,!0)).nodeType&&"BODY"===r.nodeName||"HTML"===r.nodeName?n=r:n.appendChild(r);else{if(!J&&!V&&!Y&&ee&&-1===e.indexOf("<"))return v?v.createHTML(e):e;if(!(n=N(e)))return J?null:b}n&&$&&M(n.firstChild);for(var l=de(re?e:n);o=l.nextNode();)3===o.nodeType&&o===i||me(o)||(o.content instanceof f&&ge(o.content),he(o),i=o);if(i=null,re)return e;if(J){if(Q)for(a=S.call(n.ownerDocument);n.firstChild;)a.appendChild(n.firstChild);else a=n;return Z&&(a=L.call(u,a,!0)),a}var c=Y?n.outerHTML:n.innerHTML;return V&&(c=_e(c,O," "),c=_e(c,w," ")),v&&ee?v.createHTML(c):c},d.setConfig=function(e){k(e),X=!0},d.clearConfig=function(){se=null,X=!1},d.isValidAttribute=function(e,t,n){se||k({});var r=ke(e),o=ke(t);return ye(r,o,n)},d.addHook=function(e,t){"function"==typeof t&&(E[e]=E[e]||[],Le(E[e],t))},d.removeHook=function(e){E[e]&&Se(E[e])},d.removeHooks=function(e){E[e]&&(E[e]=[])},d.removeAllHooks=function(){E={}},d}()});
//# sourceMappingURL=purify.min.js.map