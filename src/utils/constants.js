//два попапа (отдельно)
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupZoomImage = document.querySelector('.popup_type_closeup');
const popupChangeAvatar = document.querySelector('.popup_type_avatar-edit');
const popupConfirmRemoval= document.querySelector('.popup_type_confirm-removal');

//инпуты к попапу профиля
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');


//кнопки для открытия попапов
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupChangeAvatarButton = document.querySelector('.profile__avatar-edit-button');

const likeButton = document.querySelector('.elements__like-button');
const deleteButton = document.querySelector('.elements__delete-button');
const likeCounter = document.querySelector('.elements__like-counter');

//контейнер
const cardsContainer = document.querySelector('.elements__table');

//шаблон
const cardTemplate = document.querySelector('.elements-template').content;

//объект для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
};

export {
  popupEdit, popupAdd, popupZoomImage, popupChangeAvatar, popupConfirmRemoval, profileName, profileJob, profileAvatar, popupEditButton, popupAddButton, popupChangeAvatarButton, cardsContainer, cardTemplate, validationConfig, likeButton, deleteButton, likeCounter
}
