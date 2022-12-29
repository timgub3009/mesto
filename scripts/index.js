import { Card } from './Card.js';
import { initialCards } from './data.js';
import { popupEdit, popupAdd, nameInput, jobInput, profileJob, profileName, closePopup } from './popup.js';
import { FormValidator } from './FormValidator.js';

//popups-forms
const formPopupEdit = popupEdit.querySelector('.popup__form');
const formPopupAdd = popupAdd.querySelector('.popup__form');

//inputs for cards' creation
const cardNameInput = popupAdd.querySelector('.popup__input_type_place');
const cardLinkInput = popupAdd.querySelector('.popup__input_type_link');

//card container
const cardsContainer = document.querySelector('.elements__table');

//template
const cardTemplate = document.querySelector('.elements-template').content;

//object for validation
const validationObject = {
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
const forms = Array.from(document.querySelectorAll(validationObject.formSelector));
forms.forEach((form) => {
  const formValidator = new FormValidator(validationObject, form);
  formValidator.enableValidation();
});

//submit for profile
function submitProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

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

//listeners to submit
formPopupEdit.addEventListener('submit', submitProfileInfo);
formPopupAdd.addEventListener('submit', submitCardAdd);

//render of massive
initialCards.forEach(function (initialCard) {
  renderCard(initialCard, cardTemplate);
});
