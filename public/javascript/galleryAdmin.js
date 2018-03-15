const categoryDropdown = document.getElementById('category');
const submitButton = document.getElementById('submit');
const newCategoryBox = document.querySelector('#newCategory');
const images = document.querySelector('#images');
updateCategoriesDropdown(categoryDropdown);

newCategoryBox.oninput = (e) => {
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

submitButton.addEventListener('click', () => { // TODO change to onsubmit
  if (categoryDropdown.selectedIndex === 0 && newCategoryBox !== '') { // TODO REFACTOR
    uploadImages(newCategoryBox.value, images.files)
      .then(() => {
        fireEvent(categoryDropdown, 'change');
        updateCategoriesDropdown(categoryDropdown);
        newCategoryBox.value = '';
        categoryDropdown.removeAttribute('disabled');
      })
      .catch(console.log);
  } else if (categoryDropdown.selectedIndex > 0) {
    uploadImages(categoryDropdown.value, images.files)
      .then(() => {
        fireEvent(categoryDropdown, 'change');
        updateCategoriesDropdown(categoryDropdown);
        newCategoryBox.value = '';
        categoryDropdown.removeAttribute('disabled');
      })
      .catch(console.log);
  }
});


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

function uploadImages(category, fileList) { // TODO refactor
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('category', category);

    for (let i = 0; i < fileList.length; i++) {
      formData.append('images', fileList[i]);
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${category}`);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(new Error(xhr.status));
        }
      }
    };
    xhr.send(formData);
  });
}

function generateFormData(category, fileList) {
  const formData = new FormData();
  formData.append('category', category);
  for (let i = 0; i < fileList.length; i++) {
    console.log(i);
    formData.append('images', fileList[i]);
  }
  console.log(formData);
  return formData;
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
