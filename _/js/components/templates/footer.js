const template = document.createElement("template");
template.innerHTML = `
  <footer>
    <div>
      <section class="s brand">
        <h2 class="visually-hidden">Figoya</h2>
        <img class="mark" src="/_/img/figoya-logo-no-text.svg" height="70" alt="" />
        <p class="category">Organisational Intelligence</p>
        <p class="claim">Answers you can stand behind.</p>
      </section>
      <section class="s social-media">
        <h2>Social Media</h2>
        <ul class="c social-media items">
          <li><a href="https://www.linkedin.com/company/figoya/"><img src="/_/img/icon/linkedin-1.svg" height="50" alt="Linked In icon"></a></li>
        </ul>
      </section>
    </div>
    <div>
      <section class="s contact">
        <h2 class="c contact heading">Contact Us</h2>
        <div class="c contact text">
          <p>Use our <a href="/contact-us">contact us page</a></p>
        </div>
      </section>
    </div>
    <div>
      <section class="s company">
        <h2 class="c company heading">Company details</h2>
        <dl class="c company items">
          <div>
            <dt>Figoya is a trading name of </dt>
            <dd>Nat Darke Limited</dd>
          </div>
          <div>
              <dt>Company Registration No.</dt>
              <dd>07163440</dd>
          </div>
          <div>
            <dt>Registered in</dt>
            <dd>England and Wales</dd>
          </div>
          <div>
            <dt>VAT No.</dt>
            <dd>GB987160092</dd>
          </div>
          <div>
            <dt>Registered Office</dt>
            <dd>92 The High, London, SW16 1EZ</dd>
          </div>
        </dl>
      </section>
    </div>
    <div>
      <section class="s legal">
        <h2 class="c legal heading">Copyright and Privacy Policy</h2>
        <ul class="c legal items">
          <li>Copyright © 2026. Nat Darke Limited. All rights reserved.</li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
        </ul>
      </section>
    </div>
  </footer>
<style>

@media only screen {
    footer {
      border-top: 0.4rem solid #9dc41a;
      background-color: #252625;
      min-height: 10rem;
      color: #ccc;
      font-size: 1.5rem;
      padding: 2rem;
    }
  }
  @media only screen and (min-width: 600px) {
    footer {
      padding: 4rem;
      flex-wrap: wrap;
      display: flex;
      justify-content: space-around;
    }
    footer > div {
      flex-basis: 45%;
    }
  }
  @media only screen and (min-width: 1040px) {
    footer {
      padding: 4rem 46rem;
      margin: 0 -46rem;
      flex-wrap: nowrap;
      justify-content: space-between;
    }
    footer > div {
      flex-basis: 20%;
    }
  }

  @media only screen {
    a {
      color: #ddd;
      text-decoration: underline;
    }
    a:hover {
      text-decoration: none;
    }

   /* For browsers that don't support :focus-visible */
   a:focus, button:focus, input:focus, textarea:focus {
      outline: 2px solid #ccc;
      outline-offset: 4px;
    }

    /* Remove :focus styling for browsers that do support :focus-visible */
    a:focus:not(:focus-visible), button:focus:not(:focus-visible), input:focus:not(:focus-visible), textarea:focus:not(:focus-visible) {
      outline: none;
      outline-offset: 0;
    }

    /* Add focus styling back in browsers that do support :focus-visible */
    a:focus-visible, button:focus-visible, input:focus-visible, summary:focus-visible, textarea:focus-visible {
      outline: 2px solid #ccc;
      outline-offset: 4px;
    }

    input:focus-visible, textarea:focus-visible {
      outline: 2px solid #ccc;
      outline-offset: 0px;
    }

    a:active {
      outline: 2px solid rgb(157, 196, 26);
      outline-offset: 5px;
    }

    input:focus-visible, textarea:focus-visible {
      border: none;
      border-radius: 2px;
    }
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    h2 {
      font-size: 1.8rem;
      text-transform: uppercase;
    }
    dt, dd {
      margin: 0;
      padding: 0;
      display: inline;
    }
    input, textarea {
      display: block;
      width: 100%;
    }
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
    .s.brand .mark {
      height: 7rem;
      width: auto;
      display: block;
    }
    .s.brand .category {
      font-weight: 600;
      font-size: 1.1rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #9dc41a;
      margin: 1.6rem 0 0.6rem 0;
      max-width: 22rem;
    }
    .s.brand .claim {
      color: #ddd;
      margin: 0 0 2rem 0;
      max-width: 22rem;
    }
    .s.social-media {
      position: relative;
    }
    footer > div:first-child {
      position: relative;
    }
    .c.social-media.items {
      display: flex;
      gap: 2rem;
    }
    .c.social-media.items li {
      flex-basis: 4rem;
    }
    .c.social-media.items li a {
      display: block;
    }
    .c.social-media.items li img {
      height: 4rem;
    }
    .c.company.items div {
      position: relative;
      margin-bottom: .5rem;
    }
    footer .s {
      margin-bottom: 3rem;
    }
    .c.legal.items li {
      margin-bottom: 1rem;
      position: relative;
    }
  }

</style>
`;

export default template;
