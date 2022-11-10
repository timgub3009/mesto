const popupElement = document.querySelector('.popup');
const popupCloseBtnElement = popupElement.querySelector('.popup__close-button');
const popupOpenBtnElement = document.querySelector('.profile__edit-button');

const openPopup = function(event) {
  popupElement.classList.add('popup_is-on');
}

const closePopup = function() {
  popupElement.classList.remove('popup_is-on');
}

popupCloseBtnElement.addEventListener('click', closePopup);
popupOpenBtnElement.addEventListener('click', openPopup);

let formElement = popupElement.querySelector('.popup__form')
let nameInput = popupElement.querySelector('.popup__input_name_type');
let jobInput = popupElement.querySelector('.popup__input_job_type');

function formSubmitHandler (evt) {
    evt.preventDefault();

nameInput.textContent = nameInput.value;
jobInput.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

console.log(formElement);
