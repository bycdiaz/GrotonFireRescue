document.querySelectorAll('input.reset').forEach((button) => {
  console.log(button);
  button.addEventListener('click', passwordResetHandler);
});

document.querySelectorAll('input.remove').forEach((button) => {
  button.addEventListener('click', removeAdminHandler);
});

function passwordResetHandler(e) {
  const adminID = e.target.parentElement.id;
  sendXMLRequest(adminID, 'resetPassword');
}

function removeAdminHandler(e) {

}

function sendXMLRequest(id, route) {

}
