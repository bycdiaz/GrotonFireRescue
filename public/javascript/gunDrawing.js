const years = document.querySelector(".years");

years.addEventListener('click', (event) => {
  years.childNodes.forEach(year => {
    year.className = "year"
  });
  event.target.className = "year current" 
})
