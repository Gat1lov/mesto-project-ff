import '../src/styles/index.css';
import { createCard, toggleLike, deleteCard, deleteButtonWork, deleteButtonHide } from '../src/components/card';
import { openModal, closeModal } from '../src/components/modal';
import { formAvatar, imageUrl, placeName, profDescription, profTitle, profImage, popupImage, popupImageElement, popupEdit, nameInput, nameOutput, jobInput, jobOutput, formEdit, popupAdd, formAdd, cardsContainer, cards, buttonConfirm, popupConfirm, buttonSubmitAvatarForm, popupAvatar, openAvatar, avatarInput, editButtonSave, addButtonSave, avatarSaveButton, editButton, addButton, closeButtonPopupAvatar, closeButtonPopupConfirm, closeButtonPopupImage, closeButtonPopupAdd, closeButtonPopupEdit } from './components/constants';
import { enableValidation, clearValidation } from './components/validate';
import { activeApiLike, createApiCard, deleteApiCard, deleteApiLike, initialCards, updateProfile, updateAvatar, getProfile, loadProfileAndCards } from './components/api';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: '.popup__input_error',
  errorClass: '.popup__error-message'
};

enableValidation(validationConfig);
 
let userId;

loadProfileAndCards()
  .then(({ profile, cards, cardId }) => {
   userId = profile._id;
    renderUserProfile(profile);
    renderCards(cards, userId);
  })
  .catch((error) => {
    console.error('Ошибка:', error);
  });

function renderUserProfile(profile) {
  nameOutput.textContent = profile.name;
  jobOutput.textContent = profile.about;
  openAvatar.style.backgroundImage = `url(${profile.avatar})`;
  openAvatar.alt = profile.name;
}

function editPopupSubmit(event) {
  event.preventDefault();

  const newName = nameInput.value;
  const newAbout = jobInput.value;

  editButtonSave.textContent = 'Сохранение...';

  updateProfile({ name: newName, about: newAbout })
    .then((result) => {
      profTitle.textContent = result.name;
      profDescription.textContent = result.about;
      closeModal(popupEdit);

      nameOutput.textContent = result.name;
      jobOutput.textContent = result.about;
    })
    .catch((error) => {
      console.error('Ошибка при обновлении профиля:', error);
    })
    .finally(() => {
      editButtonSave.textContent = 'Сохранить';
    });
}

editButtonSave.addEventListener('click', editPopupSubmit);


function addCardFromForm(event) {
  event.preventDefault();

  const name = placeName.value;
  const link = imageUrl.value;

  const cardData = { name, link };

  addButtonSave.textContent = 'Создание...';

  createApiCard(cardData)
    .then(newCard => {
      const { name, link, likes, _id, owner } = newCard;
      const cardElement = createCard(name, link, likes, toggleLike, openImagePopup, _id, owner._id, userId);
      cardsContainer.prepend(cardElement);
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
  event.preventDefault();

  const avatarUrl = avatarInput.value.trim();
  avatarSaveButton.textContent = 'Сохранение...';
  openAvatar.style.backgroundImage = `url(${avatarUrl})`;
  updateAvatar(avatarUrl)
    .then((newAvatarUrl) => {
      openAvatar.style.backgroundImage = `url(${newAvatarUrl})`;
      closeModal(popupAvatar);
    })
    .catch((error) => {
      console.error('Ошибка при обновлении аватара:', error);
    })
    .finally(() => {
      avatarSaveButton.textContent = 'Сохранить';
    });
}

formAvatar .addEventListener('submit', updateAvatarFromForm);

formAdd.addEventListener('submit', addCardFromForm);

const popupImageCloseButton = popupImage.querySelector('.popup__close');
const popupImageCaption = popupImage.querySelector('.popup__caption');

popupImageCloseButton.addEventListener('click', function () {
  closeModal(popupImage);
  popupImageElement.setAttribute('src', '');
  popupImageElement.setAttribute('alt', '');
  popupImageCaption.textContent = '';
});

buttonConfirm.addEventListener('click', function () {
  const cardId = buttonConfirm.getAttribute('data-card-id');
  if (cardId) {
    deleteCard(cardId);
  } else {
    console.error('Не удалось получить ID карты для удаления.');
  }
});

export function openImagePopup(name, link, card) {

  popupImageElement.src = link;
  popupImageElement.setAttribute('alt', name);
  popupImageCaption.textContent = name;

  openModal(popupImage);
}

export function renderCards(cardsData, userId) {
  cardsData.forEach(card => {
    const { name, link, likes, _id, owner } = card;
    const newCard = createCard(name, link, likes, toggleLike, openImagePopup, _id, owner._id, userId);
    const cardNumbersLike = newCard.querySelector('.card__like-numbers');
    cardNumbersLike.textContent = likes.length.toString()
    cardsContainer.appendChild(newCard);

  });
}

function openPopupEdit() {
  clearValidation(formEdit, validationConfig);
  nameInput.value = nameOutput.textContent;
  jobInput.value = jobOutput.textContent;
  openModal(popupEdit);
}

function openPopupAvatar() {
  clearValidation(formAdd, validationConfig);
  openModal(popupAvatar);
}

function openPopupAdd() {
  clearValidation(formAdd, validationConfig);
  openModal(popupAdd);
}

function openPopupConfirm() {
  openModal(popupConfirm);
}

function closePopupEdit() {
  clearValidation(formEdit, validationConfig);
  closeModal(popupEdit);
}

function closePopupAdd() {
  clearValidation(formAdd, validationConfig);
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