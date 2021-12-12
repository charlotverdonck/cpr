import document from 'document';
import { listenToHorizontalCarouselAndVerticalSwipeEvent } from '../../navigation';

let $swipePlane = null;
let $pane = null;
let $paneCircles = null;
const previousPage = 'steps/step-5';
const nextPage = 'cpr';

export function destroy() {
  console.log('destroy step 6 page');
  $swipePlane = null;
  $pane = null;
  $paneCircles = null;
}

export function init() {
  console.log('init step 6 page');
  $swipePlane = document.getElementById('swipe-plane');
  $pane = document.getElementById('pane');
  $paneCircles = document.getElementsByClassName('pane-circle');
  listenToHorizontalCarouselAndVerticalSwipeEvent(
    $swipePlane,
    nextPage,
    previousPage,
    $pane,
    $paneCircles,
  );
}
