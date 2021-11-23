export class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl
    this._headers = headers
  }

  _onResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`>>> Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this._url}users/me/`, {
      method:  "GET",
      headers: this._headers
    }).then(this._onResponse)
  }

  setUserInfo(userInfo) {
    return fetch(`${this._url}users/me/`, {
      method:  "PATCH",
      headers: this._headers,
      body:    JSON.stringify(
          {
            name:  userInfo["bio-field-name"],
            about: userInfo["bio-field-desc"],
          }
      )
    }).
        then(this._onResponse)
  }

  setUserAvatar(avatarLink) {
    return fetch(`${this._url}users/me/avatar/`, {
      method:  "PATCH",
      headers: this._headers,
      body:    JSON.stringify(
          {
            avatar: avatarLink
          }
      )
    }).
        then(this._onResponse)
  }
}
