const template = document.createElement('template');
template.innerHTML = `
<header>
  <div class="burger" aria-hidden="true">
    <span></span>
    <span></span>
    <span></span>
  </div>
  <ul class="menu">
    <li><a href="/">Home</a></li>
    <li><a href="/problem">Problem</a></li>
    <li><a href="/solution">Solution</a></li>
    <li><a href="/vision">Vision</a></li>
    <li><a href="/architecture">Architecture</a></li>
    <li><a href="/philosophy">Philosophy</a></li>
    <li><a href="/contact-us">Contact Us</a></li>
  </ul>
  <div class="logo">
    <a href="/" aria-label="Figoya — Organisational Intelligence — home">
      <img src="/_/img/figoya-logo-no-text.svg" alt="" />
      <span class="lockup">
        <span class="wordmark">Figoya</span>
        <span class="category">Organisational Intelligence</span>
      </span>
    </a>
  </div>
</header>
<style>
  @media only screen {
    a {
      color: #ddd;
    }
    .menu {
      list-style-type: none;
      padding: 0;
    }
    .menu li a {
      font-size: 1.8rem;
      display: block;
      text-underline-offset: 0.2em;
      transition: text-decoration-color 200ms, text-underline-offset 200ms;
      text-decoration: underline .2rem rgba(221, 221, 221, 0);
    }
    .menu li a:hover,
    .menu li.selected a {
      text-decoration-color: rgba(157, 196, 26, 1);
      text-underline-offset: 0.6em;
    }
    /* For browsers that don't support :focus-visible */
    a:focus, button:focus, input:focus {
      outline: 2px solid #ccc;
      outline-offset: 4px;
    }

    /* Remove :focus styling for browsers that do support :focus-visible */
    a:focus:not(:focus-visible), button:focus:not(:focus-visible), input:focus:not(:focus-visible) {
      outline: none;
      outline-offset: 0;
    }

    /* Add focus styling back in browsers that do support :focus-visible */
    a:focus-visible, button:focus-visible, input:focus-visible, summary:focus-visible {
      outline: 2px solid #ccc;
      outline-offset: 4px;
    }

    input:focus-visible {
      outline: 2px solid #ccc;
      outline-offset: 0px;
    }

    a:active {
      outline: 2px solid rgb(157, 196, 26);
      outline-offset: 5px;
    }

    input:focus-visible {
      border: none;
      border-radius: 2px;
    }
  }

  @media only screen and (max-width: 1040px) {
    header {
      background-color: #232423;
      position: relative;
      overflow: hidden;
    }
    .menu {
      margin: 0;
      min-height: 35rem;
      margin-top: -35rem;
      transition: .3s ease-in-out;
      position: relative;
      z-index: 1;
    }
    .menu.open {
      margin-top: 0px;
    }
    .menu li:not(:last-child) {
      position: relative;
    }
    .menu li a {
      padding: 0rem 2rem;
      min-height: 5rem;
      line-height: 5rem;
    }
  }

  @media only screen and (min-width: 1040px) {
    .menu {
      display: flex;
      justify-content: space-between;
      padding: 0;
      margin: 20px 0;
      gap: 10px 10px;
    }
    .menu li a {
      padding: 3px 5px;
    }
  }


/* logo lockup: mark + wordmark + category line */

@media only screen {
    .logo {
      padding: 2rem;
    }
    .logo a {
      display: flex;
      align-items: center;
      gap: 1.6rem;
      text-decoration: none;
      width: fit-content;
    }
    .logo img {
      display: block;
      width: auto;
      height: 7rem;
    }
    .lockup {
      display: block;
    }
    .wordmark {
      display: block;
      font-family: "Montserrat", "Arial", "Helvetica", sans-serif;
      font-weight: 800;
      font-size: 3.4rem;
      line-height: 1.05;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #fff;
    }
    .category {
      display: block;
      font-family: "Montserrat", "Arial", "Helvetica", sans-serif;
      font-weight: 600;
      font-size: 1.25rem;
      letter-spacing: 0.34em;
      text-transform: uppercase;
      color: #9dc41a;
      margin-top: 0.7rem;
    }
  }
  @media only screen and (min-width: 400px) {
    .logo img {
      height: 8rem;
    }
    .wordmark {
      font-size: 3.8rem;
    }
    .category {
      font-size: 1.4rem;
    }
  }
  @media only screen and (min-width: 600px) {
    .logo img {
      height: 10rem;
    }
    .wordmark {
      font-size: 4.6rem;
    }
    .category {
      font-size: 1.7rem;
    }
  }
  @media only screen and (min-width: 600px) and (max-width: 1040px) {
    .logo {
      padding: 3rem;
    }
  }

  @media only screen and (min-width: 1040px) {
    .logo {
      padding: 2.5rem 0 3rem 0;
    }
    .logo img {
      height: 12rem;
    }
    .wordmark {
      font-size: 5.4rem;
    }
    .category {
      font-size: 2rem;
    }
    header.alt .logo img {
      height: 7rem;
    }
    header.alt .wordmark {
      font-size: 3.2rem;
    }
    header.alt .category {
      font-size: 1.2rem;
    }
  }

  /* burger */
  @media only screen and (max-width: 1040px) {
    .burger {
      position: absolute;
      top: 1rem;
      right: 1rem;
      transform: rotate(0deg);
      transition: .3s ease-in-out;
      cursor: pointer;
      z-index: 2;
    }
    .burger span {
      display: block;
      position: absolute;
      height: .6rem;
      width: 100%;
      background: rgb(157, 196, 26);
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: .3s ease-in-out;
      border-radius: .6rem;
    }
    .burger span:nth-child(1) {
      transform-origin: left center;
      top: 0;
    }
    .burger span:nth-child(2) {
      transform-origin: left center;
      top: 1.2rem;
    }
    .burger span:nth-child(3) {
      transform-origin: left center;
      top: 2.4rem;
    }
    .burger.open span:nth-child(1) {
      transform: rotate(45deg);
      top: -0.3rem;
      left: .8rem;
    }
    .burger.open span:nth-child(2) {
      width: 0%;
      opacity: 0;
    }
    .burger.open span:nth-child(3) {
      transform: rotate(-45deg);
      top: 2.6rem;
      left: .8rem;
    }
    .burger {
      width: 4rem;
      height: 3rem;
      top: 1.5rem;
      right: 1.5rem;
    }
  }
</style>
`;

export default template;
