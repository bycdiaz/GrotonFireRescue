let smallScreenModeActive = false;

document.querySelectorAll('.flash').forEach((flash) => {
  flash.addEventListener('click', function handler(e) {
    e.target.parentNode.innerHTML = '';
    this.removeEventListener('click', handler);
  });
});

if (window.innerWidth <= 635) activateSmallScreenMode();

window.onresize = resizeHandler;

function resizeHandler() {
  if (!smallScreenModeActive && window.innerWidth <= 635) {
    activateSmallScreenMode();
  } else if (smallScreenModeActive && window.innerWidth > 635) {
    activateStandardMode();
  }
}


function activateSmallScreenMode() {
  smallScreenModeActive = true;
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.add('js-hidden');
  });

}

function activateStandardMode() {
  smallScreenModeActive = false;
}
