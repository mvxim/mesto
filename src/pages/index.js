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
  avatarSelector,
  places,
  formValidators,
  avatarModalSelector,
  avatarBtn,
} from "../utils/constants.js"
import { Section } from "../components/Section.js"
import { Card } from "../components/Card.js"
import {
  formConfig,
  FormValidator,
} from "../components/FormValidator.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithForm } from "../components/PopupWithForm.js"
// import { PopupWithConfirmation } from
// "../components/PopupWithConfirmation.js"
import { UserInfo } from "../components/UserInfo.js"
import { Api } from "../components/Api.js"

// # класс API для управления информацией на сервере
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-30/",
  headers: {
    authorization: "a2e8d35a-8087-4045-b36f-fee28ac34f65",
    "Content-Type": "application/json"
  }
})

// # управление информацией о пользователе
const bioData = new UserInfo({
  nameSelector: profileNameSelector,
  infoSelector: profileDescSelector,
  avatarSelector: avatarSelector
})

// ## получение информации с сервера и установка при загрузке
// страницы
api.getUserInfo().then((response) => {
  bioData.setUserInfoToMarkup(response)
  bioData.setAvatarToMarkup(response)
})

// ## управление картинкой профиля
const avatarModal = new PopupWithForm(avatarModalSelector,
  ({ "avatar-field-link": link }) => {
    avatarModal.togglePreloaderOnSubmit(true)
    api.setUserAvatar(link).then((userAvatar) => {
      bioData.setAvatarToMarkup(userAvatar)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      avatarModal.togglePreloaderOnSubmit(false)
      formValidators[ "avatar-form" ].disableButton()
    })
    avatarModal.close()
  })

avatarBtn.addEventListener("mousedown", () => {
  formValidators[ "avatar-form" ].resetForm()
  avatarModal.open()
})

// ## отправка новых имени и описания на сервер
const bioModal = new PopupWithForm(bioModalSelector, (inputValues) => {
  bioModal.togglePreloaderOnSubmit(true)
  api.setUserInfo(inputValues).then((userData) => {
    bioData.setUserInfoToMarkup(userData)
  }).catch((err) => {
    alert(err)
  }).finally(() => {
    bioModal.togglePreloaderOnSubmit(false)
    formValidators[ "bio-form" ].disableButton()
  })
  bioModal.close()
})

profileEditBtn.addEventListener("mousedown", () => {
  formValidators[ "bio-form" ].resetForm()
  const currentBioData = bioData.getUserInfoFromMarkup()
  nameInput.value = currentBioData.name
  descInput.value = currentBioData.info
  bioModal.open()
})

// # управление созданием карточек
const maxModal = new PopupWithImage(maxModalSelector)

const createCard = (place) => {
  const newPlace = new Card({
    data: place,
    handleCardClick: () => {
      maxModal.open(place)
    },
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

addNewPictureBtn.addEventListener("mousedown", () => {
  formValidators[ "card-form" ].resetForm()
  cardModal.open()
})

// управление валидацией
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const formToValidate = new FormValidator(formElement, config)
    formValidators[ formElement.name ] = formToValidate
    formToValidate.enableValidation()
  })
}

enableValidation(formConfig)
