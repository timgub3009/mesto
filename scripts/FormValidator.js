class FormValidator {
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

  //validation method (not private)
  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setEventListeners();
  }

  //method for showing errors
  _showError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = input.validationMessage;
  }

  //method for hiding errors
  _hideError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  //method for checking inputs whether it's ok or not
  _checkValidity(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  };

  //method for changing status of the button
  _toggleButtonState(inputs, submitButtonElement) {
    if (inputs.some((input) => !input.validity.valid)) {
      submitButtonElement.classList.add(this._inactiveButtonClass);
      submitButtonElement.setAttribute('disabled', true);
    } else {
      submitButtonElement.classList.remove(this._inactiveButtonClass);
      submitButtonElement.removeAttribute('disabled');
    }
  };

//reset submit button
disableSubmitButton = (popup) => {
  if (popup === popupAdd) {
    submitAddButton.setAttribute('disabled', true);
    submitAddButton.classList.add('popup__submit-button_inactive');
  } else {
    submitAddButton.removeAttribute('disabled');
    submitAddButton.classList.remove('popup__submit-button_inactive');
  }
}

  //setting event listeners in one method (checkvalidity + button state)
  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidity(input);
        this._toggleButtonState(this._inputs, this._submitButtonElement);
      });
    });
    this._toggleButtonState(this._inputs, this._submitButtonElement);
  };
}

export { FormValidator };
