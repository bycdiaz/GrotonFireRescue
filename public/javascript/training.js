const trainingCards = document.querySelectorAll('.cardTitle');

trainingCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    const dropdown = e.currentTarget.parentNode.querySelector('.dropDown');
    const arrow = e.currentTarget.querySelector('.arrow');
    if(dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
      arrow.classList.add('arrowDown');
    } else {
      dropdown.classList.add('hidden');
      arrow.classList.remove('arrowDown');
    };
  });
});