import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImage, popupImageCaption) {
    super(popupSelector);
    this._popupImage = popupImage;
    this._popupImageCaption = popupImageCaption;
  }

  open(title, link) {
    super.open();
    popupImage.alt = title;
    popupImage.src = link;
    popupImageCaption.textContent = title;
  }
}
