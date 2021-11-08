export class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._userName = document.querySelector(nameSelector)
    this._userInfo = document.querySelector(infoSelector)
  }

  getUserInfo() {
    const userInfoData = {}
    userInfoData["name"] = this._userName.textContent
    userInfoData["info"] = this._userInfo.textContent
    return userInfoData
  }

  setUserInfo(data) {
    this._userName.textContent = data["bio-field-name"]
    this._userInfo.textContent = data["bio-field-desc"]
  }
}
