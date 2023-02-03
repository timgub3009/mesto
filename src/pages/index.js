
//импорты классов + карточек
import Card from '../components/Card.js';
import initialCards from '../utils/data.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js'
import { popupEdit, popupAdd, popupZoomImage, popupConfirmRemoval, popupChangeAvatar, profileName, profileJob, profileAvatar, popupEditButton, popupAddButton, cardsContainer, cardTemplate, validationConfig, popupChangeAvatarButton } from '../utils/constants.js';

//подключение api
const api = new Api(
  {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59/',
    headers:
    {
      authorization: '3a443d02-de36-4341-a0dd-9ea01aaea487',
      'Content-Type': 'application/json'
    }
  }
)

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, imageData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;

    cardsPack.renderAllItems(imageData);
  })

// включение валидации (универсальное)
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

//создание класса увеличения карточки по клику
const popupWithImage = new PopupWithImage(popupZoomImage);

//слушатели к классу увеличения карточки по клику
popupWithImage.setEventListeners();

//создание класса подтверждения удаления карточки
const popupWithConfirmation = new PopupWithConfirmation(popupConfirmRemoval);

//слушатели к нему
popupWithConfirmation.setEventListeners();

//создание экземпляра Section (создание Card после изменений в Section перенесено сюда)
const cardsPack = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(

      item,

      () => {
        popupWithImage.open(item.name, item.link);
      },

      () => {
        if (!card.hasLike()) {
          api
            .putLike(item._id)
            .then((item) => {
              card.countLikes();
              card.updateCount(item);
            })
            .catch((err) => {
              console.log(err);
            })
        }
        else {
          api
            .removeLike(item._id)
            .then((item) => {
              card.countLikes();
              card.updateCount(item);
            })
            .catch((err) => {
              console.log(err);
            })
        }
      },

      () => {
        popupWithConfirmation.confirmDeleting(() => {
          popupWithConfirmation.renderLoading(true);
          api
            .deleteCard(item._id)
            .then(() => {
              card.sendToTrash();
              popupWithConfirmation.close();
            })
            .catch((err) => {
              console.log(err);
            })
        })
      },
      cardTemplate);
    return card.generateCard();
  }
}, cardsContainer);

//профиль пользователя
const userInfo = new UserInfo({
  name: profileName,
  description: profileJob,
  avatar: profileAvatar
});

//форма редактирования профиля пользователя
const editProfile = new PopupWithForm(popupEdit, (userData) => {
  popupEdit.renderLoading(true);
  api
    .editProfile(userData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch((err) => {
      console.log(err);
    })
})

//форма добавления карточки
const addCard = new PopupWithForm(popupAdd, (imageData) => {
  addCard.renderLoading(true);
  api
    .addCard(imageData)
    .then((imageData) => {
      cardsPack.addItem(imageData);
    })
    .catch((err) => {
      console.log(err);
    })
});

//форма работы с аватаркой
const changeAvatar = new PopupWithForm(popupChangeAvatar, (userData) => {
  popupChangeAvatar.renderLoading(true);
  api
    .changeAvatar(userData)
    .then((userData) => {
      userInfo.setUserAvatar(userData);
    })
    .catch((err) => {
      console.log(err);
    })
});

//обработчики к новой карточке
addCard.setEventListeners();

//слушатель к кнопке для редактирования профиля
popupEditButton.addEventListener('click', () => {
  editProfile.open();
  editProfile.setInputValues(userInfo.getUserInfo());
  formValidators['profile-form'].resetValidation();
});

//обработчики к классу профиля
editProfile.setEventListeners();

//слушатель к кнопке добавления карточки
popupAddButton.addEventListener('click', () => {
  formValidators['card-form'].resetValidation();
  addCard.open();
});

//обработчики к аватарке
changeAvatar.setEventListeners();

//слушатель к кнопке изменений аватарки
popupChangeAvatarButton.addEventListener('click', () => {
  changeAvatar.open();
  formValidators['avatar-form'].resetValidation();
});
