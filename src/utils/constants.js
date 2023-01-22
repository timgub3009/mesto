//два попапа (отдельно)
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupZoomImage = document.querySelector('.popup_type_closeup');

//инпуты к попапу профиля
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');


//кнопки для открытия попапов
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

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
  popupEdit, popupAdd, popupZoomImage, profileName, profileJob, popupEditButton, popupAddButton, cardsContainer, cardTemplate, validationConfig
}
