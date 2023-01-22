import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formPopup = this._popup.querySelector('.popup__form');
    this._inputList = this._formPopup.querySelectorAll('.popup__input');
    this._handleFormSubmit = handleFormSubmit;
  }
  //вытащить данные инпутов
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  //метод для вставки данных в инпуты
  setInputValues(data) {
    this._inputList.forEach(input => { input.value = data[input.name] })
  }

  //навесить слушателей по клику на сабмит
  setEventListeners() {

    this._formPopup.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }

  close() {
    super.close();
    this._formPopup.reset();
  }
}



