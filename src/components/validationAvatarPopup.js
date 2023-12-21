import {savePopupAvatar, avatarInput, avatarError} from  './constants';

export function validateAvatarInput(url) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
}

export function checkAvatarInput() {
    const inputValue = avatarInput.value.trim();

    if (validateAvatarInput(inputValue)) {
        avatarError.textContent = '';
        avatarInput.classList.remove('popup__input_error');
        savePopupAvatar.removeAttribute('disabled');
    } else {
        avatarError.textContent = 'Введите корректный URL';
        avatarInput.classList.add('popup__input_error');
        savePopupAvatar.setAttribute('disabled', true);
    }
}

avatarInput.addEventListener('input', checkAvatarInput);