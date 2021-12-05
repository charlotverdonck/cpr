import document from 'document';
import { listenToVerticalSwipeEvent } from '../../navigation';

let $swipePlane = null;
const previousPage = false;
const nextPage = 'steps/step-2';

export function destroy() {
  console.log('destroy step 1 page');
  $swipePlane = null;
}

export function init() {
  console.log('init step 1 page');
  $swipePlane = document.getElementById('swipe-plane');
  listenToVerticalSwipeEvent($swipePlane, nextPage, previousPage);
}
