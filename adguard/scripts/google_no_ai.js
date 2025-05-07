// ==UserScript==
// @name         Desactivar IA en Google
// @version      2025.05.07.01
// @description  Añade automáticamente &udm=14 a las búsquedas de Google para evitar resultados con inteligencia artificial.
// @author       Sergio (@fdezsergio02)
// @match        *://www.google.com/search*
// @match        *://google.com/search*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  const url = new URL(window.location.href);
  const hasUdm14 = url.searchParams.get("udm") === "14";

  function processUI() {
    const navBar = document.querySelector('div[role="list"]');
    if (!navBar) return false;

    if (!hasUdm14) {
      const selectedTab = navBar.querySelector(
        'a[aria-current="page"] div[jsname="bVqjv"]'
      );
      if (selectedTab?.textContent?.trim() === "Todo") {
        url.searchParams.set("udm", "14");
        window.location.replace(url.toString());
        return true;
      }
    } else {
      const items = Array.from(navBar.querySelectorAll('[role="listitem"]'));
      const itemMap = {};

      for (const item of items) {
        const label = item
          .querySelector('div[jsname="bVqjv"]')
          ?.textContent?.trim();
        if (label) itemMap[label] = item;
        if (itemMap["Todo"] && itemMap["Web"]) break;
      }

      if (itemMap["Todo"] && itemMap["Web"]) {
        itemMap["Todo"].remove();
        navBar.insertBefore(itemMap["Web"], navBar.firstChild);

        const link = itemMap["Web"].querySelector("a");
        if (link) {
          link.setAttribute("aria-current", "page");
          link.classList.add("LatpMc");
        }
        return true;
      }
    }
    return false;
  }

  if (!processUI()) {
    const observer = new MutationObserver(() => {
      if (processUI()) observer.disconnect();
    });

    // Observar solo cuando el cuerpo esté disponible
    document.body
      ? observer.observe(document.body, { childList: true, subtree: true })
      : document.addEventListener("DOMContentLoaded", () =>
          observer.observe(document.body, { childList: true, subtree: true })
        );
  }
})();
