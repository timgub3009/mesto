export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._name = name;
    this._description = description;
    this._avatar = avatar;
  }
  //забрать инфу профиля (которая уже есть)
  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }
  //заполнить поля профиля введенной информацией
  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._description.textContent = userData.description;
    this.setUserAvatar(userData);
  }

  //установить аватарку
  setUserAvatar(userData) {
    this._avatar.src = userData.avatar;
  }
}
