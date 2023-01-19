import './index.css'; // добавьте импорт главного файла стилей

//импорты классов + карточек
import Card from '../scripts/Card.js';
import initialCards from '../scripts/data.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import Section from '../scripts/Section.js';

//два попапа (отдельно)
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupZoomImage = document.querySelector('.popup_type_closeup');

//инпуты к попапу профиля
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');

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

//создание класса увеличения карточки по клику
const popupWithImage = new PopupWithImage(popupZoomImage);

//слушатели к классу увеличения карточки по клику
popupWithImage.setEventListeners();

//функция создания карточки
const renderCard = function (item, template) {
  const card = new Card( {item, handleCardClick: () => {popupWithImage.open(item.name, item.link);}}, template);
  cardsContainer.prepend(card._generateCard());
}

//создание валидации для добавленной карточки и для профиля
const formValidatorForAdd = new FormValidator(validationConfig, popupAdd);
const formValidatorForEdit = new FormValidator(validationConfig, popupEdit);
formValidatorForAdd.enableValidation();
formValidatorForEdit.enableValidation();

//профиль пользователя
const userInfo = new UserInfo({
  name: profileName,
  description: profileJob
});

//форма редактирования профиля пользователя
const editProfile = new PopupWithForm(popupEdit, (userData) => {
  userInfo.setUserInfo(userData);
  editProfile.close();
})

//создание класса секции
const cardsPack = new Section({items: initialCards, renderer: (item) => {
  renderCard(item, cardTemplate)}, cardsContainer});

//добавление карточек из массива
cardsPack.renderAllItems();

//форма добавления карточки
const addCard = new PopupWithForm(popupAdd, (item) => {
  const imageData = {name: item.title, link: item.link};
  renderCard(imageData, cardTemplate);
  addCard.close();});

//обработчики к новой карточке
addCard.setEventListeners();

//слушатель к кнопке для редактирования профиля
popupEditButton.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.description;
  formValidatorForEdit.resetFormValidation();
  editProfile.open();
});

//обработчики к классу профиля
editProfile.setEventListeners();

//слушатель к кнопке добавления карточки
popupAddButton.addEventListener('click', () => {
  addCard.open();
  formValidatorForAdd.resetSubmitButton();
});

