document.querySelectorAll('.edit').forEach((button) => {
  button.addEventListener('click', editHandler);
})

document.querySelectorAll('.delete').forEach((button) => {
  button.addEventListener('click', deleteHandler); // TODO add confirmation
});

function editHandler() {
  const cardID = this.parentElement.parentElement.id;
  location = `/training/${cardID}/edit`;
}

function deleteHandler() {
  const cardID = this.parentElement.parentElement.id;
  const button = this;

  deleteTrainingDay(cardID)
    .then((returned) => {
      deleteCard(cardID, button);
    })
    .catch(err => console.error(err)); // TODO flash message on error
}

function deleteTrainingDay(cardID) {
  return new Promise((resolve, reject) => {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', '/training/delete/');
    xmlhttp.setRequestHeader('Content-Type', 'application/json');

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === XMLHttpRequest.DONE) {
        if (xmlhttp.status === 204) {
          resolve(xmlhttp.status);
        } else {
          reject(new Error(xmlhttp.status));
        }
      }
    };

    xmlhttp.send(JSON.stringify({ trainingID: cardID }));
  });
}

function deleteCard(cardID, button) {
  button.removeEventListener('click', deleteHandler);
  remove(document.getElementById(cardID));
}

function remove(element) {
  element.parentElement.removeChild(element);
}
