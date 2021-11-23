import { logPlugin } from "@babel/preset-env/lib/debug.js"

export class Card {
  constructor({
    place,
    handleCardClick,
    handleLikeSet,
    handleLikeRemove,
    handleCardDelete
  }, templateClassName) {

    this._title = place.name
    this._image = place.link
    this._likes = place.likes
    this._cardId = place._id
    this._ownerId = place.owner._id
    this._handleCardClick = handleCardClick
    this._handleLikeSet = handleLikeSet
    this._handleLikeRemove = handleLikeRemove
    this._handleCardDelete = handleCardDelete
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

  assembleCard() {
    this._cardText.textContent = this._title
    this._cardImage.src = this._image
    this._cardImage.alt = `Фотография красивого места: ${this._title}`
    this._likeCounter.textContent = this._likes.length
    if (this._likes.length > 0) {
      this._likeButton.classList.add("like_active")
    }
    this._setEventListeners()
    return this._card
  }

  _handleLike() {
    if (this._likeButton.classList.contains("like_active")) {
      this._handleLikeRemove(this._cardId)
    } else {
      this._handleLikeSet(this._cardId)
    }
  }

  like({ likes }) {
    this._likeButton.classList.toggle("like_active")
    this._likeCounter.textContent = likes.length
  }

  _deletePlace() {
    this._card.remove()
    this._handleCardDelete()
  }

  _setEventListeners() {
    this._likeButton.addEventListener("mousedown", () => {
      this._handleLike()
    })
    this._deleteButton.addEventListener("mousedown", () => {
      this._deletePlace()
    })
    this._cardImage.addEventListener("mousedown", () => {
      this._handleCardClick()
    })
  }

}
