export default class Card {
  constructor(
    data,
    userId,
    ownerId,
    handleCardClick,
    handleLikeClick,
    handleDeleteIconClick,
    template
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = ownerId;
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

  //создание карточки (добавлены лайки)
  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._element.querySelector('.elements__card-heading').textContent = this._name;

    this.countLikes();

    this.removeDeleteBtn();

    return this._element;
  }

  //метод удаления "удаления"
  removeDeleteBtn() {
    this._trash = this._element.querySelector('.elements__delete-button');
    if (this._ownerId != this._userId) {
      this._trash.remove();
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
    }
    else {
      this._likeButton.classList.remove('elements__like-button_type_active');
    }
  }

  //проверить, есть ли уже лайк от указанного айди (пользователя) или нет
  hasLike() {
    return (this._likes || []).find((like) => like._id === this._userId)
  }

  //метод удаления карточки
  sendToTrash() {
    this._element.remove();
  }

  //слушатели к карточкам
  _setEventListeners() {
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    this._cardImage = this._element.querySelector('.elements__image');

    this._likeButton.addEventListener('click', () => this._handleLikeClick());
    this._deleteButton.addEventListener('click', () => this._handleDeleteIconClick());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
}
