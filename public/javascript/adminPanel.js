document.querySelectorAll('input.reset').forEach((button) => {
  button.addEventListener('click', passwordResetHandler);
});

document.querySelectorAll('input.remove').forEach((button) => {
  button.addEventListener('click', removeAdminHandler);
});

function passwordResetHandler(e) {
  const adminCard = e.target.parentElement;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `/admin/${adminCard.id}/resetPassword`);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 202) {
        const token = adminCard.querySelector('.token');
        token.innerText = `Reset Token: ${JSON.parse(xhr.response).resetToken}`;
      } else {
        handleError(new Error(xhr.status));
      }
    }
  };

  xhr.send();
}

function removeAdminHandler(e) {
  const adminCard = e.target.parentElement;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `/admin/${adminCard.id}/remove`);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 204) {
        e.target.removeEventListener('click', removeAdminHandler);
        e.target.parentElement.remove(e.target);
      } else {
        handleError(new Error(xhr.status));
      }
    }
  };

  xhr.send();
}

function handleError(error) {
  console.log(error);
}
