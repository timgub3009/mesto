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
const cardNameInput = popupAdd.querySelector('.popup__input_type_place');
const cardLinkInput = popupAdd.querySelector('.popup__input_type_link');

//card container
const cardsContainer = document.querySelector('.elements__table');

//template
const cardTemplate = document.querySelector('.elements-template').content;

//popup-open
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

//popup-close
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

//overlay clicking
const closePopupByClickOnOverlay = function (evt) {
  if (evt.target === evt.currentTarget)
    closePopup(evt.target);
}

//likes counter
const likeCounter = function (evt) {
  evt.target.classList.toggle('elements__like-button_type_active');
}

//delete btn
const sendToTrash = function (evt) {
  evt.target.closest('.elements__card').remove();
}

//closeup images
const closeUpPopup = function (evt) {
  if (evt.target === evt.currentTarget)
    popupImage.alt = evt.target.alt;
  popupImage.src = evt.target.src;
  popupImageCaption.textContent = evt.target.alt;
  openPopup(popupCloseUp);
}

//create a card
const createCard = function (data) {
  const createCardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const cardImage = createCardElement.querySelector('.elements__image');

  cardImage.alt = data.name;
  cardImage.src = data.link;
  createCardElement.querySelector('.elements__card-heading').textContent = data.name;

  const likeButton = createCardElement.querySelector('.elements__like-button');
  const deleteButton = createCardElement.querySelector('.elements__delete-button');

  likeButton.addEventListener('click', likeCounter);
  deleteButton.addEventListener('click', sendToTrash);
  cardImage.addEventListener('click', closeUpPopup);

  return createCardElement;
}

//add a card to the list
const renderCard = function (data) {
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
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

  renderCard(imageObject);
  closePopup(popupAdd);
  cardNameInput.value = "";
  cardLinkInput.value = "";
}

//listeners to open
popupOpenButton.addEventListener('click', function () {
  openPopup(popupEdit)
});
popupAddButton.addEventListener('click', function () {
  openPopup(popupAdd)
});

//listeners to close
popupEditClose.addEventListener('click', function () {
  closePopup(popupEdit)
});
popupAddClose.addEventListener('click', function () {
  closePopup(popupAdd)
});
imageClose.addEventListener('click', function () {
  closePopup(popupCloseUp)
});

//listener to submit
formPopupEdit.addEventListener('submit', submitProfileInfo);
formPopupAdd.addEventListener('submit', submitCardAdd);

//listener to overlay clicking
popupEdit.addEventListener('click', closePopupByClickOnOverlay);
popupAdd.addEventListener('click', closePopupByClickOnOverlay);
popupCloseUp.addEventListener('click', closePopupByClickOnOverlay);

initialCards.forEach(function (card) {
  renderCard(card);
});
