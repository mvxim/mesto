export class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._userName = document.querySelector(nameSelector)
    this._userInfo = document.querySelector(infoSelector)
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    }
  }

  setUserInfo({ "bio-field-name": name, "bio-field-desc": info }) {
    this._userName.textContent = name
    this._userInfo.textContent = info
  }
}
