// import { publish, subscriptions } from '../state/index.js';
// import sheet from './style.css';
const template = document.createElement('template');
template.innerHTML = `
  <section>
    <slot name="heading"></slot>
    <slot name="content"></slot>
  </section>
  <style>
  @media only screen {
    :host {
      --bg: white;
    }
  }
  @media only screen and (max-width: 1040px) {
    section {
      background: var(--bg);
    }
  }
  @media only screen and (min-width: 600px) and (max-width: 1040px) {

  }
  @media only screen and (min-width: 1040px) {

  }
  </style>
`;

class TextBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    // shadow.adoptedStyleSheets = [sheet];
  }
  connectedCallback() {}
}

customElements.define('text-box', TextBox);

export default TextBox;
