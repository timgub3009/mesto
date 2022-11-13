const popupElement = document.querySelector('.popup');
const popupCloseBtnElement = popupElement.querySelector('.popup__close-button');
const popupOpenBtnElement = document.querySelector('.profile__edit-button');
const formElement = popupElement.querySelector('.popup__form');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = popupElement.querySelector('.popup__input_type_name');
const jobInput = popupElement.querySelector('.popup__input_type_job');

const openPopup = function () {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const closePopup = function (event) {
  popupElement.classList.remove('popup_opened');
}

const closePopupByClickOnOverlay = function(event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

popupCloseBtnElement.addEventListener('click', closePopup);
popupOpenBtnElement.addEventListener('click', openPopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', formSubmitHandler);
