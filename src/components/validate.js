import { formEdit, nameInput, jobInput, editButtonSave, formAdd, nameAddInput, urlInput, addButtonSave, buttonSubmitAvatarForm, avatarInput, avatarError } from './constants';

export function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);

  function showInputError(form, input) {
      const errorElement = form.querySelector(`#${input.name}-error`);
      if (errorElement) {
          input.classList.add('popup__input_error');
          errorElement.textContent = input.validationMessage;
          errorElement.classList.add(settings.errorClass);
      }
  }
  
  function hideInputError(form, input) {
      const errorElement = form.querySelector(`#${input.name}-error`);
      if (errorElement) {
          input.classList.remove('popup__input_error');
          errorElement.textContent = '';
          errorElement.classList.remove(settings.errorClass);
      }
  }

  function checkInputValidity(form, input) {
      if (!input.validity.valid) {
          showInputError(form, input);
      } else {
          hideInputError(form, input);
      }
  }

  function toggleButtonState(form, button) {
    form.addEventListener('input', function() {
      button.disabled = !form.checkValidity();
      if (button.disabled) {
        button.classList.add('disabled');
      } else {
        button.classList.remove('disabled');
      }
    });
  }

  function handleInput(input) {
      const form = input.closest(settings.formSelector);
      checkInputValidity(form, input);
      const button = form.querySelector(settings.submitButtonSelector);
      toggleButtonState(form, button);
  }

  function setEventListeners(form){
      const inputs = Array.from(form.querySelectorAll(settings.inputSelector));

      inputs.forEach(input => {
          input.addEventListener('input', () => {
              handleInput(input);
          });
      });

      form.addEventListener('submit', evt =>{
          evt.preventDefault();
      });

      toggleButtonState(form, form.querySelector(settings.submitButtonSelector));
  }

  forms.forEach(form => {
      setEventListeners(form);
  });
}

editButtonSave.disabled = true;

formEdit.addEventListener("submit", function (event) {
    event.preventDefault();

    const popupProfileNameValue = nameInput.value.trim();
    const popupProfileJobValue = jobInput.value.trim();

    const popupProfileNameError = document.querySelector("#input-name-error");
    const popupProfileJobError = document.querySelector("#input-job-error");

    popupProfileNameError.textContent = "";
    popupProfileJobError.textContent = "";

    const popupProfileNameValid = popupProfileLengthValidation(popupProfileNameValue, 2, 40);
    const popupProfileJobValid = popupProfileLengthValidation(popupProfileJobValue, 2, 200);

    if (popupProfileNameValid) {
        popupProfileInputError(nameInput, popupProfileNameError, "");
    } else {
        popupProfileInputError(nameInput, popupProfileNameError, "Имя должно быть от 2 до 40 символов");
    }

    if (popupProfileJobValid) {
        popupProfileInputError(jobInput, popupProfileJobError, "");
    } else {
        popupProfileInputError(jobInput, popupProfileJobError, "Род деятельности должен быть от 2 до 200 символов");
    }

    editButtonSave.disabled = !(popupProfileNameValid && popupProfileJobValid);

});

nameInput.addEventListener("input", popupProfileFormValidation);
jobInput.addEventListener("input", popupProfileFormValidation);

function popupProfileLengthValidation(value, minLength, maxLength) {
    return value.length >= minLength && value.length <= maxLength;
}

export function popupProfileInputError(popupProfileInputElement, popupProfileErrorElement, popupProfileErrorMessage) {
    if (popupProfileErrorMessage) {
        popupProfileInputElement.classList.add("popup__input_error");
        popupProfileErrorElement.textContent = popupProfileErrorMessage;
    } else {
        popupProfileInputElement.classList.remove("popup__input_error");
        popupProfileErrorElement.textContent = "";
    }
}

export function popupProfileFormValidation() {

    const popupProfileNameValue = nameInput.value.trim();
    const popupProfileJobValue = jobInput.value.trim();

    const popupProfileNameValid = popupProfileLengthValidation(popupProfileNameValue, 2, 40);
    const popupProfileJobValid = popupProfileLengthValidation(popupProfileJobValue, 2, 200);

    editButtonSave.disabled = !(popupProfileNameValid && popupProfileJobValid);

    if (popupProfileNameValid) {
        popupProfileInputError(nameInput, document.getElementById('input-name-error'), "");
    } else {
        popupProfileInputError(nameInput, document.getElementById('input-name-error'), "Имя должно быть от 2 до 40 символов");
    }
    
    if (popupProfileJobValid) {
        popupProfileInputError(jobInput, document.getElementById('input-job-error'), "");
    } else {
        popupProfileInputError(jobInput, document.getElementById('input-job-error'), "Род деятельности должен быть от 2 до 200 символов");
    }
    
}

formAdd.addEventListener("submit", function(event){
  event.preventDefault();

  const popupAddNewCardNameValue = nameAddInput.value.trim();
  const popupAddNewCardUrlValue = urlInput.value.trim();

  const popupAddNewCardNameError = document.querySelector('#input-add-error');
  const popupAddNewCardUrlError = document.querySelector('#input-url-error');

  popupAddNewCardNameError.textContent = "";
  popupAddNewCardUrlError.textContent = "";

  let isNameValid = true;
  let isUrlValid = true;

  if (popupAddNewCardNameValue.length < 2 || popupAddNewCardNameValue.length > 30) {
      popupAddNewCardNameError.textContent = "Название должно быть от 2 до 30 символов";
      nameAddInput.classList.add("popup__input_error");
      isNameValid = false;
  } else {
      nameAddInput.classList.remove("popup__input_error");
  }

  if (!validateURL(popupAddNewCardUrlValue)) {
      popupAddNewCardUrlError.textContent = "Введите корректный URL";
      urlInput.classList.add("popup__input_error");
      isUrlValid = false;
  } else {
      urlInput.classList.remove("popup__input_error");
  }

  addButtonSave.disabled = !(isNameValid && isUrlValid);
});

nameAddInput.addEventListener("input", popupAddNewCardFormValidation);
urlInput.addEventListener("input", popupAddNewCardFormValidation);

export function popupAddNewCardFormValidation() {
  const popupAddNewCardNameValue = nameAddInput.value.trim();
  const popupAddNewCardUrlValue = urlInput.value.trim();

  const popupAddNewCardValidName = popupAddNewCardNameValue.length > 2 && popupAddNewCardNameValue.length < 30;
  console.log(popupAddNewCardNameValue, popupAddNewCardValidName)
  const popupAddNewCardValidUrl = validateURL(popupAddNewCardUrlValue);
  console.log(popupAddNewCardUrlValue, popupAddNewCardValidUrl)

  handleInputValidation(popupAddNewCardValidName, nameAddInput, '#input-add-error', "Название должно быть от 2 до 30 символов");
  handleInputValidation(popupAddNewCardValidUrl, urlInput, '#input-url-error', "Введите корректный URL");

  addButtonSave.disabled = !popupAddNewCardValidName || !popupAddNewCardValidUrl;
  console.log(addButtonSave.disabled)
}

function validateURL(url) {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
}

function handleInputValidation(isValid, inputElement, errorElementId, errorMessage) {
  const errorElement = document.querySelector(errorElementId);

  if (!isValid) {
      inputElement.classList.add("popup__input_error");
      errorElement.textContent = errorMessage;
  } else {
      inputElement.classList.remove("popup__input_error");
      errorElement.textContent = "";
  }
}


export function validateAvatarInput(url) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
}

export function checkAvatarInput() {
    const inputValue = avatarInput.value.trim();

    if (validateAvatarInput(inputValue)) {
        avatarError.textContent = '';
        avatarInput.classList.remove('popup__input_error');
        buttonSubmitAvatarForm.removeAttribute('disabled');
    } else {
        avatarError.textContent = 'Введите корректный URL';
        avatarInput.classList.add('popup__input_error');
        buttonSubmitAvatarForm.setAttribute('disabled', true);
    }
}

avatarInput.addEventListener('input', checkAvatarInput);