export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }
  //забрать инфу профиля (которая уже есть)
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  //заполнить поля профиля введенной информацией
  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
    this.setUserAvatar(userData);
  }

  //установить аватарку
  setUserAvatar(userData) {
    this._avatar.src = userData.avatar;
  }
}
