(this.webpackJsonpfreecodecamp=this.webpackJsonpfreecodecamp||[]).push([[0],{10:function(n,e,t){n.exports=t.p+"static/media/github.617870e4.svg"},16:function(n,e,t){n.exports=t(23)},23:function(n,e,t){"use strict";t.r(e);var a=t(0),i=t.n(a),r=t(8),o=t.n(r),c=t(1),l=t(2),s=t(9),u=t.n(s),m=t(10),f=t.n(m);function p(){var n=Object(c.a)(["\n  position: absolute;\n  bottom: 0.9375em;\n  height: 1.875em;\n  line-height: 1.875em;\n  display: flex;\n  \n  a {\n    display: flex;\n    text-decoration: none;\n    margin-right: 1.25em;\n    color: black;\n    font-weight: 700;\n  }\n  a:hover {\n    color: #e31b3c;\n  }\n  \n  a > img {\n    height: 1.875em;\n    width: 1.875em;\n    margin-right: 0.375em;\n  }\n  a:hover > img {\n    filter: invert(20%) sepia(89%) saturate(3056%) hue-rotate(338deg) brightness(89%) contrast(100%);\n  }\n"]);return p=function(){return n},n}function d(){var n=Object(c.a)(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  background-color: #eee;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 1.25em 1.25em;\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  \n  h3 {\n    margin: 3px;\n    font-size: 1.5em;\n  }\n  \n  h4 {\n    margin: 0.3125em;\n    font-style: oblique;\n    color: #334;\n    font-weight: 500;\n  }\n  \n  p {\n    font-weight: 600;\n    font-size: 0.9em;\n  }\n"]);return d=function(){return n},n}function h(){var n=Object(c.a)(["\n  display: block;\n  width: 90vw;\n  height: 67.5vw;\n  max-width: 400px;\n  max-height: 300px;\n  margin: 3px;\n  padding: 0;\n  position: relative;\n  border: 2px ridge rgba(0, 0, 0, 0.3);\n  \n  >img {\n    display: block;\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: 2;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n    visibility: visible;\n    opacity: 1;\n    transition: visibility 0.3s, opacity 0.3s linear;\n  }\n  \n  :hover>img,\n  :active>img {\n      visibility: hidden;\n      opacity: 0;\n  }\n"]);return h=function(){return n},n}var g=l.a.div(h()),b=l.a.div(d()),v=l.a.div(p()),w=function(n){var e=n.id,t=n.name,a=n.tags,r=n.website,o=n.github,c=n.description;return console.log(e),i.a.createElement(g,null,i.a.createElement("img",{src:"".concat("/freecodecamp","/images/screenshots/").concat(e,".png"),alt:t}),i.a.createElement(b,null,i.a.createElement("h3",null,t),i.a.createElement("h4",null,a.join(", ")),i.a.createElement("p",null,c),i.a.createElement(v,null,i.a.createElement("a",{href:o,target:"_blank",rel:"noopener noreferrer"},i.a.createElement("img",{src:f.a,alt:"View source at GitHub"}),"View Source"),i.a.createElement("a",{href:r,target:"_blank",rel:"noopener noreferrer"},i.a.createElement("img",{src:u.a,alt:"Link to site"}),"View Site"))))},x=t(14),j=t(15),E=t(5),y=function(n){return escape(n.split(" ").join("_").toLowerCase())},k=function(){var n=Object(a.useState)([]),e=Object(E.a)(n,2),t=e[0],i=e[1];return Object(a.useEffect)((function(){fetch("".concat("/freecodecamp","/projects.json")).then((function(n){return n.json()})).then((function(n){i(Object.entries(n).flatMap((function(n){var e=Object(E.a)(n,2),t=e[0];return e[1].map((function(n){var e=n.name,a=Object(j.a)(n,["name"]);return Object(x.a)({},a,{category:t,id:y(e),name:e})}))})))})).catch((function(n){return console.error(n)}))}),[]),t};function O(){var n=Object(c.a)(["\n  width: 1230px;\n  max-width: 100%;\n  margin: 20px auto;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  font-size: 3.56vw;\n\n  @media (min-width: 445px) {\n    font-size: 16px;\n  }\n"]);return O=function(){return n},n}var z=l.a.div(O()),S=function(){var n=k();return i.a.createElement(z,null,null===n||void 0===n?void 0:n.map((function(n,e){return i.a.createElement(w,Object.assign({key:e},n))})))};var C=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement("h1",null,"Andrew Steffey's freeCodeCamp Projects"),i.a.createElement(S,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(C,null)),document.getElementById("projects-section")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(n){n.unregister()})).catch((function(n){console.error(n.message)}))},9:function(n,e,t){n.exports=t.p+"static/media/external-link.24b341b2.svg"}},[[16,1,2]]]);
//# sourceMappingURL=main.22d84127.chunk.js.map