import { Card } from './Card.js';
import { initialCards } from './data.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { Section } from './Section.js';

//popups
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupWindows = document.querySelectorAll('.popup');

//popups-forms
const formPopupEdit = popupEdit.querySelector('.popup__form');
const formPopupAdd = popupAdd.querySelector('.popup__form');

//popups-inputs
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');

//inputs for cards' creation
const cardNameInput = popupAdd.querySelector('.popup__input_type_place');
const cardLinkInput = popupAdd.querySelector('.popup__input_type_link');

//popups-buttons(open)
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

//card container
const cardsContainer = document.querySelector('.elements__table');

//template
const cardTemplate = document.querySelector('.elements-template').content;

const popupZoomImage = document.querySelector('.popup_type_closeup');
const popupImage = popupZoomImage.querySelector('.popup__image');
const popupImageCaption = popupZoomImage.querySelector('.popup__figcaption');

//object for validation
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
};

//add a card to the list
const renderCard = function (imageObject, template) {
  const card = new Card(imageObject, template);
  cardsContainer.prepend(card._generateCard());
}

//add validation to any form

const formValidatorForAdd = new FormValidator(validationConfig, popupAdd);
const formValidatorForEdit = new FormValidator(validationConfig, popupEdit);
formValidatorForAdd.enableValidation();
formValidatorForEdit.enableValidation();


//submit for profile


//профиль пользователя
const profile = new UserInfo({
  name: profileName,
  description: profileJob
});

//форма редактирования профиля пользователя
const editProfilePopup = new PopupWithForm(popupEdit, () => {
  profile.setUserInfo(nameInput, jobInput)
})

//загрузка информации в инпуты редактирования и сохранение
function submitProfileInfo(evt) {
  evt.preventDefault();
  const profileData = profile.getUserInfo();
  nameInput.value = profileData.userName;
  jobInput.value = profileData.userDescription;
  editProfilePopup.close();
}

//обработчики к редактированию
popupEdit.setEventListeners();
formPopupEdit.addEventListener('submit', submitProfileInfo);

//кнопка для редактирования
popupOpenButton.addEventListener('click', function () {
  submitProfileInfo();
  editProfilePopup.open();
  formValidatorForEdit.resetFormValidation();
});


//форма добавления карточки
const add = new PopupWithForm(popupAdd, () => {
  section.addItem
})



const section = new Section({items: initialCards, renderer: (item) => {
  section.addItem(item)}}, cardsContainer);






popupAdd.setEventListeners();

//submit for adding images
function submitCardAdd(evt) {
  evt.preventDefault();

  const imageObject = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  renderCard(imageObject, cardTemplate);
  closePopup(popupAdd);
  evt.target.reset();
}

//listeners to open

popupAddButton.addEventListener('click', function () {
  openPopup(popupAdd);
  formValidatorForAdd.resetSubmitButton();
});

//listeners to close
// popupWindows.forEach((popupWindow) => {
//   popupWindow.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(popupWindow)
//     }
//     if (evt.target.classList.contains('popup__close-button')) {
//       closePopup(popupWindow)
//     }
//   })
// })

//listeners to submit

formPopupAdd.addEventListener('submit', submitCardAdd);

//render of massive
initialCards.forEach(function (initialCard) {
  renderCard(initialCard, cardTemplate);
});
