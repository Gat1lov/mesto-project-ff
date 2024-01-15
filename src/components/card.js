import { initialCards, getProfile, deleteApiCard, activeApiLike, deleteApiLike, fetchData } from './api'
import { cardTemplate, popupImageCaption, cardsContainer, popupConfirm, buttonConfirm, cards } from './constants'
import { openModal, closeModal } from './modal'

let cardToDelete;

export function createCard(name, link, cardLikes, likeProc, openImagePopup, cardId, ownerId, userId) {
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const likeButton = card.querySelector('.card__like-button');
  const cardNumbersLike = card.querySelector('.card__like-numbers');
  const deleteButton = card.querySelector('.card__delete-button');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  const userLike = checkLike(cardLikes, userId);
  updateLike(userLike, likeButton);

  cardNumbersLike.textContent = cardLikes.length;

  likeButton.addEventListener('click', function () {
    toggleLike(card, userId, likeButton, cardId, cardLikes);
  });
  
  deleteButton.addEventListener('click', function () {
    cardToDelete = card;
    deleteButtonWork(cardId);
    openModal(popupConfirm);
  });

  cardImage.addEventListener('click', function () {
    openImagePopup(name, link, card);
  });

  if (ownerId === userId) {
    deleteButtonWork(card, cardId);
  } else {
    deleteButtonHide(card);
  }

  return card;
};

export function deleteButtonWork(cardId) {
  buttonConfirm.setAttribute('data-card-id', cardId);
};

export function deleteCard(cardId) {
  buttonConfirm.textContent = 'Удаление...';
  Promise.resolve()
    .then(() => deleteApiCard(cardId))
    .then(response => {
      cardToDelete.remove();
      closeModal(popupConfirm);
    })
    .catch(error => {
      console.error('Ошибка при удалении карты:', error);
    })
    .finally(() => {
      buttonConfirm.textContent = 'Да';
    });
}

export function deleteButtonHide(card) {
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.style.display = 'none';
}

function checkLike(cardLikes, userId) {
  return cardLikes.some((item) => item._id === userId);
}

function updateLike(isLiked, likeButton) {
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }
}

export function toggleLike(card, userId, likeButton, cardId, cardLikes) {
  const cardNumbersLike = likeButton.parentElement.querySelector('.card__like-numbers');
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  const updateLikesNumber = (newLikeNumber) => {
    if (cardNumbersLike) {
      cardNumbersLike.textContent = newLikeNumber;
    }
  };
  const editLike = isLiked ? deleteApiLike : activeApiLike;

  editLike(cardId)
    .then((response) => {
      const newLikeNumber = response.likes.length;
      const userLike = checkLike(response.likes, userId);
      updateLike(userLike, likeButton);
      updateLikesNumber(newLikeNumber);
    })
    .catch((error) => {
      console.error(`Ошибка при изменении лайка:`, error);
    });
}