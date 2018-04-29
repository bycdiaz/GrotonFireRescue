let smallScreenModeActive = false;
const hamburgerButton = document.getElementById('hamburgerMenu');
const navMenu = document.querySelectorAll('nav a');

if (window.innerWidth <= 635) activateSmallScreenMode();

document.querySelectorAll('.flash').forEach((flash) => {
  flash.addEventListener('click', function handler(e) {
    e.target.parentNode.innerHTML = '';
    this.removeEventListener('click', handler);
  });
});

window.onresize = resizeHandler;

hamburgerButton.addEventListener('click', hamburgerHandler);

// ***************************************************************************

function resizeHandler() {
  if (!smallScreenModeActive && window.innerWidth <= 635) {
    activateSmallScreenMode();
  } else if (smallScreenModeActive && window.innerWidth > 635) {
    activateStandardMode();
  }
}

function activateSmallScreenMode() {
  smallScreenModeActive = true;

  hamburgerButton.classList.remove('hidden');
  hide(navMenu);
}

function activateStandardMode() {
  smallScreenModeActive = false;

  hamburgerButton.classList.add('hidden');
  show(navMenu);
}

function hamburgerHandler() {
  if (hamburgerButton.classList.contains('collapsed')) {
    hamburgerButton.classList.add('expanded');
    hamburgerButton.classList.remove('collapsed');

    show(navMenu);
  } else {
    hamburgerButton.classList.add('collapsed');
    hamburgerButton.classList.remove('expanded');

    hide(navMenu);
  }
}

function show(menu) {
  menu.forEach((item) => {
    item.classList.remove('js-hidden');
  });
}

function hide(menu) {
  menu.forEach((item) => {
    item.classList.add('js-hidden');
  });
}
