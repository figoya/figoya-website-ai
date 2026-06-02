import { subscribe, publish } from '/node_modules/low-carbon-state-manager/dist/index.min.js';

const mobileOrTablet = window.matchMedia("(max-width: 1040px)");
mobileOrTablet.addEventListener("change", (event) => {
  if (event.matches) {
    publish({
      event: "MEDIA_CHANGE",
      data: event.media
    });
  }
});

subscribe({
  event: "MEDIA_CHANGE",
  action: (customEvent, domEvent) => {
    console.log("MEDIA_CHANGE", customEvent);
  }
})

subscribe({
  event: "DOM_CONTENT_LOADED", 
  action: () => {
    const elements = document.querySelectorAll('p, h1, h2, h3, h4');
    for (let element of elements) {
      if(element.innerHTML.indexOf('CO2')){
        element.innerHTML = element.innerHTML.replace("CO2", "CO<sub>2</sub>");
      };
    }
  }
});
