import "./index.css"

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
import { Section } from "../components/Section.js"
import { Card } from "../components/Card.js"
import {
  formConfig,
  FormValidator,
} from "../components/FormValidator.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithForm } from "../components/PopupWithForm.js"
import { UserInfo } from "../components/UserInfo.js"

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
// !!! переименовал renderNewCard в createCard
const createCard = (place) => {
  const newPlace = new Card({
    data: place,
    handleCardClick: () => {
      maxModal.open(place)
    }
  }, galleryItemTemplate)
  return newPlace.assembleCard()
}

// экземпляр Section, который рисует карточки при загрузке страницы
// !!! переименовал gallerySection в cardList
const cardList = new Section({
  data: places, renderer: (place) => {
    cardList.addItem(createCard(place))
  }
}, galleryContainerSelector)

cardList.renderItems()

// экземпляр модалки с формой карточки
const cardModal = new PopupWithForm(cardModalSelector,
    ({
       "card-field-title": title,
       "card-field-picture": picture
     }) => {
      const newItem = {
        name: title,
        link: picture,
      }
      cardList.addItem(createCard(newItem))
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
