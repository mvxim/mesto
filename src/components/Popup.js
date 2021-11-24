import { page } from "../utils/constants.js"

export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector)
    this._boundHandleEscClose = this._handleEscClose.bind(this)
    this._boundHandleClickClose = this._handleClickClose.bind(this)
  }

  open() {
    document.addEventListener("keydown", this._boundHandleEscClose)
    this._popupElement.classList.add("modal_active")
    page.classList.add("page_no-scroll")
  }

  close() {
    document.removeEventListener("keydown", this._boundHandleEscClose)
    this._popupElement.classList.remove("modal_active")
    page.classList.remove("page_no-scroll")
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close()
    }
  }

  _handleClickClose(e) {
    if (e.target.classList.contains("modal") ||
      e.target.classList.contains("modal__close-btn")) {
      this.close()
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", this._boundHandleClickClose)
  }
}
