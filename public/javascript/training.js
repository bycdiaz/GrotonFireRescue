const trainingCards = document.querySelectorAll('.cardTitle');

trainingCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    const dropDown = e.currentTarget.parentNode.querySelector('.dropDown');
    const arrow = e.currentTarget.querySelector('.arrow');
    const accent = e.currentTarget.querySelector('.accentLine');
    if (dropDown.classList.contains('hidden')) {
      dropDown.classList.remove('hidden');
      arrow.classList.add('arrowDown');
      accent.classList.remove('hidden');
    } else {
      dropDown.classList.add('hidden');
      arrow.classList.remove('arrowDown');
      accent.classList.add('hidden');
    };
  });
});
