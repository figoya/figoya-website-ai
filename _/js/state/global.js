import { addStateModifier } from '/node_modules/low-carbon-state-manager/dist/index.min.js';

addStateModifier((customEventName, currentState, data) => {
  switch (customEventName) {
    case "DOM_CONTENT_LOADED":
      return {
        ...currentState,
        mainMenuOpen: false
      };
    default:
      return currentState;
  }
});
