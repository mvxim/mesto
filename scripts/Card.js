import { openModal } from './index.js'

class Card {
  constructor(data, templateClassName) {
    this._templateElement = templateClassName
    this._cardElement = '.gallery__item'
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
    this._card.querySelector('.gallery__text').textContent = this._title
    this._card.querySelector('.gallery__image').src = this._image
    this._card.querySelector('.gallery__image').alt = this._title
    return this._card
  }

  _setLike() {
    this._card.querySelector('.like')
      .classList.toggle('like_active')
  }

  _deletePlace() {
    document.querySelector('.gallery__item').remove()
  }

  _maximizePlaceImage() {
    const maxModal = document.querySelector('.modal_type_picture')
    const maxModalPicture = maxModal.querySelector('.modal__image')
    const maxModalCaption = maxModal.querySelector('.modal__caption')
    maxModalPicture.src = this._image
    maxModalPicture.alt = `Фотография места. Название: ${this._title}`
    maxModalCaption.textContent = this._title
    openModal(maxModal)
  }

  _setEventListeners() {
    this._card.querySelector('.like')
      .addEventListener('mousedown', () => {
        this._setLike()
      })
    this._card.querySelector('.delete')
      .addEventListener('mousedown', () => {
        this._deletePlace()
      })
    this._card.querySelector('.gallery__image')
      .addEventListener('mousedown', () => {
        this._maximizePlaceImage()
      })
  }
}

export { Card }
