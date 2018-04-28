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
      .catch(errorHandler);
  }
}

function submitHandler(e) {
  if (newCategoryBox.value === '' && categoryDropdown.selectedIndex === 0) handleUserError(new Error('No Category Selected'), 'You must enter a category name or select a category');
  if (categoryDropdown.selectedIndex === 0 && newCategoryBox.value !== '') { // TODO REFACTOR
    e.target.value = 'Uploading...';
    e.target.setAttribute('disabled', true);
    newCategoryBox.setAttribute('disabled', true);
    uploadImages(newCategoryBox.value, images.files)
      .catch(errorHandler)
      .then(() => {
        fireEvent(categoryDropdown, 'change');
        updateCategoriesDropdown(categoryDropdown);
        newCategoryBox.value = '';
        categoryDropdown.removeAttribute('disabled');
        e.target.value = 'Submit';
        e.target.removeAttribute('disabled');
        newCategoryBox.removeAttribute('disabled');
      });
  } else if (categoryDropdown.selectedIndex > 0) {
    e.target.value = 'Uploading...';
    e.target.setAttribute('disabled', true);
    newCategoryBox.setAttribute('disabled', true);
    uploadImages(categoryDropdown.value, images.files)
      .catch(errorHandler)
      .then(() => {
        fireEvent(categoryDropdown, 'change');
        updateCategoriesDropdown(categoryDropdown);
        newCategoryBox.value = '';
        newCategoryBox.removeAttribute('disabled');
        categoryDropdown.removeAttribute('disabled');
        e.target.value = 'Submit';
        e.target.removeAttribute('disabled');
      });
  }
}


function updateCategoriesDropdown(dropDown) {
  while (dropDown.childNodes.length > 1) {
    dropDown.removeChild(dropDown.lastChild);
  }
  getCategorysList()
    .then(categories => fillDropdown(dropDown, categories))
    .catch(errorHandler);
}

function getCategorysList() {
  return xhrGetRequest('admin/categorylist');
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
  return xhrGetRequest(`admin/${category}`);
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
        fireEvent(categoryDropdown, 'change');
      } else {
        errorHandler(new Error(`${xhr.status} ${xhr.statusText}`));
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
        errorHandler(new Error(`${xhr.status} ${xhr.statusText}`));
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
          reject(new Error(`${xhr.status} ${xhr.statusText}`));
        }
      }
    };
    xhr.send();
  });
}

function errorHandler(error) { // TODO Handle errors
  const status = error.message.slice(0, 3);
  switch (status) {
    case '413':
      messageModal('Payload Size too large: Try fewer images at a time');
      break;
    case '500':
      messageModal('There has been a server error try again a few times then conatact Briggs');
      break;
    default:
      messageModal(error);
  }
}

function handleUserError(error, message) { // TODO handle errors properly
  messageModal(message);
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
          reject(new Error(`${xhr.status} ${xhr.statusText}`));
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
