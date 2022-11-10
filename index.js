const popupElement = document.querySelector('.popup');
const popupCloseBtnElement = popupElement.querySelector('.popup__close-button');
const popupOpenBtnElement = document.querySelector('.profile__edit-button');

const openPopup = function(event) {
  popupElement.classList.add('popup_opened');
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

popupCloseBtnElement.addEventListener('click', closePopup);
popupOpenBtnElement.addEventListener('click', openPopup);

let formElement = popupElement.querySelector('.popup__form');
let nameInput = popupElement.querySelector('.popup__input_name_type');
let jobInput = popupElement.querySelector('.popup__input_job_type');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  openPopup();
  closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);

