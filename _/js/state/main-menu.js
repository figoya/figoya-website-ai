import { addStateModifier } from '/node_modules/low-carbon-state-manager/dist/index.min.js';

addStateModifier((customEventName, currentState, data) => {

  switch (customEventName) {
    case 'MAIN_MENU_OPENED':
      return {
        ...currentState,
        mainMenuOpen: true,
      };
    case 'MAIN_MENU_CLOSED':
      return {
        ...currentState,
        mainMenuOpen: false,
      };
    default:
      return currentState;
  }
});