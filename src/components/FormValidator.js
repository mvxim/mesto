import { formConfig } from "../utils/constants.js"

class FormValidator {
  constructor(form, formConfig) {
    this._formElement = form
    this._modalElement = form.closest(formConfig.modalSelector)
    this._formInputElements =
        Array.from(form.querySelectorAll(formConfig.inputSelector))
    this._formSubmitButtonElement =
        this._formElement.querySelector(formConfig.submitButtonSelector)
  }

  _showInputError(inputElement, errorMessage) {
    const errorTextElement = this._formElement.querySelector(`.modal__error_${inputElement.id}`)
    inputElement.classList.add(formConfig.inputErrorSelector)
    errorTextElement.textContent = errorMessage
  }

  _hideInputError(inputElement) {
    const errorTextElement = this._formElement.querySelector(`.modal__error_${inputElement.id}`)
    inputElement.classList.remove(formConfig.inputErrorSelector)
    errorTextElement.textContent = ""
  }

  resetForm() {
    this._formInputElements.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
    this._formElement.reset()
  }

  disableButton() {
    this._formSubmitButtonElement.classList.add(formConfig.inactiveButtonSelector)
    this._formSubmitButtonElement.disabled = true
  }

  enableButton() {
    this._formSubmitButtonElement.classList.remove(formConfig.inactiveButtonSelector)
    this._formSubmitButtonElement.disabled = false
  }

  _hasInvalidInput() {
    return this._formInputElements.some((inputElement) => {
      return !inputElement.validity.valid || inputElement.value === ""
    })
  }

  _toggleButtonState() {
    this._hasInvalidInput() ? this.disableButton() : this.enableButton()
  }

  _checkInputValidity(inputElement) {
    inputElement.validity.valid ?
        this._hideInputError(inputElement) : this._showInputError(inputElement,
            inputElement.validationMessage)

  }

  _setEventListeners() {
    this._formInputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault()
      this._formInputElements.forEach((inputElement) => {
        this._hideInputError(inputElement)
      })
      this.disableButton()
    })
    this.disableButton()
    this._setEventListeners()
  }
}

export { formConfig, FormValidator }
