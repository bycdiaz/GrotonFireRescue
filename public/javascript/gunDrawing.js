const years = document.querySelector(".years");
const cardDates = document.querySelectorAll(".winner-year");

function winnerDisplay() {
  cardDates.forEach(date => {
    const winnerYear = date.attributes[1].nodeValue;
    const tabYear = event.target.innerText;
    
    if (winnerYear === tabYear) {
      date.parentNode.className = "card"
    } else {
      date.parentNode.className = "card hidden"
    }
  })
}

function focusYearTab() {
  years.addEventListener('click', (event) => {
    // console.log(event.target.className);
    
    if (event.target.className !== "years") {
      years.childNodes.forEach(year => {
        year.className = "year";
      });
      event.target.className = "year current";
      winnerDisplay();
    }
  })
}

focusYearTab();
