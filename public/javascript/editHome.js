document.querySelector('#submit').addEventListener('click', submitHandler);

function submitHandler() {
  // this.removeEventListener('click', submitHandler);
  const formData = getFormData();
  sendXML(formData);
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
        location = '/'; // redirects to home page
      } else {
        console.log(xmlhttp.status);
      }
    }
  };
  
  xmlhttp.send(JSON.stringify(data));
}

