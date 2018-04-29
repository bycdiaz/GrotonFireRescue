const body = document.querySelector('body');

document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('click', imageHandler);
});

function imageHandler(e) {
  e.preventDefault();
  e.stopPropagation();
  imageModal(e.target.parentElement.href);
}

function imageModal(link) {
  const overlay = document.createElement('div');
  body.appendChild(overlay);
  overlay.classList.add('overlay');

  const image = document.createElement('img');
  overlay.appendChild(image);
  image.src = link;

  body.addEventListener('click', removeModal);
}

function removeModal(e) {
  body.removeEventListener('click', removeModal);
  document.querySelector('.overlay').remove();
}
