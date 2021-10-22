import {openModal} from './index.js'

const cardConfig = {
  templateElement: '.gallery__item-template',
  cardElement: '.gallery__item',
  titleElement: '.gallery__text',
  imageElement: '.gallery__image',
  deleteButtonElement: '.delete',
  likeButtonElement: '.like',
}

class Card {
  constructor(data, cardConfig) {
    this._templateElement = cardConfig.templateElement
    this._cardElement = cardConfig.cardElement
    this._title = data.name
    this._image = data.link
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
    this._card.querySelector(cardConfig.titleElement).textContent = this._title
    this._card.querySelector(cardConfig.imageElement).src = this._image
    this._card.querySelector(cardConfig.imageElement).alt = this._title
    return this._card
  }

  _setLike() {
    this._card.querySelector(cardConfig.likeButtonElement)
    .classList.toggle('like_active')
  }

  _deletePlace() {
    document.querySelector(cardConfig.cardElement).remove()
  }

  _maximizePlaceImage() {
    const maxModal = document.querySelector('.modal_type_picture')
    const maxModalPicture = maxModal.querySelector('.modal__image')
    const maxModalCaption = maxModal.querySelector('.modal__caption')
    maxModalPicture.src = this._image
    maxModalCaption.textContent = this._title
    openModal(maxModal)
    console.log('Success')
  }

  _setEventListeners() {
    this._card.querySelector(cardConfig.likeButtonElement)
    .addEventListener('mousedown', () => {
      this._setLike()
    })
    this._card.querySelector(cardConfig.deleteButtonElement)
    .addEventListener('mousedown', () => {
      this._deletePlace()
    })
    this._card.querySelector(cardConfig.imageElement)
    .addEventListener('mousedown', () => {
      this._maximizePlaceImage()
    })
  }
}

export {cardConfig, Card}