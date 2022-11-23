//array of cards to add
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//popups
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupCloseUp = document.querySelector('.popup_type_close-up');

//popups-buttons(open)
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

//popups-buttons(close)
const popupEditClose = popupEdit.querySelector('.popup__close-button');
const popupAddClose = popupAdd.querySelector('.popup__close-button');
const popupCloseUpClose = popupCloseUp.querySelector('.popup__close-button');

//popups-forms
const formPopupEdit = popupEdit.querySelector('.popup__form');
const formPopupAdd = popupAdd.querySelector('.popup__form');

//popups-inputs
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
const cardNameInput = popupAdd.querySelector('.popup__input_type_place');
const cardLinkInput = popupAdd.querySelector('.popup__input_type_link');
const cardName = popupAdd.querySelector('.elements__card-heading');

//likes
const likeButton = document.querySelectorAll('.elements__like-button');

//delete
const deleteButton = document.querySelectorAll('.elements__delete-button');

//popup-opener
const togglePopup = function(popup) {
  popup.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

//overlay clicking
const closePopupByClickOnOverlay = function(evt) {
  if (evt.target === evt.currentTarget)
  togglePopup(evt.target);
}

//likes counter
const likeCounter = function (evt) {
  evt.target.classList.toggle('elements__like-button_type_active');
}

//delete btn
const sendToTrash = function (evt) {
  evt.target.closest('.elements__card').remove();}

//submit
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupEdit);
}

//new cards to add
//const createCard = (data) => {
  // Клонируем шаблон, наполняем его информацией из объекта data, навешиваем всякие обработчики событий, о которых будет инфа ниже
  // Возвращаем получившуюся карточку
  //return cardElement;
//};
//initialCards.forEach(card => { renderCard(card); });

//listeners to open
popupOpenButton.addEventListener('click', function () {
  togglePopup(popupEdit)});
popupAddButton.addEventListener('click', function () {
  togglePopup(popupAdd)});

//listeners to close
popupEditClose.addEventListener('click', function () {
  togglePopup(popupEdit)});
popupAddClose.addEventListener('click', function () {
  togglePopup(popupAdd)});

//listener to submit
formPopupEdit.addEventListener('submit', formSubmitHandler);

//listener to overlay clicking
popupEdit.addEventListener('click', closePopupByClickOnOverlay);
popupAdd.addEventListener('click', closePopupByClickOnOverlay);

//listener to likes
likeButton.forEach(function(like) {
  like.addEventListener('click', likeCounter);});

//listener to delete
deleteButton.forEach(function(button) {
  button.addEventListener('click', sendToTrash);});
