document.querySelectorAll('.edit').forEach((button) => {
  button.addEventListener('click', editHandler);
});

document.querySelectorAll('.delete').forEach((button) => {
  button.addEventListener('click', deleteHandler); // TODO add confirmation
});

// ***********************************************************8

function editHandler() {
  const cardID = this.parentElement.parentElement.id;
  window.location.href = `/training/edit/${cardID}`;
}

function deleteHandler() {
  const cardID = this.parentElement.parentElement.id;
  const button = this;

  deleteTrainingDay(cardID)
    .then(() => {
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
