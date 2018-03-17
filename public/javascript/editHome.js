document.querySelector('#submit').addEventListener('click', submitHandler);

function submitHandler(e) {
  e.target.setAttribute('disabled', true);
  e.target.innerText = 'Updating...';
  uploadImages()
    .then(() => {
      const formData = getFormData();
      sendXML(formData);
    })
    .catch(console.error);
}

function uploadImages() {
  const imageFields = document.querySelectorAll('input[type=file]');
  const formData = new FormData();

  imageFields.forEach((imageField) => {
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
          reject(xhr.status);
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
