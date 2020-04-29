const years = document.querySelectorAll(".years")

years.forEach((year) => {
  year.addEventListener('click', (event) => {
    console.log(event.target);
    
    // const dates = document.querySelectorAll('.date');
    // // console.log(dates);

    // dates.forEach(element => {
    //   console.log(element.innerText);
      
    //   if (element.innerText.includes("2020")) {
    //     element.parentElement.setAttribute("class", "card visible");
    //   }
    // });
  });
});
