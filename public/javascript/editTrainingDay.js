const trainingForm = document.getElementById('trainingForm');
const repeatBox = document.getElementById('repeat');

repeatBox.onchange = checkHandler;

function checkHandler() {
  if (repeatBox.checked) {
    trainingForm.removeChild(document.querySelector('fieldset[name=date]'));
    trainingForm.insertBefore(createOtherBox(), trainingForm.children[2]);
  } else {
    trainingForm.removeChild(document.querySelector('fieldset[name=other]'));
    trainingForm.insertBefore(createDateInput(), trainingForm.children[2]);
  }
}

function createOtherBox() {
  const otherFieldset = document.createElement('fieldset');
  otherFieldset.name = 'other';

  const otherlegened = document.createElement('legened');
  otherFieldset.appendChild(otherlegened);
  otherlegened.setAttribute('for', 'other');
  otherlegened.innerText = 'Dates/Other';


  const textBox = document.createElement('input');
  otherFieldset.appendChild(textBox);
  textBox.type = 'input';
  textBox.name = 'other';

  return otherFieldset;
}

function createDateInput() {
  const dateFieldSet = document.createElement('fieldset');
  dateFieldSet.name = 'date';

  const legend = document.createElement('legend');
  dateFieldSet.appendChild(legend);
  legend.innerText = 'Date - mm/dd/yyyy';

  const month = document.createElement('input');
  dateFieldSet.appendChild(month);
  month.type = 'number';
  month.name = 'month';
  month.min = 1;
  month.max = 12;
  month.placeholder = 3;
  month.required = true;

  const day = document.createElement('input');
  dateFieldSet.appendChild(day);
  day.type = 'number';
  day.name = 'day';
  day.min = 1;
  day.max = 31;
  day.placeholder = 22;
  day.required = true;

  const year = document.createElement('input');
  dateFieldSet.appendChild(year);
  year.type = 'number';
  year.name = 'year';
  year.min = 2018;
  year.max = 2099;
  year.placeholder = 2018;
  year.required = true;


  return dateFieldSet;
}
