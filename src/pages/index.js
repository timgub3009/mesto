// import './index.css'; // добавьте импорт главного файла стилей

//импорты классов + карточек
import Card from '../components/Card.js';
import initialCards from '../utils/data.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { popupEdit, popupAdd, popupZoomImage, profileName, profileJob, popupEditButton, popupAddButton, cardsContainer, cardTemplate, validationConfig } from '../utils/constants.js';

// включение валидации (универсальное)
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

//создание класса увеличения карточки по клику
const popupWithImage = new PopupWithImage(popupZoomImage);

//слушатели к классу увеличения карточки по клику
popupWithImage.setEventListeners();

//создание экземпляра Section (создание Card после изменений в Section перенесено сюда)
const cardsPack = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      {
        item,
        handleCardClick: () => {
          popupWithImage.open(item.name, item.link);
        }
      }, cardTemplate);
    return card.generateCard();
  }
}, cardsContainer);

//добавление карточек из массива
cardsPack.renderAllItems();

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

//форма добавления карточки
const addCard = new PopupWithForm(popupAdd, (item) => {
  const imageData = { name: item.title, link: item.link };
  cardsPack.addItem(imageData);
  addCard.close();
});

//обработчики к новой карточке
addCard.setEventListeners();

//слушатель к кнопке для редактирования профиля
popupEditButton.addEventListener('click', () => {
  editProfile.open();
  editProfile.setInputValues(userInfo.getUserInfo());
  formValidators['profile-form'].resetValidation();
});

//обработчики к классу профиля
editProfile.setEventListeners();

//слушатель к кнопке добавления карточки
popupAddButton.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  addCard.open();
});
