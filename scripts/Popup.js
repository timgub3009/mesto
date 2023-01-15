export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose(evt));
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose(evt));
  }

  _handleEscClose() {
    if (evt.key === 'Escape') {
      // const popupOpened = document.querySelector('.popup_opened');
      this.close();
    }
  }

  //todo: работать с одним попапом  (убрать forEach, обращаться к себе через this)
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
