import { initialCards, initialProfile, deleteApiCard, activeApiLike, deleteApiLike } from './api'
import { cardsContainer, popupConfirm, buttonConfirm, cards } from './constants'
import { openModal, closeModal } from './modal'

const popupImageCaption = document.querySelector('.popup__caption');
const cardTemplate = document.querySelector('#card-template');

export function openImagePopup(name, link) {
  const popupImage = document.querySelector('.popup_type_image');
  const popupImageElement = popupImage.querySelector('.popup__image');

  popupImageElement.src = link;
  popupImageElement.setAttribute('alt', name);
  popupImageCaption.textContent = name;

  openModal(popupImage);
}


export function createCard(name, link, likes, likeProc, openImagePopup, cardId) {
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const likeButton = card.querySelector('.card__like-button');
  const cardNumbersLike = card.querySelector('.card__like-numbers');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardNumbersLike.textContent = likes.length;

  likeButton.addEventListener('click', function () {
    likeProc(likeButton, cardId);
  });

  cardImage.addEventListener('click', function () {
    openImagePopup(name, link);
  });

  return card;
};

function deleteButtonWork(card, cardId) {
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    openModal(popupConfirm);
    deleteApiCard(cardId);
  });
}

function deleteCard(){
  buttonConfirm.textContent = 'Удаляем...'
  setTimeout(function () {
    buttonConfirm.textContent = 'Да'
    closeModal(popupConfirm);
    location.reload();
  }, 1000)
}

buttonConfirm.addEventListener('click', deleteCard)

function deleteButtonHide(card) {
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.style.display = 'none';
}

export function renderCards(cards) {
  initialProfile()
    .then(resultID => {
      cards.forEach(card => {
        const newCard = createCard(card.name, card.link, card.likes, toggleLike, openImagePopup, card._id);
        const ownerID = card.owner._id;

        if (resultID === ownerID) {
          deleteButtonWork(newCard, card._id);
        } else {
          deleteButtonHide(newCard);
        }

        const likes = JSON.parse(localStorage.getItem('likes')) || {};
        if (likes[card._id]) {
          const likeButton = newCard.querySelector('.card__like-button');
          likeButton.classList.add('card__like-button_is-active');
        }

        cardsContainer.appendChild(newCard);
      });
    })
    .catch(error => {
      console.error('Error rendering cards:', error);
    });
}

export function toggleLike(likeButton, cardId) {
  const cardNumbersLike = likeButton.parentElement.querySelector('.card__like-numbers');
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    deleteApiLike(cardId)
      .then(() => {
        likeButton.classList.remove('card__like-button_is-active');
        const currentLikes = parseInt(cardNumbersLike.textContent, 10);
        cardNumbersLike.textContent = currentLikes - 1;
      })
  } else {
    activeApiLike(cardId)
      .then(() => {
        likeButton.classList.add('card__like-button_is-active');
        const currentLikes = parseInt(cardNumbersLike.textContent, 10);
        cardNumbersLike.textContent = currentLikes + 1;
      })
  }
}

initialCards()
  .then(cards => {
    renderCards(cards);
  })
  .catch(error => {
    console.log(error);
  });