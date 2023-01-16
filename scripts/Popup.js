export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
      this.close(popupOpened);
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.close()
        }
        if (evt.target.classList.contains('popup__close-button')) {
          this.close()
        }
      })
    }
  }
