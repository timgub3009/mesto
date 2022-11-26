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
const popupCloseUp = document.querySelector('.popup_type_closeup');

//popups-buttons(open)
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

//popups-buttons(close)
const popupEditClose = popupEdit.querySelector('.popup__close-button');
const popupAddClose = popupAdd.querySelector('.popup__close-button');
const imageClose = popupCloseUp.querySelector('.popup__close-button');

//popups-forms
const formPopupEdit = popupEdit.querySelector('.popup__form');
const formPopupAdd = popupAdd.querySelector('.popup__form');

//popups-inputs
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
const cardName = popupAdd.querySelector('.elements__card-heading');
const popupImage = popupCloseUp.querySelector('.popup__image');
const popupImageCaption = popupCloseUp.querySelector('.popup__figcaption');

//likes
const likeButton = document.querySelectorAll('.elements__like-button');

//delete
const deleteButton = document.querySelectorAll('.elements__delete-button');

//card container
const cardsContainer = document.querySelector('.elements__table');
const cardsImage = document.querySelectorAll('.elements__image');

//popup-opener
const togglePopup = function (popup) {
  popup.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

//overlay clicking
const closePopupByClickOnOverlay = function (evt) {
  if (evt.target === evt.currentTarget)
    togglePopup(evt.target);
}

//likes counter
const likeCounter = function (evt) {
  evt.target.classList.toggle('elements__like-button_type_active');
}

//delete btn
const sendToTrash = function (evt) {
  evt.target.closest('.elements__card').remove();
}

//closeup
const closeUpPopup = function (evt) {
  if (evt.target === evt.currentTarget)
    togglePopup(popupCloseUp);
  popupImage.alt = evt.target.alt;
  popupImage.src = evt.target.src;
  popupImageCaption.textContent = evt.target.alt;
}

//new cards to add
const createCard = function (item) {
  const cardTemplate = document.querySelector('.elements-template').content;
  const createCardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);

  createCardElement.querySelector('.elements__image').alt = item.name;
  createCardElement.querySelector('.elements__image').src = item.link;
  createCardElement.querySelector('.elements__card-heading').textContent = item.name;

  const likeButton = createCardElement.querySelector('.elements__like-button');
  const deleteButton = createCardElement.querySelector('.elements__delete-button');
  const cardsImage = createCardElement.querySelector('.elements__image');

  const sendToTrash = function (evt) {
    evt.target.closest('.elements__card').remove();
  }

  const likeCounter = function (evt) {
    evt.target.classList.toggle('elements__like-button_type_active');
  }

  const closeUpPopup = function (evt) {
    if (evt.target === evt.currentTarget)
      togglePopup(popupCloseUp);
    popupImage.alt = evt.target.alt;
    popupImage.src = evt.target.src;
    popupImageCaption.textContent = evt.target.alt;
  }

  likeButton.addEventListener('click', likeCounter);

  deleteButton.addEventListener('click', sendToTrash);

  cardsImage.addEventListener('click', closeUpPopup);

  cardsContainer.prepend(createCardElement);
}

//submit for profile
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popupEdit);
}

//submit for adding images
function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const cardNameInput = popupAdd.querySelector('.popup__input_type_place');
  const cardLinkInput = popupAdd.querySelector('.popup__input_type_link');

  createCard(cardNameInput.value, cardLinkInput.value);

  cardNameInput.value = "";
  cardLinkInput.value = "";

  togglePopup(popupAdd);
}

initialCards.forEach(function (card) {
  createCard(card);
});

//listeners to open
popupOpenButton.addEventListener('click', function () {
  togglePopup(popupEdit)
});
popupAddButton.addEventListener('click', function () {
  togglePopup(popupAdd)
});

//listeners to close
popupEditClose.addEventListener('click', function () {
  togglePopup(popupEdit)
});
popupAddClose.addEventListener('click', function () {
  togglePopup(popupAdd)
});
imageClose.addEventListener('click', function () {
  togglePopup(popupCloseUp)
});

//listener to submit
formPopupEdit.addEventListener('submit', formSubmitHandler);
formPopupAdd.addEventListener('submit', formAddSubmitHandler);

//listener to overlay clicking
popupEdit.addEventListener('click', closePopupByClickOnOverlay);
popupAdd.addEventListener('click', closePopupByClickOnOverlay);
popupCloseUp.addEventListener('click', closePopupByClickOnOverlay);

//listener to likes
likeButton.forEach(function (like) {
  like.addEventListener('click', likeCounter);
});

//listener to delete
deleteButton.forEach(function (button) {
  button.addEventListener('click', sendToTrash);
});

//listener to closeup
cardsImage.forEach(function (image) {
  image.addEventListener('click', closeUpPopup);
});
