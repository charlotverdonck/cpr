import document from 'document';
import { listenToVerticalSwipeEvent } from '../../navigation';

let $swipePlane = null;
const previousPage = 'steps/step-1';
const nextPage = 'steps/step-3';

export function destroy() {
  console.log('destroy step 2 page');
  $swipePlane = null;
}

export function init() {
  console.log('init step 2 page');
  $swipePlane = document.getElementById('swipe-plane');
  listenToVerticalSwipeEvent($swipePlane, nextPage, previousPage);
}
