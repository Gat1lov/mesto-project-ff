const popupImageCaption = document.querySelector('.popup__caption');
const cardTemplate = document.querySelector('#card-template');
const popupEdit = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const popupConfirm = document.querySelector('.popup_type_confirm');
const popupAvatar = document.querySelector('.popup_type_avatar')
const buttonConfirm = document.getElementById('button-confirm-save');
const nameAddInput = document.querySelector('.popup__input_type_card-name');
const nameOutput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.popup__input_type_description');
const urlInput = document.querySelector('.popup__input_type_url');
const jobOutput = document.querySelector('.profile__description');
const formEdit = document.getElementById("edit-profile");
const popupAdd = document.querySelector('.popup_type_new-card');
const formAdd = document.getElementById('new-place');
const cardsContainer = document.querySelector('.places__list');
const cards = document.querySelectorAll('.card');
const deleteButton = document.querySelector('.card__delete-button');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_type_image');
const formAvatar = document.getElementById('avatar')
const buttonSubmitAvatarForm = popupAvatar.querySelector('.popup__button')
const closeButtonPopupEdit = popupEdit.querySelector('.popup__close');
const closeButtonPopupAdd = popupAdd.querySelector('.popup__close');
const closeButtonPopupImage = popupImage.querySelector('.popup__close');
const closeButtonPopupConfirm = popupConfirm.querySelector('.popup__close');
const closeButtonPopupAvatar = popupAvatar.querySelector('.popup__close');
const editButtonSave = document.getElementById('button-edit-save');
const addButtonSave = document.getElementById('button-add-save');
const profImage = document.getElementById('image');
const profTitle = document.getElementById('title');
const profDescription = document.getElementById('description');
const cardImage = document.getElementById('card-image');
const cardTitle = document.getElementById('card-title');
const openAvatar = document.querySelector('.profile__image');
const avatarInput = popupAvatar.querySelector('.popup__input_avatar');
const avatarError = popupAvatar.querySelector('.pop-up__error-message');
const avatarSaveButton = document.getElementById('button-avatar-save');
const inputElement = document.querySelector('.pop-up__input');
const popupImageElement = popupImage.querySelector('.popup__image');
const placeName = formAdd.querySelector('.popup__input_type_card-name')
const imageUrl = formAdd.querySelector('.popup__input_type_url')


export {formAvatar, imageUrl, placeName, popupImageElement, cardTemplate, popupImageCaption, inputElement, avatarSaveButton, avatarError, avatarInput, buttonSubmitAvatarForm, openAvatar, closeButtonPopupAvatar, popupAvatar, buttonConfirm, closeButtonPopupConfirm, deleteButton, popupConfirm, cardImage, cardTitle, profDescription, profTitle, profImage, addButtonSave, nameAddInput, urlInput, editButtonSave, popupEdit, nameInput, nameOutput, jobInput, jobOutput, formEdit, popupAdd, formAdd, cardsContainer, cards, editButton, addButton, popupImage, closeButtonPopupEdit, closeButtonPopupAdd, closeButtonPopupImage}