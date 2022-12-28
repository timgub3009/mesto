//popups
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupWindows = document.querySelectorAll('.popup');
const popupCloseUp = document.querySelector('.popup_type_closeup');

//image
const popupImage = popupCloseUp.querySelector('.popup__image');
const popupImageCaption = popupCloseUp.querySelector('.popup__figcaption');

//popups-buttons(open)
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');

//popups-inputs
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');

//submit
const submitAddButton = popupAdd.querySelector('.popup__submit-button');

//popup-open
const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', closePopupByEscape);
}

//popup-close
const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', closePopupByEscape);
}

//popup-close-by-esc
const closePopupByEscape = function (evt) {
    if (evt.key === 'Escape') {
        const popupIsActive = document.querySelector('.popup_opened');
        closePopup(popupIsActive);
    }
}

//reset submit button
const resetSubmitButton = (popup) => {
    if (popup === popupAdd) {
        submitAddButton.setAttribute('disabled', true);
        submitAddButton.classList.add('popup__submit-button_inactive');
    } else {
        submitAddButton.removeAttribute('disabled');
        submitAddButton.classList.remove('popup__submit-button_inactive');
    }
}

//listeners to open
popupOpenButton.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);
});
popupAddButton.addEventListener('click', function () {
    openPopup(popupAdd);
    resetSubmitButton(popupAdd);
});

//listeners to close
popupWindows.forEach((popupWindow) => {
    popupWindow.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popupWindow)
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popupWindow)
        }
    })
})

export { popupEdit, popupAdd, popupImage, popupImageCaption, openPopup, nameInput, jobInput, profileJob, profileName, closePopup };
