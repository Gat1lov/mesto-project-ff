export function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);

  function showInputError(form, input) {
    const errorElementId = input.dataset.errorMessage;
    const errorElement = form.querySelector(`#${errorElementId}`);
    input.classList.add('popup__input_error');
    errorElement.textContent = input.validationMessage;
    errorElement.style.display = 'block';
  }

  function hideInputError(form, input) {
    const errorElementId = input.dataset.errorMessage; 
    const errorElement = form.querySelector(`#${errorElementId}`);
    input.classList.remove('popup__input_error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
  

function checkInputValidity(form, input) {
  const allowedCharactersRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]*$/;
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  
  input.setCustomValidity('')
  if (!input.validity.valid) {
    showInputError(form, input);
  } else if (!input.value.trim()) {
    hideInputError(form, input);
  } else if (urlRegex.test(input.value)) {
    input.setCustomValidity('');
    hideInputError(form, input);
  } else if (!allowedCharactersRegex.test(input.value)) {
    input.setCustomValidity('Пожалуйста, используйте только латинские и кириллические буквы, знаки дефиса и пробелы');
    showInputError(form, input);
  } else {
    input.setCustomValidity('');
    hideInputError(form, input);
  }
}
  function toggleButtonState(form, button) {
    button.disabled = !form.checkValidity();
    if (button.disabled) {
      button.classList.add(settings.inactiveButtonClass);
    } else {
      button.classList.remove(settings.inactiveButtonClass);
    }
  }

  function handleInput(input) {
    const form = input.closest(settings.formSelector);
    checkInputValidity(form, input);
    toggleButtonState(form, form.querySelector(settings.submitButtonSelector));
  }

  function setEventListeners(form) {
    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        handleInput(input);
      });
    });

    form.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    toggleButtonState(form, form.querySelector(settings.submitButtonSelector));
  }

  forms.forEach(form => {
    setEventListeners(form);
  });
}

export function clearValidation(formElement, settings, userData = {}) {
  const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const errorElements = Array.from(formElement.querySelectorAll('.popup__error-message'));

  inputs.forEach(input => {
    const errorElementId = input.dataset.errorMessage;
    const errorElement = formElement.querySelector(`#${errorElementId}`);
    input.classList.remove('popup__input_error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';

    // Очистка полей формы и заполнение данными пользователя
    const fieldName = input.name;
    if (userData.hasOwnProperty(fieldName)) {
      input.value = userData[fieldName];
    } else {
      input.value = '';
    }
  });

  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  submitButton.disabled = true;
  submitButton.classList.add(settings.inactiveButtonClass);
}