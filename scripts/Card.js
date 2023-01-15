export default class Card {
  constructor(item, template) {
    this._name = item.name;
    this._link = item.link;
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

    this._cardImage = this._element.querySelector('.elements__image');

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

  //setting eventlisteners on buttons
  _setEventListeners() {
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deleteButton = this._element.querySelector('.elements__delete-button');

    this._likeButton.addEventListener('click', (evt) => this._likeCounter(evt));
    this._deleteButton.addEventListener('click', (evt) => this._sendToTrash(evt));
  }
}
