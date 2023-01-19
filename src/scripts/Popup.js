export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
//открыть попап
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }
//закрыть попап
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }
//закрыть попап по клавишке
  _handleEscClose = (evt) => {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
      this.close(popupOpened);
    }
  }
//закрыть попап по клику вне области
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
