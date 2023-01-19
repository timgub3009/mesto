export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
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
  }

}
