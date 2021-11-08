export class Card {
  constructor({ data, handleCardClick }, templateClassName) {
    this._templateElement = templateClassName
    this._cardElement = ".gallery__item"
    this._title = data.name
    this._image = data.link
    this._handleCardClick = handleCardClick
  }

  _getTemplateElement() {
    return document
        .querySelector(this._templateElement)
        .content
        .querySelector(this._cardElement).cloneNode(true)
  }

  assembleCard() {
    this._card = this._getTemplateElement()
    this._setEventListeners()
    this._card.querySelector(".gallery__text").textContent = this._title
    this._card.querySelector(".gallery__image").src = this._image
    this._card.querySelector(".gallery__image").alt = this._title
    return this._card
  }

  _setLike() {
    this._card.querySelector(".like")
        .classList.toggle("like_active")
  }

  _deletePlace() {
    this._card.remove()
  }

  _setEventListeners() {
    this._card.querySelector(".like")
        .addEventListener("mousedown", () => {
          this._setLike()
        })
    this._card.querySelector(".delete")
        .addEventListener("mousedown", () => {
          this._deletePlace()
        })
    this._card.querySelector(".gallery__image")
        .addEventListener("mousedown", () => {
          this._handleCardClick()
        })
  }
}
