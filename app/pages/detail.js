import document from 'document';
import { getLocationName } from '../commands';

let $button = null;

function doSomething() {
  console.log('hallo detail');
}

export function destroy() {
  console.log('destroy detail page');
  $button = null;
}

export function init() {
  console.log('init detail page');
  $button = document.getElementById('back-button');
  $button.onclick = () => {
    destroy();
    document.history.back();
  };

  doSomething();
  getLocationName();
}
