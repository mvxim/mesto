import {
  galleryContainerSelector,
  galleryItemTemplate,
  profileName,
  profileDesc,
  formBioElement,
  nameInput,
  descInput,
  formCardElement,
  titleInput,
  pictureInput,
  profileEditBtn,
  addNewPictureBtn,
  bioModalSelector,
  cardModalSelector,
  maxModalSelector,
  places
} from "../utils/constants.js"
import { Section } from "./Section.js"
import { Card } from "./Card.js"
import {
  formConfig,
  FormValidator,
} from "./FormValidator.js"
import { PopupWithImage } from './PopupWithImage.js'
import { PopupWithForm } from './PopupWithForm.js'


const bioModal = new PopupWithForm(bioModalSelector, (e) => {
  e.preventDefault()
  bioModal.close()
})
const cardModal = new PopupWithForm(cardModalSelector, () => {
  e.preventDefault()
  cardModal.close()
})
const maxModal = new PopupWithImage(maxModalSelector)

// функция-рендерер-карточек, для использования к колбеке конструктора Section
const renderNewCard = (place) => {
  const newPlace = new Card({
    data: place,
    handleCardClick: () => {
      maxModal.open(place)
    }
  }, galleryItemTemplate)
  const newPlaceElement = newPlace.assembleCard()
  gallerySection.addItem(newPlaceElement)
}

// экземпляр Section, который рисует карточки изначально
const gallerySection = new Section({
  data: places, renderer: (place) => {
    renderNewCard(place)
  }
}, galleryContainerSelector)
gallerySection.renderItems()


// обработка нажатия на кнопку «Редактировать»
profileEditBtn.addEventListener("mousedown", () => {
  nameInput.value = profileName.textContent
  descInput.value = profileDesc.textContent
  bioModal.open()
})

// обработка нажатия на кнопку «Добавить»
addNewPictureBtn.addEventListener("mousedown", () => {
  cardModal.open()
})


// обрабатывает отправку формы редактирования профиля
// function updateProfileDetails(event) {
//   event.preventDefault()
//   profileName.textContent = nameInput.value
//   profileDesc.textContent = descInput.value
//   bioModal.close()
// }

// formBioElement.addEventListener("submit", updateProfileDetails)


// обрабатывает отправку формы создания карточки
function createNewPlace(event) {
  event.preventDefault()
  const newItem = [ {
    name: titleInput.value,
    link: pictureInput.value,
  } ]
  const newCard = new Section({
    data: newItem, renderer: (place) => {
      renderNewCard(place)
    }
  })
  newCard.renderItems()
  cardModal.close()
  document.forms[ "card-form" ].reset()
}

formCardElement.addEventListener("submit", createNewPlace)


// включает валидацию для всех форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const formToValidate = new FormValidator(formElement, config)
    formToValidate.enableValidation()
  })
}

enableValidation(formConfig)
