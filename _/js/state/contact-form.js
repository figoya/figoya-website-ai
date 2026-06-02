import { addStateModifier } from '/node_modules/low-carbon-state-manager/dist/index.min.js';

addStateModifier((customEventName, currentState, data) => {
  switch (customEventName) {
    case "CONTACT_FORM_SENT":
      return {
        ...currentState,
        contactFormSending: true,
      };
    case "CONTACT_FORM_SUCCEEDED":
      return {
        ...currentState,
        contactFormSending: false,
    };
    case "CONTACT_FORM_FAILED":
      return {
        ...currentState,
        contactFormSending: false,
        contactFormErrorMessage: data.message
      };
    default:
      return currentState;
  }
});