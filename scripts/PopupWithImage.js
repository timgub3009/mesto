import Popup from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupImageCaption) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupImageCaption = popupImageCaption;
  }

  open(evt) {
    super.open();
    popupImage.alt = evt.target.alt;
    popupImage.src = evt.target.src;
    popupImageCaption.textContent = evt.target.alt;
  }
}
