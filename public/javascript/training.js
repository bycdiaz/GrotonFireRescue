const arrows = document.querySelectorAll('.arrowButton');

arrows.forEach((arrow) => {
  arrow.addEventListener('click', (e) => {
    const dropdown = e.currentTarget.parentElement.querySelector('.dropDown');
    if(dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
      e.target.classList.add('arrowDown')
    } else {
      dropdown.classList.add('hidden');
      e.target.classList.remove('arrowDown');
    };
  });
});