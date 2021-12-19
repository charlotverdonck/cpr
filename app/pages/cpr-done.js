import document from 'document';
import { switchPage } from '../navigation';

let $buttonRepeat = null;
let $buttonDone = null;

export function destroy() {
  $buttonRepeat = null;
  $buttonDone = null;
}

export function init() {
  console.log('init cpr done page');
  $buttonRepeat = document.getElementById('repeat-button');
  $buttonDone = document.getElementById('done-button');

  $buttonRepeat.onclick = () => {
    switchPage('cpr');
  };
  $buttonDone.onclick = () => {
    switchPage('thank-you');
  };
}
