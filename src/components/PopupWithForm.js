import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formPopup = this._popup.querySelector('.popup__form');
    this._inputList = this._formPopup.querySelectorAll('.popup__input');
    this._handleFormSubmit = handleFormSubmit;
    this._popupButton = this._formPopup.querySelector('.popup__submit-button');
    this._popupButtonText = this._popupButton.textContent;
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

  //закрыть с очисткой формы
  close() {
    super.close();
    this._formPopup.reset();
  }

  //статус загрузки
  renderLoading(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = 'Сохранение...';
    }
    else {
      this._popupButton.textContent = this._popupButtonText;
    }
  }
}



