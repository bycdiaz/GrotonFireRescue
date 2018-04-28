document.querySelector('#submit').addEventListener('click', submitHandler);
errorHandler('test');

function submitHandler(e) {
  e.target.setAttribute('disabled', true);
  e.target.innerText = 'Updating...';
  uploadImages()
    .then(() => {
      const formData = getFormData();
      sendXML(formData);
    })
    .catch(errorHandler);
}

function uploadImages() {
  const imageFields = document.querySelectorAll('input[type=file]');
  const formData = new FormData();

  imageFields.forEach((imageField, index) => {
    formData.append(imageField.files[0] ? imageField.files[0].name : 'No Image', index);
    formData.append('images', imageField.files[0]);
  });

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/uploadImages');

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 201) {
          resolve(xhr.response);
        } else {
          reject(new Error(`${xhr.status} ${xhr.statusText}`));
        }
      }
    };

    xhr.send(formData);
  });
}

function getFormData() {
  const sections = Array.from(document.querySelectorAll('.formSection'));

  return sections.map(section => ({
    pageTitle: section.querySelector('input').value,
    content: section.querySelector('textarea').value,
  }));
}

function sendXML(data) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', '/');
  xmlhttp.setRequestHeader('Content-Type', 'application/json');

  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === XMLHttpRequest.DONE) {
      if (xmlhttp.status === 201) {
        window.location = '/'; // redirects to home page
      } else {
        console.log(xmlhttp.status);
      }
    }
  };

  xmlhttp.send(JSON.stringify(data));
}

function errorHandler(error) {
  const status = error.message.slice(0, 3);
  switch (status) {
    case '413':
      messageModal('Image filesize too large');
      break;
    case '500':
      messageModal('There has been a server error try again a few times then conatact Briggs');
      break;
    default:
      messageModal(error);
  }
}

function messageModal(message) {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const messageBox = document.createElement('div');
  modal.appendChild(messageBox);
  messageBox.classList.add('messageBox');

  const text = document.createElement('p');
  messageBox.appendChild(text);
  text.innerText = message;

  const okButton = document.createElement('button');
  messageBox.appendChild(okButton);
  okButton.innerText = 'OK';
  okButton.id = 'ok';
  okButton.addEventListener('click', removeModal);

  document.querySelector('body').appendChild(modal);
}

function removeModal(e) {
  e.target.removeEventListener('click', removeModal);
  e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
}
