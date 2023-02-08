export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButtonElement = this._form.querySelector(this._submitButtonSelector);
  }

  //валидация после сабмита
  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  //демонстрация ошибки в инпуте
  _showError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
  }

  //скрытие ошибки в инпуте
  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  //метод проверить валидность и показать/не показать ошибку
  _checkValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  };

  //метод для замены статуса кнопки
  _toggleButtonState(inputs, submitButtonElement) {
    if (inputs.some((input) => !input.validity.valid)) {
      submitButtonElement.classList.add(this._inactiveButtonClass);
      submitButtonElement.setAttribute('disabled', true);
    } else {
      submitButtonElement.classList.remove(this._inactiveButtonClass);
      submitButtonElement.removeAttribute('disabled');
    }
  };

  //рисет на форму и кнопку
  resetValidation() {
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      this._hideError(input);
    });
  }

  //слушатели валидности
  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidity(input);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  };
}
