import document from 'document';
import {
  listenToHorizontalCarouselAndVerticalSwipeEvent,
  switchPage,
} from '../../navigation';

let $swipePlane = null;
let $panes = null;
let $paneCircles = null;
let $buttonCpr = null;
const previousPage = 'steps/step-5';
const nextPage = 'cpr';

export function destroy() {
  console.log('destroy step 6 page');
  $swipePlane = null;
  $panes = null;
  $paneCircles = null;
  $buttonCpr = null;
}

export function init() {
  console.log('init step 6 page');
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
  $buttonCpr = document.getElementById('cpr-button');
  $buttonCpr.onclick = () => {
    switchPage('cpr');
  };
}
