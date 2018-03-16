const categoryDropdown = document.getElementById('category');
const submitButton = document.getElementById('submit');
const newCategoryBox = document.querySelector('#newCategory');
const images = document.querySelector('#images');
updateCategoriesDropdown(categoryDropdown);

newCategoryBox.oninput = categoryBoxInputHandler;

categoryDropdown.onchange = categoryChangeHandler;

submitButton.addEventListener('click', submitHandler);// TODO change to onsubmit

//* ************************************************ */

function categoryBoxInputHandler(e) {
  if (e.target.value !== '') {
    categoryDropdown.selectedIndex = 0;
    fireEvent(categoryDropdown, 'change');
    categoryDropdown.setAttribute('disabled', true);
  } else {
    categoryDropdown.removeAttribute('disabled');
  }
}

function categoryChangeHandler(e) {
  if (e.target.selectedIndex === 0) {
    updateImages([]);
  } else {
    getImagesFromCategory(e.target.value)
      .then(updateImages)
      .catch(handleConnectionError);
  }
}

function submitHandler(e) {
  if (newCategoryBox.value === '') messageModal('You must enter a category name or select a category');
  if (categoryDropdown.selectedIndex === 0 && newCategoryBox.value !== '') { // TODO REFACTOR
    e.target.value = 'Uploading...';
    e.target.setAttribute('disabled', true);
    newCategoryBox.setAttribute('disabled', true);
    uploadImages(newCategoryBox.value, images.files)
      .then(() => {
        fireEvent(categoryDropdown, 'change');
        updateCategoriesDropdown(categoryDropdown);
        newCategoryBox.value = '';
        categoryDropdown.removeAttribute('disabled');
        e.target.value = 'Submit';
        e.target.removeAttribute('disabled');
        newCategoryBox.removeAttribute('disabled');
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
      .catch(handleConnectionError);
  }
}

function messageModal(message) {
  const modal = document.createElement('div');
  modal.className.add('modal');

};

function updateCategoriesDropdown(dropDown) {
  while (dropDown.childNodes.length > 1) {
    dropDown.removeChild(dropDown.lastChild);
  }
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

function updateImages(images) { // TODO Refactor
  const imageContainer = document.getElementById('imageContainer');
  imageContainer.innerHTML = '';

  images.forEach((image) => {
    const imageCard = document.createElement('div');
    imageCard.classList.add('imageCard');

    const imageName = document.createElement('h3');
    imageName.innerText = image.imageName;
    imageName.classList.add(image.imageExt);
    imageCard.appendChild(imageName);

    const imageFullName = document.createElement('i');
    imageFullName.classList.add('imageFullName');
    imageFullName.innerText = `${image.imageName}${image.imageExt}`;
    imageFullName.setAttribute('hidden', true);
    imageCard.appendChild(imageFullName);

    const img = document.createElement('img');
    img.setAttribute('src', image.thumbURL);
    imageCard.appendChild(img);

    const del = document.createElement('button');
    del.classList.add('delete');
    del.innerText = 'Delete';

    imageCard.appendChild(del);
    // TODO add event listeners to delete buttons
    imageContainer.appendChild(imageCard);
  });

  const delCategory = document.createElement('button');
  delCategory.id = 'deleteCategory';
  delCategory.innerText = 'Delete Category';
  if (categoryDropdown.selectedIndex === 0) { delCategory.hidden = true; }

  imageContainer.appendChild(delCategory);
  activateDeleteButtons();
}

function activateDeleteButtons() {
  document.querySelectorAll('.gallery .delete').forEach((element) => {
    element.addEventListener('click', deleteImage);
  });
  document.getElementById('deleteCategory').addEventListener('click', deleteCategory);
}

function deleteImage() {
  const imageName = this.parentElement.querySelector('i').innerText;
  const category = categoryDropdown.value;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${category}/${imageName}/delete`);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 202) {
        console.log(xhr.status);
        fireEvent(categoryDropdown, 'change');
      } else {
        console.log(new Error(xhr.response));
      }
    }
  };
  xhr.send();
}

function deleteCategory(e) {
  const category = categoryDropdown.value;
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${category}/delete`);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 204) {
        categoryDropdown.selectedIndex = 0;
        updateCategoriesDropdown(categoryDropdown);
        fireEvent(categoryDropdown, 'change');
      } else {
        handleConnectionError(new Error(xhr.status));
      }
    }
  };
  xhr.send();
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
          resolve(xhr.response);
        } else {
          reject(new Error(xhr.status));
        }
      }
    };
    xhr.send(formData);
  });
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
