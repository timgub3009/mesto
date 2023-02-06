import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._formPopup = this._popup.querySelector('.popup__form');
    this._popupButton = this._formPopup.querySelector('.popup__submit-button');
    this._popupButtonText = this._popupButton.textContent;
  }

  //статус загрузки
  renderLoading(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = 'Удаление...';
    }
    else {
      this._popupButton.textContent = this._popupButtonText;
    }
  }
  //колбэк для удаления
  confirmDeleting(confirm) {
    this._handleConfirmation = confirm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleConfirmation();
    })

  }
}
