import { popupProfileLengthValidation, popupProfileInputError } from './validateEditPopup';
import { popupAddNewCardFormValidation, popupAddNewCardUrlValidation} from './validateAddPopup';
import { validateAvatarInput } from './validationAvatarPopup';

export function enableValidaton(settings) {
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