import { initialCards, getProfile, deleteApiCard, activeApiLike, deleteApiLike, fetchData } from './api'
import { cardTemplate, popupImageCaption, cardsContainer, popupConfirm, buttonConfirm, cards } from './constants'
import { openModal, closeModal } from './modal'

export function createCard(name, link, cardLikes, likeProc, openImagePopup, cardId, ownerId, userId) {
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const likeButton = card.querySelector('.card__like-button');
  const cardNumbersLike = card.querySelector('.card__like-numbers');
  const deleteButton = card.querySelector('.card__delete-button');

  const likesFromLocalStorage = JSON.parse(localStorage.getItem('likes')) || {};
  if (likesFromLocalStorage[cardId]) {
    const likeButton = card.querySelector('.card__like-button');
    likeButton.classList.add('card__like-button_is-active');
  }

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardNumbersLike.textContent = cardLikes.length;

  likeButton.addEventListener('click', function () {
    likeProc(likeButton, cardId);
  });

  deleteButton.addEventListener('click', function() {
    deleteButtonWork(cardId);
    openModal(popupConfirm);
    
    buttonConfirm.addEventListener('click', function confirmDelete() {
      deleteCard(card, cardId);
      buttonConfirm.removeEventListener('click', confirmDelete); 
    });
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

export function removeCardFromDOM(card) {
  card.remove();
}

export function deleteCard(card, cardId) {
  buttonConfirm.textContent = 'Удаление...';
  Promise.resolve()
    .then(() => deleteApiCard(cardId))
    .then(response => {
      removeCardFromDOM(card);
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

export function toggleLike(likeButton, cardId) {
  const cardNumbersLike = likeButton.parentElement.querySelector('.card__like-numbers');
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  const updateLikesCount = (newLikesCount) => {
    if (cardNumbersLike) {
      cardNumbersLike.textContent = newLikesCount;
    }
  };

  if (isLiked) {
    deleteApiLike(cardId)
      .then(() => {
        likeButton.classList.remove('card__like-button_is-active');
        updateLikesCount(parseInt(cardNumbersLike.textContent, 10) - 1);
        const likesFromLocalStorage = JSON.parse(localStorage.getItem('likes')) || {};
        likesFromLocalStorage[cardId] = false;
        localStorage.setItem('likes', JSON.stringify(likesFromLocalStorage));
      })
      .catch((error) => {
        console.error('Ошибка при удалении лайка:', error);
      });
  } else {
    activeApiLike(cardId)
      .then(() => {
        likeButton.classList.add('card__like-button_is-active');
        updateLikesCount(parseInt(cardNumbersLike.textContent, 10) + 1);
        const likesFromLocalStorage = JSON.parse(localStorage.getItem('likes')) || {};
        likesFromLocalStorage[cardId] = true;
        localStorage.setItem('likes', JSON.stringify(likesFromLocalStorage));
      })
      .catch((error) => {
        console.error('Ошибка при добавлении лайка:', error);
      });
  }
}