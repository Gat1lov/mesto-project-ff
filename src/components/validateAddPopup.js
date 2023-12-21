import {formAdd, nameAddInput, urlInput, addButtonSave} from "./constants"

formAdd.addEventListener("submit", function(event){
    event.preventDefault();

    const popupAddNewCardNameValue = nameAddInput.value.trim();
    const popupAddNewCardUrlValue = urlInput.value.trim();

    const popupAddNewCardNameError = document.querySelector('#input-add-error');
    const popupAddNewCardUrlError = document.querySelector('#input-url-error');

    popupAddNewCardNameError.textContent = "";
    popupAddNewCardUrlError.textContent = "";

    const popupAddNewCardFormValidation = true;

    if (popupAddNewCardNameValue.length < 2 || popupAddNewCardNameValue.length > 30) {
        popupAddNewCardNameError.textContent = "Название должно быть от 2 до 30 символов";
        popupAddNewCardFormValidation = false;
        nameAddInput.classList.add("popup__input_error");
    } else {
        nameAddInput.classList.remove("popup__input_error");
    }

    if (!validateURL(popupAddNewCardUrlValue)) {
        popupAddNewCardUrlError.textContent = "Введите корректный URL";
        popupAddNewCardFormValidation = false;
        urlInput.classList.add("popup__input_error");
    } else {
        urlInput.classList.remove("popup__input_error");
    }

    addButtonSave.disabled = !popupAddNewCardFormValidation;
});

addButtonSave.disabled = true;

nameAddInput.addEventListener("input", popupAddNewCardFormValidation);
urlInput.addEventListener("input", popupAddNewCardFormValidation);

export function popupAddNewCardFormValidation() {
    const popupAddNewCardNameValue = nameAddInput.value.trim();
    const popupAddNewCardUrlValue = urlInput.value.trim();

    const popupAddNewCardValidName = popupAddNewCardNameValue.length >= 2 && popupAddNewCardNameValue.length <= 30;
    const popupAddNewCardValidUrl = validateURL(popupAddNewCardUrlValue);

    const popupAddNewCardFormValidation = popupAddNewCardValidName && popupAddNewCardValidUrl;
    addButtonSave.disabled = !popupAddNewCardFormValidation;

    handleInputValidation(popupAddNewCardValidName, nameAddInput, '#input-add-error', "Название должно быть от 2 до 30 символов");
    handleInputValidation(popupAddNewCardValidUrl, urlInput, '#input-url-error', "Введите корректный URL");
}

function validateURL(url) {
    try {
        const popupAddCardUrl = new URL(url);
        return popupAddCardUrl.protocol === "http:" || popupAddCardUrl.protocol === "https:";
    } catch (_) {
        return false;
    }
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
