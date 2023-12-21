import '../src/styles/index.css';
import { createCard, renderCards, toggleLike, deleteCard, openImagePopup } from '../src/components/card'
import { openModal, closeModal } from '../src/components/modal';
import { popupEdit, nameInput, nameOutput, jobInput, jobOutput, formEdit, popupAdd, formAdd, cardsContainer, cards, buttonConfirm, popupConfirm, savePopupAvatar, popupAvatar, openAvatar, avatarInput, editButtonSave, addButtonSave, avatarSaveButton } from './components/constants';
import { enableValidaton } from './components/validate';
import { initialProfile, createApiCard, deleteApiCard, updateAvatar } from './components/api';

enableValidaton({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
});

function popupEditSubmit(event) {
  event.preventDefault();

  nameOutput.textContent = nameInput.value;
  jobOutput.textContent = jobInput.value;

  editButtonSave.textContent = 'Сохранение...';
  setTimeout(function () {
    editButtonSave.textContent = 'Сохранить';
    popupEdit.classList.remove('popup_is-opened');
  }, 1000);

}

formEdit.addEventListener('submit', popupEditSubmit);

function addCardFromForm(event) {
  event.preventDefault();

  const placeName = formAdd.querySelector('.popup__input_type_card-name').value;
  const imageUrl = formAdd.querySelector('.popup__input_type_url').value;

  addButtonSave.textContent = 'Создание...';

  createApiCard({ name: placeName, link: imageUrl })
    .then((data) => {
      setTimeout(() => {
        addButtonSave.textContent = 'Создать';
        closeModal(popupAdd);
        location.reload();
      }, 1000);
    })
}

function updateAvatarFromForm(event) {
  const avatarUrl = avatarInput.value.trim();
  avatarSaveButton.textContent = 'Сохранение...'
  updateAvatar(avatarUrl)
    .then((data) => {
      setTimeout(() => {
        avatarSaveButton.textContent = 'Сохранить'
        openAvatar.style.backgroundImage = `url(${avatarUrl})`;
        closeModal(popupAvatar);
      }, 1000);
    })
}

savePopupAvatar.addEventListener('click', updateAvatarFromForm)

formAdd.addEventListener('submit', addCardFromForm);

const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupImageCloseButton = popupImage.querySelector('.popup__close');
const popupImageCaption = popupImage.querySelector('.popup__caption');

popupImageCloseButton.addEventListener('click', function () {
  closeModal(popupImage);
  popupImageElement.setAttribute('src', '');
  popupImageElement.setAttribute('alt', '');
  popupImageCaption.textContent = '';
});