import { Card } from './Card.js';
import { initialCards } from './data.js'

//popups
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupCloseUp = document.querySelector('.popup_type_closeup');
const popupWindows = document.querySelectorAll('.popup');

//popups-buttons(open)
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

//popups-forms
const formPopupEdit = popupEdit.querySelector('.popup__form');
const formPopupAdd = popupAdd.querySelector('.popup__form');

//popups-inputs
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
const cardName = popupAdd.querySelector('.elements__card-heading');
export const popupImage = popupCloseUp.querySelector('.popup__image');
export const popupImageCaption = popupCloseUp.querySelector('.popup__figcaption');
const cardNameInput = popupAdd.querySelector('.popup__input_type_place');
const cardLinkInput = popupAdd.querySelector('.popup__input_type_link');

//card container
const cardsContainer = document.querySelector('.elements__table');

//template
const cardTemplate = document.querySelector('.elements-template').content;

//submit
const submitAddButton = popupAdd.querySelector('.popup__submit-button');

//popup-open
export const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupByEscape);
}

//popup-close
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupByEscape);
}

const closePopupByEscape = function (evt) {
  if (evt.key === 'Escape') {
    const popupIsActive = document.querySelector('.popup_opened');
    closePopup(popupIsActive);
  }
}

//add a card to the list
const renderCard = function (imageObject, template) {
  const card = new Card(imageObject, template);
  cardsContainer.prepend(card);
}

//reset submit button
const resetSubmitButton = (popup) => {
  if (popup === popupAdd) {
    submitAddButton.setAttribute('disabled', true);
    submitAddButton.classList.add('popup__submit-button_inactive');
  } else {
    submitAddButton.removeAttribute('disabled');
    submitAddButton.classList.remove('popup__submit-button_inactive');
  }
}

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

  renderCard(imageObject, '.elements-template');
  closePopup(popupAdd);
  evt.target.reset();
}

//listeners to open
popupOpenButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEdit);
});
popupAddButton.addEventListener('click', function () {
  openPopup(popupAdd);
  resetSubmitButton(popupAdd);
});

//listeners to close
popupWindows.forEach((popupWindow) => {
  popupWindow.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popupWindow)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popupWindow)
      }
  })
})

//listener to submit
formPopupEdit.addEventListener('submit', submitProfileInfo);
formPopupAdd.addEventListener('submit', submitCardAdd);

initialCards.forEach(function (card) {
  renderCard(card, '.elements-template');
});
