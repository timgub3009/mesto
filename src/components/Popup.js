export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }
  //открыть попап
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }
  //закрыть попап
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }
  //закрыть попап по клавишке
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  //закрыть попап по клику вне области
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__close-button')) {
        this.close()
      }
    })
  }
}
