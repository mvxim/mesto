import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._boundHandleFormSubmit = this._handleFormSubmit.bind(this)
    this._form = this._popupElement.querySelector('.modal__form')

  }

  _getInputValues() {
    // достаём все элементы полей
    this._inputList = this._element.querySelectorAll('.modal__input')

    // создаём пустой объект
    this._formValues = {}

    // добавляем в этот объект значения всех полей
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })

    // возвращаем объект значений
    return this._formValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._boundHandleFormSubmit)
  }

  close() {
    super.close()
    this._form.reset()
  }
}