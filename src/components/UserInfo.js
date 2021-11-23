export class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector)
    this._userInfo = document.querySelector(infoSelector)
    this._userAvatar = document.querySelector(avatarSelector)
  }

  getUserInfoFromMarkup() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    }
  }

  setUserInfoToMarkup({ name, about }) {
    this._userName.textContent = name
    this._userInfo.textContent = about
  }

  setAvatarToMarkup({ avatar }) {
    this._userAvatar.src = avatar
  }
}
