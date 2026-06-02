const template = document.createElement("template");
template.innerHTML = `
  <footer>
    <div>
      <section class="s social-media">
        <h2>Social Media</h2>
        <ul class="c social-media items">
          <li><a href="https://twitter.com/FigoyaLowCarbon"><img src="/_/img/icon/twitter-1.svg" height="50" alt="Twitter icon"></a></li>
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
        <!-- <form class="c contact form">
          <label>
            <span>Your email address</span>
            <input type="text">
          </label>
          <label>
            <span>Your Message</span>
            <textarea></textarea>
          </label>
          <button type="submit">Send</button>
        </form> -->
      </section>
      <!-- <section class="s newsletter">
        <h2 class="c newsletter heading">Signup to our newsletter</h2>
        <form class="c newsletter form">
          <label>
            <span>Your email address</span>
            <input type="text">
          </label>
          <button type="submit">Send</button>
        </form>
      </section> -->
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
          <li>Copyright © 2022. Nat Darke Limited. All rights reserved.</li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
        </ul>
      </section>
    </div>
  </footer>
<style>

@media only screen {
    footer {
      border-top: 0.1rem solid #999;
      background-color: #333;
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
      outline: 2px solid rgb(196, 215, 105);
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
    button {
      background: #ddd;
      color: #333;
      padding: .5rem 1.5rem;
      display: inline-block;
      border: none;
      cursor: pointer;
      font-size: 1.3rem;
    }
    button:hover {
      padding: .7rem 1.7rem;
      position: relative;
      margin: -0.2rem;
    }
    .s.social-media {
      position: relative;
    }
    footer > div:first-child {
      position: relative;
    }
    /* footer > div:first-child::before {
      content: " ";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0.08;
      background-image: url("/_/img/figoya-logo-no-text-bw-1.svg");
      background-repeat: no-repeat;
      background-position: center 12rem;
      background-size: 20rem; 
    }*/
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
    .c.company.items dt::before {      
      content: ".";
      display: block;
      position: absolute;
      left: -1rem;
      top: -.5rem;
      width: 1rem;
      height: 1rem;
      color: #ddd;
      background-size: 1rem;
    }
    .c.form label span {
      display: block;
      margin-bottom: .5rem;
    }
    .c.form label input,
    .c.form label textarea {
      display: block;
      margin-bottom: 1rem;
    }
    footer .s {
      margin-bottom: 3rem;
    }
    .c.legal.items li {
      margin-bottom: 1rem;
      position: relative;
    }

    /* SHARED */

    .c.company.items dt::before,
    .c.legal.items li::before {      
      content: ".";
      display: block;
      position: absolute;
      left: -1rem;
      top: -.5rem;
      width: 1rem;
      height: 1rem;
      color: #ddd;
      background-size: 1rem;
    }

  }



  @media only screen and (max-width: 400px) {

  }
  @media only screen and (max-width: 600px) {

  }
  @media only screen and (min-width: 600px) and (max-width: 1040px) {

  }

  @media only screen and (min-width: 1040px) {

  }

</style>
`;

export default template;
