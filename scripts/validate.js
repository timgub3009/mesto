const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
};

const enableValidation = (validationObject) => {
  const forms = Array.from(document.querySelectorAll(validationObject.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault());
    setEventListeners(form, validationObject.inputSelector, validationObject.errorClass, validationObject.inputErrorClass, validationObject.submitButtonSelector, validationObject.inactiveButtonClass);
  });
};

const showError = (form, input, errorClass, inputErrorClass) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = input.validationMessage;
};

const hideError = (form, input, errorClass, inputErrorClass) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkValidity = (form, input, errorClass, inputErrorClass) => {
  if (!input.validity.valid) {
    showError(form, input, errorClass, inputErrorClass);
  } else {
    hideError(form, input, errorClass, inputErrorClass);
  }
};

const toggleButtonState = (inputs, submitButtonElement, inactiveButtonClass) => {
  if (inputs.some((input) => !input.validity.valid)) {
    submitButtonElement.classList.add(inactiveButtonClass);
  } else {
    submitButtonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (form, inputSelector, errorClass, inputErrorClass, submitButtonSelector, inactiveButtonClass) => {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const submitButtonElement = form.querySelector(submitButtonSelector);
  inputs.forEach((input) => {
    input.addEventListener('input', evt => {
      checkValidity(form, input, errorClass, inputErrorClass);
      toggleButtonState(inputs, submitButtonElement, inactiveButtonClass);
    });
  });
  toggleButtonState(inputs, submitButtonElement, inactiveButtonClass);
};

enableValidation(validationObject);
