import document from 'document';
import { listenToHorizontalCarouselAndVerticalSwipeEvent } from '../../navigation';

let $swipePlane = null;
let $panes = null;
let $paneCircles = null;
const previousPage = 'steps/step-4';
const nextPage = 'steps/step-6';

export function destroy() {
  console.log('destroy step 5 page');
  $swipePlane = null;
  $panes = null;
  $paneCircles = null;
}

export function init() {
  console.log('init step 5 page');
  $swipePlane = document.getElementById('swipe-plane');
  $panes = document.getElementsByClassName('pane');
  $paneCircles = document.getElementsByClassName('pane-circle');
  listenToHorizontalCarouselAndVerticalSwipeEvent(
    $swipePlane,
    nextPage,
    previousPage,
    $panes,
    $paneCircles,
  );
}
