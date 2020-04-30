const years = document.querySelector(".years");
const cardDates = document.querySelectorAll(".date");

function focusYearTab() {
  years.addEventListener('click', (event) => {
    console.log(event.target.innerText);
    
    years.childNodes.forEach(year => {
      console.log(year.innerHTML);
      
      year.className = "year";
    });
    event.target.className = "year current";

    cardDates.forEach(date => {
      const winnerYear = date.innerHTML.slice(-4);
      const tabYear = event.target.innerText;
      
      if (winnerYear === tabYear) {
        date.parentNode.className = "card"
      } else {
        date.parentNode.className = "card hidden"
      }
    })
  })
}

focusYearTab();
