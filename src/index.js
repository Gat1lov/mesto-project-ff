import '../src/styles/index.css';
import { createCard, renderCards, toggleLike, deleteCard, openImagePopup } from '../src/components/card';
import { openModal, closeModal } from '../src/components/modal';
import { popupEdit, nameInput, nameOutput, jobInput, jobOutput, formEdit, popupAdd, formAdd, cardsContainer, cards, buttonConfirm, popupConfirm, buttonSubmitAvatarForm, popupAvatar, openAvatar, avatarInput, editButtonSave, addButtonSave, avatarSaveButton, editButton, addButton, closeButtonPopupAvatar, closeButtonPopupConfirm, closeButtonPopupImage, closeButtonPopupAdd, closeButtonPopupEdit } from './components/constants';
import { enableValidation, popupProfileFormValidation, popupAddNewCardFormValidation, checkAvatarInput } from './components/validate';
import { fetchData, activeApiLike, createApiCard, deleteApiCard, deleteApiLike, initialCards, initialProfile, updateAvatar, getProfile } from './components/api';
import { profDescription, profTitle, profImage } from './components/constants';

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

getProfile();

function loadInitialCards() {
  fetchData('/cards', 'GET')
    .then((data) => {
      renderCards(data);
    })
    .catch((error) => {
      console.error('Ошибка при загрузке карточек:', error);
    });
}

function editPopupSubmit(event) {
  event.preventDefault();

  const newName = nameInput.value;
  const newAbout = jobInput.value;

  editButtonSave.textContent = 'Сохранение...';

  fetchData('/users/me', 'PATCH', { name: newName, about: newAbout })
    .then((result) => {
      profTitle.textContent = result.name;
      profDescription.textContent = result.about;
      closeModal(popupEdit);
    })
    .catch((error) => {
      console.error('Ошибка при обновлении профиля:', error);
      closeModal(popupEdit);
    })
    .finally(() => {
      editButtonSave.textContent = 'Сохранить';
    });
}

editButtonSave.addEventListener('click', editPopupSubmit);

editButtonSave.addEventListener('click', editPopupSubmit);

function addCardFromForm(event) {
  event.preventDefault();

  const placeName = formAdd.querySelector('.popup__input_type_card-name').value;
  const imageUrl = formAdd.querySelector('.popup__input_type_url').value;

  addButtonSave.textContent = 'Создание...';

  fetchData('/cards', 'POST', { name: placeName, link: imageUrl })
    .then(() => {
      closeModal(popupAdd);
    })
    .catch((error) => {
      console.error('Ошибка при создании карточки:', error);
    })
    .finally(() => {
      addButtonSave.textContent = 'Создать';
    });
}

function updateAvatarFromForm(event) {
  const avatarUrl = avatarInput.value.trim();
  avatarSaveButton.textContent = 'Сохранение...';
  fetchData('/users/me/avatar', 'PATCH', { avatar: avatarUrl })
    .then(() => {
      openAvatar.style.backgroundImage = `url(${avatarUrl})`;
      closeModal(popupAvatar);
    })
    .catch((error) => {
      console.error('Ошибка при обновлении аватара:', error);
    })
    .finally(() => {
      avatarSaveButton.textContent = 'Сохранить';
    });
}

buttonSubmitAvatarForm.addEventListener('click', updateAvatarFromForm);
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

loadInitialCards();

function openPopupEdit() {
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
  popupProfileFormValidation()
  openModal(popupEdit);
}

function openPopupAvatar() {
  checkAvatarInput()
  openModal(popupAvatar);
}

function openPopupAdd() {
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

function closePopupAvatar() {
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