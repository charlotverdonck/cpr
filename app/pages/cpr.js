import document from 'document';
import { gettext } from 'i18n';
import { switchPage } from '../navigation';

let $animationArc = null;
let $animationCircle = null;
let $animationGradient = null;
let $animationTimer = null;
let $startButton = null;
let $startButtonContainer = null;
let $doneButton = null;
let $doneButtonContainer = null;
let $restartButton = null;
let $titles = null;

let currentTimeout = null;
let currentAnimation = 'enable';
const timeouts = {
  enable: 18000,
  highlight: 4000,
};

function switchToCurrentStep() {
  animateElements(currentAnimation);

  if (currentAnimation === 'enable') {
    setTimeout(() => {
      animateElements('disable');
    }, 50);
  } else {
    setTimeout(() => {
      animateElements('unhighlight');
    }, 50);
  }
  resetStepButtons();
}

function resetStepButtons() {
  $startButtonContainer.style.display = 'inline';
  $doneButtonContainer.style.display = 'none';
  $restartButton.style.display = 'none';
}

function animateElements(animationName) {
  console.log('ANIMATE');
  $animationArc.animate(animationName);
  $animationCircle.animate(animationName);
  $animationGradient.animate(animationName);
  $animationTimer.animate(animationName);
  for (let i = 0; i < $titles.length; i++) {
    const $title = $titles[i];
    $title.animate(animationName);
  }
}

export function destroy() {
  console.log('destroy CPR page');
  $animationArc = null;
  $animationCircle = null;
  $animationGradient = null;
  $animationTimer = null;
  $startButton = null;
  $startButtonContainer = null;
  $doneButton = null;
  $doneButtonContainer = null;
  $restartButton = null;
  $titles = null;
  currentAnimation = 'enable';
}

export function init() {
  console.log('init CPR page');
  $animationArc = document.getElementById('animation-arc');
  $animationCircle = document.getElementById('animation-circle');
  $animationGradient = document.getElementById('animation-gradient');
  $animationTimer = document.getElementById('animation-timer');
  $startButton = document.getElementById('start-button');
  $startButtonContainer = document.getElementById('start-button-container');
  $doneButton = document.getElementById('done-button');
  $doneButtonContainer = document.getElementById('done-button-container');
  $doneButtonContainer.style.display = 'none';
  $restartButton = document.getElementById('restart-button');
  $titles = document.getElementsByClassName('title');

  $startButton.onclick = () => {
    console.log('START');
    animateElements(currentAnimation);
    $startButtonContainer.style.display = 'none';
    $restartButton.style.display = 'inline';

    currentTimeout = setTimeout(() => {
      $doneButtonContainer.style.display = 'inline';
    }, timeouts[currentAnimation]);
  };

  $doneButton.onclick = () => {
    console.log('DONE');

    if (currentAnimation === 'enable') {
      currentAnimation = 'highlight';
      switchToCurrentStep();
      $titles[0].text = gettext('cpr breath title');
      return;
    }

    switchPage('cpr-done');
  };

  $restartButton.onclick = () => {
    console.log('RESTART');
    clearTimeout(currentTimeout);
    switchToCurrentStep();
  };

  $titles[0].text = gettext('cpr timer title');
  resetStepButtons();
}
