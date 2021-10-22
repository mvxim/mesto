export const formConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_disabled',
  inputErrorClass: 'modal__input_error',
}

// подставляет текст ошибки и окрашивает поле в красный
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.modal__error_${inputElement.id}`)
  inputElement.classList.add(config.inputErrorClass)
  errorElement.textContent = errorMessage
}

// убирает текст ошибки и возвращает полю обычный цвет
export const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.modal__error_${inputElement.id}`)
  inputElement.classList.remove(config.inputErrorClass)
  errorElement.textContent = ''
}

// проверяет, можно ли отправлять форму или есть невалидные поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid || inputElement.value === ''
  })
}

const disableButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass)
  buttonElement.disabled = true
}

const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass)
  buttonElement.disabled = false
}

// блокирует кнопку, если в форме есть невалидные поля
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config)
  } else {
    enableButton(buttonElement, config)
  }
}

// управляет показом ошибок: если поле валидно, вызывает колбек, который показывает ошибку. Если нет — убирает
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config)
  } else {
    hideInputError(formElement, inputElement, config)
  }
}

// вешает на все инпуты листнер, который на каждый ввод будет выполнять действие
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  const buttonElement = formElement.querySelector(config.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, config)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config)
      toggleButtonState(inputList, buttonElement, config)
    })
  })
}

// ищет все формы на странице и отслеживает отправку, предотвращая стандартную
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault()
    })
    setEventListeners(formElement, config)
  })
}

// запускает валидацию для всех форм страницы
enableValidation(formConfig)
