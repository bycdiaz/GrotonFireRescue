updateCategoriesDropdown();

//* ************************************************ */
function updateCategoriesDropdown() {
  getCategorysList()
    .then(fillDropdown)
    .catch(handleConnectionError);
}

function getCategorysList() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'edit/categorylist');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error(xhr.status));
        }
      }
    };
    xhr.send();
  });
}

function fillDropdown(categories) {
  const dropDown = document.getElementById('category');
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.innerText = category.category;
    option.value = category.category;

    dropDown.appendChild(option);
  });
}

function handleConnectionError(error) {
  console.error(error);
}
