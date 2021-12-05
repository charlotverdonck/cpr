import document from 'document';
import { listenToVerticalSwipeEvent } from '../../navigation';

let $swipePlane = null;
const previousPage = 'steps/step-2';
const nextPage = 'steps/step-4';

export function destroy() {
  console.log('destroy step 3 page');
  $swipePlane = null;
}

export function init() {
  console.log('init step 3 page');
  $swipePlane = document.getElementById('swipe-plane');
  listenToVerticalSwipeEvent($swipePlane, nextPage, previousPage);
}
