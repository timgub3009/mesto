import Card from './Card.js';
import initialCards from './data.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

//popups
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

//popups-inputs
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');

//popups-buttons(open)
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

//card container
const cardsContainer = document.querySelector('.elements__table');
const cardTemplate = document.querySelector('.elements-template').content;
const popupZoomImage = document.querySelector('.popup_type_closeup');
const popupImage = popupZoomImage.querySelector('.popup__image');
const popupImageCaption = popupZoomImage.querySelector('.popup__figcaption');
const cardNameInput = popupAdd.querySelector('.popup__input_type_place');
const cardLinkInput = popupAdd.querySelector('.popup__input_type_link');

//object for validation
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
};

const popupWithImage = new PopupWithImage(popupZoomImage, popupImage, popupImageCaption);

popupWithImage.setEventListeners();

//add a card to the list
const renderCard = function (item, template) {
  const card = new Card(item, template);
  cardsContainer.prepend(card._generateCard());
}

//add validation to any form

const formValidatorForAdd = new FormValidator(validationConfig, popupAdd);
const formValidatorForEdit = new FormValidator(validationConfig, popupEdit);
formValidatorForAdd.enableValidation();
formValidatorForEdit.enableValidation();

// const imageData = {
//   name: cardNameInput.value,
//   link: cardLinkInput.value,
// };

//профиль пользователя
const userInfo = new UserInfo({
  name: profileName,
  description: profileJob
});

//форма редактирования профиля пользователя
const editProfile = new PopupWithForm(popupEdit, (userData) => {
  userInfo.setUserInfo(userData)
})

const cardsPack = new Section({items: initialCards, renderer: (item) => {
  cardsPack.addItem(renderCard(item, cardTemplate))},cardsContainer});

cardsPack.renderAllItems();

//форма добавления карточки
//todo привести в соответствии с handler, бросать нужный параметр
const addCard = new PopupWithForm(popupAdd, (imageData) => {
  cardsPack.addItem(renderCard(imageData, cardTemplate));
})

//обработчики к редактированию

addCard.setEventListeners();

// //кнопка для редактирования
popupEditButton.addEventListener('click', () => {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.description;
  editProfile.open();
  formValidatorForEdit.resetFormValidation();
});

editProfile.setEventListeners();

popupAddButton.addEventListener('click', () => {
  addCard.open();
  formValidatorForAdd.resetSubmitButton();
});

// //submit for adding images
// function submitCardAdd(evt) {
//   evt.preventDefault();

//   const imageObject = {
//     name: cardNameInput.value,
//     link: cardLinkInput.value,
//   };

//   renderCard(imageObject, cardTemplate);
//   closePopup(popupAdd);
//   evt.target.reset();
// }

// //listeners to open



// //listeners to close
// // popupWindows.forEach((popupWindow) => {
// //   popupWindow.addEventListener('mousedown', (evt) => {
// //     if (evt.target.classList.contains('popup_opened')) {
// //       closePopup(popupWindow)
// //     }
// //     if (evt.target.classList.contains('popup__close-button')) {
// //       closePopup(popupWindow)
// //     }
// //   })
// // })

// //listeners to submit

// // //render of massive
// // initialCards.forEach(function (initialCard) {
// //   renderCard(initialCard, cardTemplate);
// // });
