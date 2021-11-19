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
  places,
  formValidators,
  avatarModalSelector,
  avatarImageElement,
  avatarBtn,
}                                from "../utils/constants.js"
import { Section }               from "../components/Section.js"
import { Card }                  from "../components/Card.js"
import {
  formConfig,
  FormValidator,
}                                from "../components/FormValidator.js"
import { PopupWithImage }        from "../components/PopupWithImage.js"
import { PopupWithForm }         from "../components/PopupWithForm.js"
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js"
import { UserInfo }              from "../components/UserInfo.js"


// управление картинкой профиля
const avatarModal = new PopupWithForm(avatarModalSelector,
    ({ "avatar-field-link": link }) => {
      avatarImageElement.src = link
      avatarModal.close()
    })

avatarBtn.addEventListener("mousedown", () => {
  formValidators["avatar-form"].resetForm()
  avatarModal.open()
})

// управление информацией о пользователе

const bioModal = new PopupWithForm(bioModalSelector, (inputValues) => {
  bioData.setUserInfo(inputValues)
  bioModal.close()
})

const bioData = new UserInfo({
  nameSelector: profileNameSelector,
  infoSelector: profileDescSelector,
})

profileEditBtn.addEventListener("mousedown", () => {
  formValidators["bio-form"].resetForm()
  const currentBioData = bioData.getUserInfo()
  nameInput.value = currentBioData.name
  descInput.value = currentBioData.info
  bioModal.open()
})

// управление созданием карточек

const maxModal = new PopupWithImage(maxModalSelector)

const createCard = (place) => {
  const newPlace = new Card({
    data:             place,
    handleCardClick:  () => {
      maxModal.open(place)
    },
    handleCardDelete: () => {

    }
  }, galleryItemTemplate)
  return newPlace.assembleCard()
}

const cardList = new Section({
  data: places, renderer: (place) => {
    cardList.addItem(createCard(place))
  }
}, galleryContainerSelector)

cardList.renderItems()

const cardModal = new PopupWithForm(cardModalSelector,
    ({
      "card-field-title":   title,
      "card-field-picture": picture
    }) => {
      const newItem = {
        name: title,
        link: picture,
      }
      cardList.addItem(createCard(newItem))
      cardModal.close()
    })

addNewPictureBtn.addEventListener("mousedown", () => {
  formValidators["card-form"].resetForm()
  cardModal.open()
})

// управление валидацией

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const formToValidate = new FormValidator(formElement, config)
    formValidators[formElement.name] = formToValidate
    formToValidate.enableValidation()
  })
}

enableValidation(formConfig)
