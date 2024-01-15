import { openAvatar, closeButtonPopupAvatar, popupAvatar, closeButtonPopupConfirm, popupConfirm, editButton, addButton, popupEdit, popupAdd, popupImage, closeButtonPopupEdit, closeButtonPopupAdd, closeButtonPopupImage, nameInput, nameOutput, jobInput, jobOutput} from './constants'


function closeByClick(event) {
    const modal = event.currentTarget;
    if (event.target === modal) {
        closeModal(modal);
    }
}


function closeByEsc(event) {
    if (event.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_is-opened');
        if (popupOpened) {
            closeModal(popupOpened);
        }
    }
}

export function openModal(modal) {
    document.addEventListener('keydown', closeByEsc);
    modal.classList.add('popup_is-opened');
}

export function closeModal(modal) {
    document.removeEventListener('keydown', closeByEsc);
    modal.classList.remove('popup_is-opened');
}

popupEdit.addEventListener('click', closeByClick);
popupAdd.addEventListener('click', closeByClick);
popupImage.addEventListener('click', closeByClick);
popupConfirm.addEventListener('click', closeByClick);
popupAvatar.addEventListener('click', closeByClick);