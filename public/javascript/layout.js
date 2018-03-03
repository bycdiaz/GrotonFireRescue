document.querySelectorAll('.flash').forEach((flash) => {
  flash.addEventListener('click', function handler(e) {
    e.target.parentNode.innerHTML = "";
    this.removeEventListener('click', handler);
  });
});