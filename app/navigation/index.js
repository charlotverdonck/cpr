import document from 'document';

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
  $panes,
  $paneCircles,
) {
  let x = 0;
  let y = 0;
  let currentIndex = 0;
  const render = () => {
    for (let i = 0; i < $panes.length; i++) {
      $panes[i].style.opacity = 0;
      $paneCircles[i].style.fill = 'black';
    }

    $panes[currentIndex].style.opacity = 1;
    $paneCircles[currentIndex].style.fill = 'white';
  };
  $swipePlane.onmousedown = (evt) => {
    x = evt.screenX;
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

    let xMove = evt.screenX - x;
    if (xMove < -60) {
      currentIndex++;
      if (currentIndex >= $panes.length) {
        currentIndex = 0;
      }
    }

    if (xMove > 60) {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = $panes.length - 1;
      }
    }

    render();
  };

  render();
}
