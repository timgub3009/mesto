
//импорты классов + карточек
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js'
import { popupEdit, popupAdd, popupZoomImage, popupConfirmRemoval, popupChangeAvatar, profileName, profileJob, profileAvatar, popupEditButton, popupAddButton, cardsContainer, cardTemplate, validationConfig, popupChangeAvatarButton, likeButton, deleteButton, likeCounter } from '../utils/constants.js';

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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, imageData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsPack.renderAllItems(imageData);
  })

  let userId;

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

//создание экземпляра Section
const cardsPack = new Section((item) => createCard(item), cardsContainer);

//создание карточки
const createCard = (item) => {
  const card = new Card({
    data: item,

    handleCardClick: () => {
      popupWithImage.open(item.name, item.link);
    },

    handleLikeClick: (id)  =>   {
      if (card.hasLike()) {
      api
        .removeLike(id)
        .then((item) => {
          card.updateCount(item);
          card.countLikes();
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      api
        .setLike(id)
        .then((item) => {
          card.updateCount(item);
          card.countLikes();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },

    handleDeleteIconClick: (id) => {
      popupWithConfirmation.confirmDeleting(() => {
        popupWithConfirmation.renderLoading(true);
        api
        .deleteCard(id)
        .then(() => {
          card.sendToTrash();
          popupWithConfirmation.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => popupWithConfirmation.renderLoading(false))
      });
      popupWithConfirmation.open();
    },
  },

  cardTemplate,

  userId

  );
  return card.generateCard();
}

//профиль пользователя
const userInfo = new UserInfo({
  name: profileName,
  about: profileJob,
  avatar: profileAvatar
});

//форма редактирования профиля пользователя
const editProfile = new PopupWithForm(popupEdit, (item) => {
  editProfile.renderLoading(true);
  api
    .editProfile(item)
    .then((userData) => {
      userInfo.setUserInfo(userData);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfile.renderLoading(false);
    })
    editProfile.close();
})

//форма добавления карточки
const addCard = new PopupWithForm(popupAdd, (item) => {
  addCard.renderLoading(true);
  api
    .addCard(item)
    .then((item) => {
      cardsPack.addItem(item);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCard.renderLoading(false);
    })
    addCard.close();
});

//форма работы с аватаркой
const changeAvatar = new PopupWithForm(popupChangeAvatar, (item) => {
  changeAvatar.renderLoading(true);
  api
    .changeAvatar(item)
    .then((userData) => {
      userInfo.setUserAvatar(userData);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      changeAvatar.renderLoading(false);
    })
    changeAvatar.close();
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
