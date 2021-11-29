import {Popup} from "./Popup.js"

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._boundGetInputValues = this._getInputValues.bind(this)
    this._boundSubmitHandler = this._submitHandler.bind(this)
    this._form = this._popupElement.querySelector(".modal__form")
    this._submitButton = this._form.querySelector(".modal__button")
    this._submitButtonDefaultText = this._submitButton.textContent
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
  
  togglePreloaderOnSubmit(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "⏳ Сохранение..."
    } else {
      this._submitButton.textContent = this._submitButtonDefaultText
    }
  }
  
  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener("submit", this._boundSubmitHandler)
  }
  
  close() {
    super.close()
    this._form.reset()
  }
}
