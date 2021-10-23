import { Card } from './Card.js'
import { formConfig, FormValidator } from './FormValidator.js'

// Спасибо! ^^
const places = [
  {
    name: '💙 Зубчатки',
    link: 'https://res.cloudinary.com/mvxim/image/upload/v1633024288/1.jpg',
  },
  {
    name: '🗿 Курум',
    link: 'https://res.cloudinary.com/mvxim/image/upload/v1633024290/2.jpg',
  },
  {
    name: '🏝 Джабык',
    link: 'https://res.cloudinary.com/mvxim/image/upload/v1633024291/3.jpg',
  },
  {
    name: '🏞 Река Агидель',
    link: 'https://res.cloudinary.com/mvxim/image/upload/v1633024286/4.jpg',
  },
  {
    name: '🏔 Ямантау',
    link: 'https://res.cloudinary.com/mvxim/image/upload/v1633024286/5.jpg',
  },
  {
    name: '🌊 Тургояк',
    link: 'https://res.cloudinary.com/mvxim/image/upload/v1633024286/6.jpg',
  },
]


// Страница
const page = document.querySelector('.page')

// Галерея
const gallery = document.querySelector('.gallery__grid')
const galleryItemTemplate = '.gallery__item-template'

// Имя и описание
const profileName = document.querySelector('.profile__name')
const profileDesc = document.querySelector('.profile__desc')

// Фон модалок
const modals = document.querySelectorAll('.modal')

// Редактирование био
const formBioElement = document.querySelector('.modal_type_bio')
const nameInput = formBioElement.querySelector('.modal__input_field_name')
const descInput = formBioElement.querySelector('.modal__input_field_desc')

// Добавление карточки
const formCardElement = document.querySelector('.modal_type_card')
const titleInput = formCardElement.querySelector('.modal__input_field_title')
const pictureInput = formCardElement.querySelector('.modal__input_field_picture')

// Кнопки
const profileEditBtn = document.querySelector('.profile__edit-btn')
const addNewPictureBtn = document.querySelector('.profile__add-btn')

// собирает и добавляет карточки на страницу
const injectPlace = (item) => {
  const newPlace = new Card(item, galleryItemTemplate)
  const newPlaceElement = newPlace.assembleCard()
  gallery.prepend(newPlaceElement)
}

places.forEach(injectPlace) //


// открывает модальные окна
function openModal(modalElement) {
  modalElement.classList.add('modal_active')
  page.classList.add('page_no-scroll')
  setKeyboardListener()
}

function setKeyboardListener() {
  document.addEventListener('keydown', closeModalOnEscape)
}

profileEditBtn.addEventListener('mousedown', () => {
  nameInput.value = profileName.textContent
  descInput.value = profileDesc.textContent
  openModal(formBioElement)
})
addNewPictureBtn.addEventListener('mousedown', () => openModal(formCardElement))


// закрывает модальные окна
function closeModal(modalElement) {
  modalElement.classList.remove('modal_active')
  page.classList.remove('page_no-scroll')
  removeKeyboardListener()
}

function removeKeyboardListener() {
  document.removeEventListener('keydown', closeModalOnEscape)
}


// листнеры для всех модальных окон
function closeModalOnEscape(event) {
  const activeModal = document.querySelector('.modal_active')
  if (event.key === 'Escape') {
    closeModal(activeModal)
  }
}

// спасибо! Так и правда короче, и логичнее :)
modals.forEach((item) => {
  item.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('modal') || e.target.classList.contains('modal__close-btn')) {
      closeModal(item)
    }
  })
})

// обрабатывает отправку формы редактирования профиля
function updateProfileDetails(event) {
  event.preventDefault()
  profileName.textContent = nameInput.value
  profileDesc.textContent = descInput.value
  closeModal(formBioElement)
}

formBioElement.addEventListener('submit', updateProfileDetails)


// обрабатывает отправку формы создания карточки
function createNewPlace(event) {
  event.preventDefault()
  const newItem = {
    name: titleInput.value,
    link: pictureInput.value,
  }
  injectPlace(newItem)
  closeModal(formCardElement)
  document.forms['card-form'].reset()
}

formCardElement.addEventListener('submit', createNewPlace)


// включает валидацию для всех форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const formToValidate = new FormValidator(formElement, config)
    formToValidate.enableValidation()
  })
}

enableValidation(formConfig)


export { openModal }
