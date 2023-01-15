import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupImageCaption) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupImageCaption = popupImageCaption;
  }

  open(alt, src) {
    super.open();
    popupImage.alt = alt;
    popupImage.src = src;
    popupImageCaption.textContent = alt;
  }
}
