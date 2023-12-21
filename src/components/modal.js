import { openAvatar, closeButtonPopupAvatar, popupAvatar, closeButtonPopupConfirm, popupConfirm, editButton, addButton, popupEdit, popupAdd, popupImage, closeButtonPopupEdit, closeButtonPopupAdd, closeButtonPopupImage, nameInput, nameOutput, jobInput, jobOutput} from './constants'
import { popupProfileFormValidation } from './validateEditPopup';
import { popupAddNewCardFormValidation } from './validateAddPopup';
import { checkAvatarInput } from './validationAvatarPopup';


function closeByClick(event) {
    const modal = event.currentTarget;
    if (event.target === modal) {
        document.removeEventListener('keydown', closeByEsc);
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

function openPopupEdit() {
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
    popupProfileFormValidation();
    openModal(popupEdit);
}

function openPopupAvatar() {
    checkAvatarInput();
    openModal(popupAvatar);
}

function openPopupAdd(){
    popupAddNewCardFormValidation();
    openModal(popupAdd);
}

function openPopupConfirm() {
    openModal(popupConfirm);
}

function closePopupEdit() {
    closeModal(popupEdit);
}

function closePopupAdd() {
    closeModal(popupAdd);
}

function closePopupImage() {
    closeModal(popupImage);
}

function closePopupConfirm() {
    closeModal(popupConfirm);
}

function closePopupAvatar(){
    closeModal(popupAvatar);
}

openAvatar.addEventListener('click', openPopupAvatar)
editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
closeButtonPopupEdit.addEventListener('click', closePopupEdit);
closeButtonPopupAdd.addEventListener('click', closePopupAdd);
closeButtonPopupImage.addEventListener('click', closePopupImage);
closeButtonPopupConfirm.addEventListener('click', closePopupConfirm);
closeButtonPopupAvatar.addEventListener('click', closePopupAvatar);
popupEdit.addEventListener('click', closeByClick);
popupAdd.addEventListener('click', closeByClick);
popupImage.addEventListener('click', closeByClick);
popupConfirm.addEventListener('click', closeByClick);
popupAvatar.addEventListener('click', closeByClick);