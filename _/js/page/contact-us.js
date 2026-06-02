import { publish, getState, subscribe } from '/node_modules/low-carbon-state-manager/dist/index.min.js';
const contactUs = document.querySelector('.page.contact-us .s.by-email');
const contactUsForm = document.querySelector('.page.contact-us .c.by-email.user-input form');
const error = contactUsForm.querySelector('.error');
const htmlClasses = contactUs.classList;

subscribe({
  event: "CONTACT_FORM_SENT",
  action: (customEvent, domEvent) => {
    htmlClasses.remove('sent');
    htmlClasses.add('sending');
  }
});
subscribe({
  event: "CONTACT_FORM_SUCCEEDED",
  action: (customEvent, domEvent) => {
    console.log(customEvent);
    htmlClasses.replace('sending', 'sent');
  }
});
subscribe({
  event: "CONTACT_FORM_FAILED",
  action: (customEvent, domEvent) => {
    htmlClasses.replace('sending', 'sent');
    const state = getState();
    error.innerHTML = state.contactFormErrorMessage;
  }
});

if (contactUsForm) {
  contactUsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(contactUsForm);
    var object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    publish({ event: "CONTACT_FORM_SENT" });
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(object)
    })
    .then(async (response) => {
      let responseBody = await response.json();
      if (response.status == 200) {
        console.log(response.status);
        publish({ event: "CONTACT_FORM_SUCCEEDED", data: responseBody });
      } else {
        console.log(response.status);
        publish({ event: "CONTACT_FORM_FAILED" });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .then(function () {
      publish({event: "CONTACT_FORM_FINISHED" });
    });
  });
}