import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._form = this._popupElement.querySelector(".modal__form")
    this._handleFormSubmit = handleFormSubmit
    this._boundGetInputValues = this._getInputValues.bind(this)
    this._boundSubmitHandler = this._submitHandler.bind(this)

  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(".modal__input")
    this._formValues = {}
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }

  _submitHandler(e) {
    e.preventDefault()
    this._handleFormSubmit(this._boundGetInputValues())
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener("submit", this._boundSubmitHandler)
  }

  close() {
    this._form.reset()
    this._form.removeEventListener("submit", this._boundSubmitHandler)
    super.close()
  }
}
