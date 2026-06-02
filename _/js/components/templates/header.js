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
    <li><a href="/the-internet-pollutes">The Internet Pollutes</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/how-we-work">How We Work</a></li>
    <!-- <li><a href="/blog">Blog</a></li> -->
    <li><a href="/contact-us">Contact Us</a></li>
  </ul>
  <div class="logo">
    <img height="160" src="/_/img/figoya-logo-18.svg" alt="Figoya Logo">
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
      text-decoration-color: rgba(221, 221, 221, 1);
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
      outline: 2px solid rgb(196, 215, 105);
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
      min-height: 25rem;
      margin-top: -25rem;
      transition: .3s ease-in-out;
      position: relative;
      z-index: 1;
    }
    .menu.open {
      margin-top: 0px;
      /* box-shadow: 0 3px 10px rgba(0,0,0,0.1); */
    }
    .menu li:not(:last-child) {
      position: relative;
      /* border-bottom: .1rem solid #999; */
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


/* logo */

@media only screen {
    .logo {
       padding: 2rem;
    }
    .logo > img {
        display: block;
        width: auto;
        height: 7rem;
      }
    }
  @media only screen and (min-width: 400px) {
    .logo > img {
        height: 9rem;
    }
  }
  @media only screen and (min-width: 600px) {
    .logo > img {
      height: 12rem;
    }
  }
  @media only screen and (min-width: 600px) and (max-width: 1040px) {
    .logo {
      padding: 3rem;
    }
    .logo > img {
      height: 13rem;
    }
  }

  @media only screen and (min-width: 1040px) {
    .logo {
      padding: 2.5rem 0 3rem 0;
    }
    .logo > img {
      height: 15rem;
    }
    header.alt .logo > img {
      height: 7rem;
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
      background: rgb(196, 215, 105);
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
  
  @media only screen and (min-width: 1040px){
    .burger {
      display: none;
    }
  }
</style>
`;

export default template;