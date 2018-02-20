const dropDownLinks = {
  groton: {
    text: "Groton",
    href: "about/groton"
  },
  fireTax: {
    text: "Fire Tax District",
    href: "about/fire-tax-district"
  },
  rescue: {
    text: "Rescue Squad",
    href: "about/rescue-squad"
  }
};

const aboutBox = document.getElementById('aboutBox');

aboutBox.addEventListener('mouseenter', (e) => {
  aboutBox.appendChild(createDropdownMenu(dropDownLinks));
});

aboutBox.addEventListener('mouseleave', (e) => {
  const dropDownBox = document.getElementById('dropDownBox');
  aboutBox.removeChild(dropDownBox);
});

// *************************************************************************

function createDropdownMenu(menuItems){
  const dropDown = document.createElement('div');
  dropDown.id = "dropDownBox";

  for(let item in menuItems) {
    const menuButton = document.createElement('a');

    menuButton.href = menuItems[item].href;
    menuButton.innerText = menuItems[item].text;

    dropDown.appendChild(menuButton);
  }

  return dropDown;
};