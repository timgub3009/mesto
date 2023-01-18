import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = popupSelector.querySelector('.popup__image');
    this._popupImageCaption = popupSelector.querySelector('.popup__figcaption');
  }

  open(name, link) {
    super.open();
    this._popupImage.alt = name;
    this._popupImage.src = link;
    this._popupImageCaption.textContent = name;
  }
}
