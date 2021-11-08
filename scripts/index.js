import {
  galleryContainerSelector,
  galleryItemTemplate,
  nameInput,
  descInput,
  profileEditBtn,
  addNewPictureBtn,
  bioModalSelector,
  cardModalSelector,
  maxModalSelector,
  profileNameSelector,
  profileDescSelector,
  places
} from "../utils/constants.js"
import { Section } from "./Section.js"
import { Card } from "./Card.js"
import {
  formConfig,
  FormValidator,
} from "./FormValidator.js"
import { PopupWithImage } from "./PopupWithImage.js"
import { PopupWithForm } from "./PopupWithForm.js"
import { UserInfo } from "./UserInfo.js"

// ***************************************************************************
// управление именем и информацией

// экземпляр модалки с формой био
const bioModal = new PopupWithForm(bioModalSelector, (inputValues) => {
  bioData.setUserInfo(inputValues)
  bioModal.close()
})

// экземпляр UserInfo для управления разделом био на странице
const bioData = new UserInfo({
  nameSelector: profileNameSelector,
  infoSelector: profileDescSelector,
})

// обработка нажатия на кнопку «Редактировать»
profileEditBtn.addEventListener("mousedown", () => {
  const currentBioData = bioData.getUserInfo()
  nameInput.value = currentBioData.name
  descInput.value = currentBioData.info
  bioModal.open()
})

// ***************************************************************************
//управление отображением и добавлением карточек

// экземпляр модалки с картинкой
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

// экземпляр Section, который рисует карточки при загрузке страницы
const gallerySection = new Section({
  data: places, renderer: (place) => {
    renderNewCard(place)
  }
}, galleryContainerSelector)

gallerySection.renderItems()

// экземпляр модалки с формой карточки
const cardModal = new PopupWithForm(cardModalSelector, (inputValues) => {
  const newItem = [ {
    name: inputValues["card-field-title"],
    link: inputValues["card-field-picture"],
  } ]
  const newCard = new Section({
    data: newItem, renderer: (place) => {
      renderNewCard(place)
    }
  })
  newCard.renderItems()
  cardModal.close()
})

// обработка нажатия на кнопку «Добавить»
addNewPictureBtn.addEventListener("mousedown", () => {
  cardModal.open()
})


// ***************************************************************************
// управление валидацией для всех форм
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const formToValidate = new FormValidator(formElement, config)
    formToValidate.enableValidation()
  })
}

enableValidation(formConfig)
