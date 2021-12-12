import document from 'document';
import { me as device } from 'device';
if (!device.screen) device.screen = { width: 348, height: 250 };

let pages = {};

// De navigatie initialiseren met de router (zie router.js)
export function init(router) {
  pages = router;
}

// De naam van de huidige view ophalen.
export function getPage() {
  const re = /.*\/+(.*)+\..*/;
  return document.location.pathname.replace(re, '$1');
}

// Functie wordt hieronder aangeroepen. Nodig voor het terugswipen.
export function onUnload() {
  const page = getPage();
  if (pages[page] && pages[page].destroy) pages[page].destroy();
}

export async function switchPage(nextPage, stack) {
  const pagePath = `./resources/pages/${nextPage}.view`;

  // De huidige pagina in een constante steken zodat we deze in de functies hieronder kunnen gebruiken.
  const page = getPage();

  // Controleren of de geselecteerde pagina niet huidige pagina is.
  if (pagePath !== document.location.pathname) {
    if (stack) {
      await document.location.assign(pagePath);
    } else {
      await document.location.replace(pagePath);
    }

    // Event om te weten wanneer er wordt teruggeswiped.
    document.onbeforeunload = onUnload;

    // De vorige pagina vernietigen.
    if (!stack && pages[page] && pages[page].destroy) pages[page].destroy();

    // Een nieuwe pagina starten.
    if (pages[nextPage] && pages[nextPage].init) pages[nextPage].init();
  }
}

export function listenToVerticalSwipeEvent(
  $swipePlane,
  nextPage,
  previousPage,
) {
  let y = 0;
  $swipePlane.onmousedown = (evt) => {
    y = evt.screenY;
  };
  $swipePlane.onmouseup = (evt) => {
    let yMove = evt.screenY - y;
    if (yMove < -60 && nextPage) {
      switchPage(nextPage);
    }

    if (yMove > 60 && previousPage) {
      switchPage(previousPage);
    }
  };
}

export function listenToHorizontalCarouselAndVerticalSwipeEvent(
  $swipePlane,
  nextPage,
  previousPage,
  $pane,
  $paneCircles,
) {
  let x = 0;
  let y = 0;
  let currentIndex = 0;
  const render = () => {
    for (let i = 0; i < $paneCircles.length; i++) {
      $paneCircles[i].style.fill = 'black';
    }

    $pane.groupTransform.translate.x = currentIndex * -1 * device.screen.width;
    $paneCircles[currentIndex].style.fill = 'white';
  };
  $swipePlane.onmousedown = (evt) => {
    x = evt.screenX;
    y = evt.screenY;
  };
  $swipePlane.onmousemove = (evt) => {
    let xMove = evt.screenX - x;
    if ($pane) {
      $pane.groupTransform.translate.x =
        currentIndex * -1 * device.screen.width + xMove * 1.5;
    }
  };
  $swipePlane.onmouseup = (evt) => {
    let yMove = evt.screenY - y;
    if (yMove < -60 && nextPage) {
      switchPage(nextPage);
      return;
    }

    if (yMove > 60 && previousPage) {
      switchPage(previousPage);
      return;
    }

    let xMove = evt.screenX - x;
    if (xMove < -60) {
      currentIndex++;
      if (currentIndex >= $paneCircles.length) {
        currentIndex = $paneCircles.length - 1;
      }
    }

    if (xMove > 60) {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = 0;
      }
    }

    render();
  };

  render();
}
