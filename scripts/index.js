const popupElement = document.querySelector('.popup');
const popupCloseBtnElement = popupElement.querySelector('.popup__close-button');
const popupOpenBtnElement = document.querySelector('.profile__edit-button');

const openPopup = function () {
  popupElement.classList.add('popup_opened');
}

const closePopup = function (event) {
  popupElement.classList.remove('popup_opened');
}

popupCloseBtnElement.addEventListener('click', closePopup);
popupOpenBtnElement.addEventListener('click', openPopup);

const closePopupByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  } else {
    closePopup();
  }
}

popupElement.addEventListener('click', closePopupByClickOnOverlay);

let formElement = popupElement.querySelector('.popup__form');
let nameInput = popupElement.querySelector('.popup__input_name_type');
let jobInput = popupElement.querySelector('.popup__input_job_type');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  openPopup();
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);
