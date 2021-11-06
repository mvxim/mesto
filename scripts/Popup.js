import { page } from '../utils/constants.js'

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector)
    this.__boundHandleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popupElement.classList.add('modal_active')
    page.classList.add("page_no-scroll")

  }

  close() {
    this._popupElement.classList.remove('modal_active')
    page.classList.remove("page_no-scroll")
    document.removeEventListener('keydown', this.__boundHandleEscClose)
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close()
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', e => {
      if (e.target.classList.contains("modal") ||
        e.target.classList.contains("modal__close-btn")) {
        this.close()
      }
    })

    document.addEventListener('keydown', this.__boundHandleEscClose)
  }
}
