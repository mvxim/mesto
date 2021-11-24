export class Card {
  constructor({
    place,
    userId,
    cardClickCallback,
    likeSetCallback,
    likeRemoveCallback,
    cardDeleteCallback
  }, templateClassName) {

    this._userId = userId
    this._title = place.name
    this._image = place.link
    this._likes = place.likes
    this._placeId = place._id
    this._placeOwnerId = place.owner._id
    this._cardClickCallback = cardClickCallback
    this._likeSetCallback = likeSetCallback
    this._likeRemoveCallback = likeRemoveCallback
    this._cardDeleteCallback = cardDeleteCallback
    this._templateElementSelector = templateClassName

    this._cardElementSelector = ".gallery__item"
    this._card = this._getTemplateElement()
    this._cardText = this._card.querySelector(".gallery__text")
    this._cardImage = this._card.querySelector(".gallery__image")
    this._likeButton = this._card.querySelector(".like")
    this._likeCounter = this._card.querySelector(".gallery__like-btn-counter")
    this._deleteButton = this._card.querySelector(".delete")

  }

  _getTemplateElement() {
    return document.querySelector(this._templateElementSelector).content.querySelector(this._cardElementSelector).cloneNode(true)
  }

  _isLiked() { // проверяет, есть ли в массиве лайков — мой, возвращает булево
    return this._likes.some(like => like._id === this._userId)
  }

  assembleCard() {
    this._cardText.textContent = this._title
    this._cardImage.src = this._image
    this._cardImage.alt = `Фотография красивого места: ${this._title}`
    if (this._isLiked()) {
      this._likeButton.classList.add("like_active")
    }
    if (this._userId !== this._placeOwnerId) {
      this._deleteButton.classList.add("delete_hidden")
    }
    this._likeCounter.textContent = this._likes.length
    this._setEventListeners()
    return this._card
  }

  _handleLike() {
    if (this._isLiked()) {
      this._likeRemoveCallback(this._placeId)
    } else {
      this._likeSetCallback(this._placeId)
    }
  }

  like(likeData) {
    this._likes = likeData.likes
    this._likeCounter.textContent = likeData.likes.length
    this._likeButton.classList.toggle("like_active")
  }

  removePlace() {
    this._card.remove()
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike()
    })
    this._deleteButton.addEventListener("click", () => {
      this._cardDeleteCallback(this._placeId)
    })
    this._cardImage.addEventListener("click", () => {
      this._cardClickCallback()
    })
  }

}
