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
    /* the header paints the same charcoal field as the hero, full bleed,
       so the two read as one surface (the host sits in the 100rem container,
       hence the same escape-and-repad as the hero uses) */
    header {
      background-color: #252625;
      margin-left: calc(50% - 50vw);
      margin-right: calc(50% - 50vw);
      padding-left: max(2rem, calc(50vw - 50rem));
      padding-right: max(2rem, calc(50vw - 50rem));
    }
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


  /* ---- logo lockup ----
     One SVG carries the whole lockup (mark + FIGOYA + category) and is drawn as a
     background on the link. The mark img and the live text stay in the DOM to supply the
     accessible name, and are CLIPPED rather than hidden: visibility:hidden and
     display:none would both drop them from the accessibility tree.
     The box is sized by height alone; the width follows from the SVG's viewBox.
     On the homepage header.js promotes .logo to h1 (see A11Y-1 in CONVENTIONS.md);
     elsewhere the header carries .alt and the lockup stays a div and sits smaller. */

  @media only screen {
    .logo {
      padding: 2rem;
    }
    h1.logo {
      margin: 0;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
    }
    .logo a {
      display: block;
      height: 7rem;
      max-width: 100%;
      aspect-ratio: 567.23 / 166.7;
      background: url("/_/img/figoya-oi-center-blackbg.svg") left center / contain no-repeat;
      text-decoration: none;
    }
    .logo img {
      display: none;
    }
    .lockup {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      border: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }
  }
  @media only screen and (min-width: 400px) {
    .logo a {
      height: 8rem;
    }
  }
  @media only screen and (min-width: 600px) {
    .logo a {
      height: 10rem;
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
    .logo a {
      height: 12rem;
    }
    header.alt .logo a {
      height: 7rem;
    }
  }

  /* forced-colours modes drop background images, so the live lockup comes back and does
     the job the artwork was doing. Colours are left to the forced palette. */
  @media only screen and (forced-colors: active) {
    .logo a {
      display: flex;
      align-items: center;
      gap: 1.6rem;
      width: fit-content;
      height: auto;
      aspect-ratio: auto;
      background: none;
    }
    .logo img {
      display: block;
      width: auto;
      height: 7rem;
    }
    .lockup {
      position: static;
      width: auto;
      height: auto;
      margin: 0;
      overflow: visible;
      clip: auto;
      clip-path: none;
      white-space: normal;
      display: block;
    }
    .wordmark {
      display: block;
      font-weight: 800;
      font-size: 3.4rem;
      line-height: 1.05;
      letter-spacing: 0.28em;
      text-transform: uppercase;
    }
    .category {
      display: block;
      font-weight: 600;
      font-size: 1.25rem;
      letter-spacing: 0.34em;
      text-transform: uppercase;
      margin-top: 0.7rem;
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
