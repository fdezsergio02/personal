// ==UserScript==
// @name         Redireccionador de X a Nitter
// @version      2025.05.07.01
// @description  Redirecciona todos los enlaces de X (antes Twitter) a Nitter
// @author       Sergio (@fdezsergio02)
// @match        *://x.com/*
// @match        *://www.x.com/*
// @match        *://twitter.com/*
// @match        *://www.twitter.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";
  window.stop();
  const path =
    window.location.pathname + window.location.search + window.location.hash;
  const newURL = "https://twiiit.com" + path;
  window.location.replace(newURL);
})();
