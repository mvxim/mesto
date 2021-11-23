export class Card {
  constructor({
    place,
    handleCardClick,
    handleCardLike,
    handleCardDelete
  }, templateClassName) {
    this._templateElementSelector = templateClassName
    this._cardElementSelector = ".gallery__item"
    this._card = this._getTemplateElement()
    this._title = place.name
    this._image = place.link
    this._likes = place.likes
    this._cardId = place.id
    this._handleCardClick = handleCardClick
    this._handleCardLike = handleCardLike
    this._handleCardDelete = handleCardDelete
    this._boundHandleCardLike = this._handleCardClick.bind(this)
    this._boundHandleCardDelete = this._handleCardDelete.bind(this)
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
    this._handleCardLike(this._boundHandleCardLike)
  }

  _deletePlace() {
    this._card.remove()
    this._handleCardDelete(this._boundHandleCardDelete)
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
