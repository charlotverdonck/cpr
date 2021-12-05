import document from 'document';
import { listenToHorizontalCarouselAndVerticalSwipeEvent } from '../../navigation';

let $swipePlane = null;
let $panes = null;
let $paneCircles = null;
const previousPage = 'steps/step-3';
const nextPage = 'steps/step-5';

export function destroy() {
  console.log('destroy step 4 page');
  $swipePlane = null;
  $panes = null;
  $paneCircles = null;
}

export function init() {
  console.log('init step 4 page');
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
