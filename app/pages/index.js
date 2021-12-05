import document from 'document';
import { switchPage } from '../navigation';

let $buttonSteps = null;
let $buttonCpr = null;

export function destroy() {
  $buttonSteps = null;
  $buttonCpr = null;
}

export function init() {
  console.log('init index page');
  $buttonSteps = document.getElementById('steps-button');
  $buttonCpr = document.getElementById('cpr-button');

  $buttonSteps.onclick = () => {
    switchPage('steps/step-1', true);
  };
  $buttonCpr.onclick = () => {
    switchPage('cpr');
  };
}
