import { popupImage, popupImageCaption, openPopup, popupZoomImage } from './utils.js'

class Card {
  constructor(imageObject, template) {
    this._name = imageObject.name;
    this._link = imageObject.link;
    this._templateSelector = template;
  }

  //get template
  _getTemplate() {
    const cardElement = this._templateSelector.querySelector('.elements__card').cloneNode(true);
    return cardElement;
  }
  //creation of the card on the basis of template
  _generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._element.querySelector('.elements__card-heading').textContent = this._name;

    return this._element;
  }
  //all three methods (likes, deletions, closeups)
  _likeCounter = function (evt) {
    evt.target.classList.toggle('elements__like-button_type_active');
  }

  _sendToTrash = function (evt) {
    evt.target.closest('.elements__card').remove();
  }

  _closeUpPopup = function (evt) {
      popupImage.alt = evt.target.alt;
    popupImage.src = evt.target.src;
    popupImageCaption.textContent = evt.target.alt;
    openPopup(popupZoomImage);
  }

  //setting eventlisteners on buttons
  _setEventListeners() {
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    this._cardImage = this._element.querySelector('.elements__image');

    this._likeButton.addEventListener('click', (evt) => this._likeCounter(evt));
    this._deleteButton.addEventListener('click', (evt) => this._sendToTrash(evt));
    this._cardImage.addEventListener('click', (evt) => this._closeUpPopup(evt));
  }

}

export { Card };
