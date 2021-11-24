import { Popup } from "./Popup.js"

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this._popupElement.querySelector(".modal__form")
    this._submitButton = this._form.querySelector(".modal__button")
    this._submitButtonDefaultText = this._submitButton.textContent
    this._boundSubmitHandler = this._submitHandler.bind(this)
  }

  onSubmit(confirmCallback) {
    this._confirmCallback = confirmCallback
  }

  _submitHandler(e) {
    e.preventDefault()
    this._confirmCallback()
  }

  togglePreloaderOnSubmit(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "⏳ Удаление..."
    } else {
      this._submitButton.textContent = this._submitButtonDefaultText
    }
  }

  close() {
    super.close()
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener("submit", this._boundSubmitHandler)
  }
}
