import { openImagePopup, userId} from '../index'
import { initialCards, getProfile, deleteApiCard, activeApiLike, deleteApiLike, fetchData } from './api'
import { cardTemplate, popupImageCaption, cardsContainer, popupConfirm, buttonConfirm, cards } from './constants'
import { openModal, closeModal } from './modal'

export function createCard(name, link, likes, likeProc, openImagePopup, cardId, ownerId) {
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const likeButton = card.querySelector('.card__like-button');
  const cardNumbersLike = card.querySelector('.card__like-numbers');
  const deleteButton = card.querySelector('.card__delete-button');


  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardNumbersLike.textContent = likes.length;

  likeButton.addEventListener('click', function () {
    likeProc(likeButton, cardId);
  });

  deleteButton.addEventListener('click', function () {
   deleteButtonWork(card, cardId);
   openModal(popupConfirm); 
  })

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

export function deleteButtonWork(card, cardId) { 
    buttonConfirm.setAttribute('data-card-id', cardId);
};

export function deleteCard(cardId) {
  buttonConfirm.textContent = 'Удаление...';
  Promise.resolve()
    .then(() => deleteApiCard(cardId))
    .then(response => {
      closeModal(popupConfirm);
    })
    .catch(error => {
      console.error('Ошибка при удалении карты:', error);
    })
    .finally(() => {
      buttonConfirm.textContent = 'Да';
    });
}

buttonConfirm.addEventListener('click', deleteCard)

export function deleteButtonHide(card) {
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.style.display = 'none';
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
      .catch((error) => {
        console.error('Ошибка при удалении лайка:', error);
      });
  } else {
    activeApiLike(cardId)
      .then(() => {
        likeButton.classList.add('card__like-button_is-active');
        const currentLikes = parseInt(cardNumbersLike.textContent, 10);
        cardNumbersLike.textContent = currentLikes + 1;
      })
      .catch((error) => {
        console.error('Ошибка при добавлении лайка:', error);
      });
  }
}