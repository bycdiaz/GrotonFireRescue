const dates = document.querySelectorAll('.date');
console.log(dates);

dates.forEach(element => {
  element.parentElement.setAttribute("class", "card visible")
});
