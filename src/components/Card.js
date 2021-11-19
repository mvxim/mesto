export class Card {
  constructor({ data, handleCardClick, handleCardDelete }, templateClassName) {
    this._templateElementSelector = templateClassName
    this._cardElementSelector = ".gallery__item"
    this._card = this._getTemplateElement()
    this._title = data.name
    this._image = data.link
    this._handleCardClick = handleCardClick
    this._cardText = this._card.querySelector(".gallery__text")
    this._cardImage = this._card.querySelector(".gallery__image")
  }

  _getTemplateElement() {
    return document.querySelector(this._templateElementSelector).content.querySelector(this._cardElementSelector).cloneNode(true)
  }

  assembleCard() {
    this._cardText.textContent = this._title
    this._cardImage.src = this._image
    this._cardImage.alt = `Фотография красивого места: ${this._title}`
    this._setEventListeners()
    return this._card
  }

  _setLike() {
    this._card.querySelector(".like").classList.toggle("like_active")
  }

  _deletePlace() {
    this._card.remove()
  }

  _setEventListeners() {
    this._card.querySelector(".like").addEventListener("mousedown", () => {
      this._setLike()
    })
    this._card.querySelector(".delete").addEventListener("mousedown", () => {
      this._deletePlace()
    })
    this._card.querySelector(".gallery__image").addEventListener("mousedown", () => {
      this._handleCardClick()
    })
  }
}
