const categoryDropdown = document.getElementById('category');
updateCategoriesDropdown(categoryDropdown);

document.querySelector('#newCategory').oninput = (e) => {
  if (e.target.value !== '') {
    categoryDropdown.selectedIndex = 0;
    fireEvent(categoryDropdown, 'change');
    categoryDropdown.setAttribute('disabled', true);
  } else {
    categoryDropdown.removeAttribute('disabled');
  }
};

categoryDropdown.onchange = (e) => {
  if (e.target.value === '') return updateImages([]);
  getImagesFromCategory(e.target.value)
    .then(updateImages)
    .catch(handleConnectionError);
};


//* ************************************************ */
function updateCategoriesDropdown(dropDown) {
  getCategorysList()
    .then(categories => fillDropdown(dropDown, categories))
    .catch(handleConnectionError);
}

function getCategorysList() {
  return xhrGetRequest('edit/categorylist');
}

function fillDropdown(dropDown, categories) {
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.innerText = category.category;
    option.value = category.category;

    dropDown.appendChild(option);
  });
}

function getImagesFromCategory(category) {
  return xhrGetRequest(`edit/${category}`);
}

function updateImages(images) {
  const imageContainer = document.getElementById('imageContainer');
  imageContainer.innerHTML = '';

  images.forEach((image) => {
    const imageCard = document.createElement('div');
    const imageName = document.createElement('h3');
    imageName.innerText = image.imageName;
    imageCard.appendChild(imageName);

    const img = document.createElement('img');
    img.setAttribute('src', image.thumbURL);
    imageCard.appendChild(img);

    imageContainer.appendChild(imageCard);
  });
}

function xhrGetRequest(URL) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL);
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

function handleConnectionError(error) { // TODO Handle errors
  console.error(error);
}

function fireEvent(element, event) {
  if (document.createEventObject) {
  // dispatch for IE. TODO - Test this
    const evt = document.createEventObject();
    return element.fireEvent(`on${event}`, evt);
  }

  // dispatch for firefox + others
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent(event, true, true); // event type,bubbling,cancelable
  return !element.dispatchEvent(evt);
}
