import { Popup } from "./Popup.js"

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this._popupElement.querySelector(".modal__form")
    this._submitButton = this._form.querySelector(".modal__button")
    this._submitButtonDefaultText = this._submitButton.textContent
  }

  onSubmit(confirmCallback) {
    this._confirmCallback = confirmCallback
  }

  togglePreloaderOnSubmit(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "⏳ Удаление..."
    } else {
      this._submitButton.textContent = this._submitButtonDefaultText
    }
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener("submit", (e) => {
      e.preventDefault()
      this._confirmCallback()
    })
  }
}
