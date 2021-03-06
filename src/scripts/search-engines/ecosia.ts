import { SearchEngine } from '../types';
import ecosiaStyle from './ecosia.scss';
import { createAction, getAddedElements, getEntry, getURL } from './helpers';

const pageSelectors = {
  results: '.mainline-results .result',
  entry: '.mainline-results .result',
  url: '.mainline-results .result a',
  message: '.mainline-top',
};

const ubSelectors = {
  action: 'ub-web-general-action',
  control: 'ub-web-control',
  button: '.ub-link-button',
};

export const ecosia: SearchEngine = {
  matches: ['*://www.ecosia.org/search?*'],
  messageNames: {
    name: 'searchEngines_ecosiaName',
  },
  style: ecosiaStyle,

  getHandlers: () => ({
    controlHandlers: [
      {
        createControl: (): HTMLElement | null => {
          const message = document.querySelector(pageSelectors.message);
          if (!message) {
            return null;
          }
          const control = document.createElement('span');
          control.className = ubSelectors.control;
          message.insertBefore(control, message.firstChild);
          return control;
        },
      },
    ],
    entryHandlers: [
      {
        getEntry: getEntry(pageSelectors.entry),
        getURL: getURL(pageSelectors.url),
        createAction: createAction(ubSelectors.action, ''),
      },
    ],
    getAddedElements: getAddedElements(pageSelectors.results),
  }),
};
