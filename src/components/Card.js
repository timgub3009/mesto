export default class Card {
  constructor(
    {
      data,
      handleCardClick,
      handleLikeClick,
      handleDeleteIconClick
    },
    template,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._template = template;

  }

  //забрать шаблон
  _getTemplate() {
    const cardElement = this._template.querySelector('.elements__card').cloneNode(true);
    return cardElement;
  }

  sendToTrash() {
    this._element.closest('.elements__card').remove();
  }

  //создание карточки (добавлены лайки)
  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._element.querySelector('.elements__card-heading').textContent = this._name;

    this.removeDeleteButton();

    this.countLikes();

    return this._element;
  }

  //метод удаления "удаления"
  removeDeleteButton() {
    if (this._ownerId != this._userId) {
    this._deleteButton.removeEventListener('click', () => this._handleDeleteIconClick());
    this._deleteButton.style.display = 'none';
  }
}

  //обновление полученных данных по лайкам
  updateCount(updatedData) {
    this._likes = updatedData.likes;
    this._element.querySelector('.elements__like-counter').textContent = this._likes.length;
  }

  //закрашивание лайка и счетчик
  countLikes() {
    if (this.hasLike()) {
      this._likeButton.classList.add('elements__like-button_type_active');
      this._element.querySelector('.elements__like-counter').textContent = this._likes.length;
    }
    else {
      this._likeButton.classList.remove('elements__like-button_type_active');
      this._element.querySelector('.elements__like-counter').textContent = this._likes.length;
    }
  }

  //проверить, есть ли уже лайк от указанного айди (пользователя) или нет
  hasLike() {
    return this._likes.find((like) => like._id === this._userId)
  }

  //слушатели к карточкам
  _setEventListeners() {
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    this._cardImage = this._element.querySelector('.elements__image');

    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._cardId));
    this._deleteButton.addEventListener('click', () => this._handleDeleteIconClick(this._cardId));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
}
