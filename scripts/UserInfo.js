export class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userDescription: this._description.textContent
    }
  }

  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput.value;
    this._description.textContent = jobInput.value;
  }

}
