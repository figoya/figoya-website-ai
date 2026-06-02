import {
  publish,
  getState,
  subscribe,
} from "/node_modules/low-carbon-state-manager/dist/index.min.js";
import template from "./templates/header.js";

class MainHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelectorAll("ul > li").forEach((item) => {
      const href = item.querySelector("a").getAttribute("href");
      if (this.getAttribute("page") === href) {
        item.setAttribute("class", "selected");
      }
      if (this.getAttribute("page") !== "/") {
        this.shadowRoot.querySelector("header").classList.add("alt");
      }
    });
  }
  connectedCallback() {
    const matchMobileOrTablet = window.matchMedia(`(max-width: 1040px)`);
    const burger = this.shadowRoot.querySelector("header > .burger");
    const menu = this.shadowRoot.querySelector("header > .menu");
    const logo = this.shadowRoot.querySelector("header > .logo");

    if (matchMobileOrTablet.matches) {
      subscribe({
        event: ["MAIN_MENU_OPENED", "MAIN_MENU_CLOSED", "DOM_CONTENT_LOADED"],
        action: (customEvent, domEvent) => {
          const state = getState();
          if (state.mainMenuOpen === true) {
            burger.setAttribute("class", "burger open");
            menu.setAttribute("class", "menu open");
          } else {
            burger.setAttribute("class", "burger");
            menu.setAttribute("class", "menu");
          }
        },
      });
      burger.addEventListener("click", (domEvent) => {
        const state = getState();
        if (state.mainMenuOpen === true) {
          publish({ event: "MAIN_MENU_CLOSED", domEvent });
        } else {
          publish({ event: "MAIN_MENU_OPENED", domEvent });
        }
      });
      logo.addEventListener("click", (domEvent) => {
        publish({ event: "MAIN_MENU_CLOSED", domEvent });
      });
    }
  }
}
customElements.define("main-header", MainHeader);

export default MainHeader;
