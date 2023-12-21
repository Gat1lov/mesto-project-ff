import { formEdit, nameInput, jobInput, editButtonSave } from './constants';

editButtonSave.disabled = true;

formEdit.addEventListener("submit", function (event) {
    event.preventDefault();

    const popupProfileNameValue = nameInput.value.trim();
    const popupProfileJobValue = jobInput.value.trim();

    const popupProfileNameError = document.querySelector("#input-name-error");
    const popupProfileJobError = document.querySelector("#input-job-error");

    popupProfileNameError.textContent = "";
    popupProfileJobError.textContent = "";

    const popupProfileFormValidation = true;

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