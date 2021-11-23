import { Popup } from "./Popup.js"

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this._popupElement.querySelector(".modal__form")
    this._boundOnSubmitAction = this.setOnSubmitAction.bind(this)
  }

  setOnSubmitAction(callback) {
    return callback
  }

  setEventListeners(e) {
    super.setEventListeners()
    this._form.addEventListener("submit", (e) => {
      e.preventDefault()
      this._boundOnSubmitAction()
    })
  }
}
