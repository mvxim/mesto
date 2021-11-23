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
  //  places,
  formValidators,
  avatarModalSelector,
  avatarBtn,
}                         from "../utils/constants.js"
import { Section }        from "../components/Section.js"
import { Card }           from "../components/Card.js"
import {
  formConfig,
  FormValidator,
}                         from "../components/FormValidator.js"
import { PopupWithImage } from "../components/PopupWithImage.js"
import { PopupWithForm }  from "../components/PopupWithForm.js"
// import { PopupWithConfirmation } from
// "../components/PopupWithConfirmation.js"
import { UserInfo }       from "../components/UserInfo.js"
import { Api }            from "../components/Api.js"

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// # экземпляр API для управления информацией на сервере
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-30/",
  headers: {
    authorization:  "a2e8d35a-8087-4045-b36f-fee28ac34f65",
    "Content-Type": "application/json"
  }
})

// # экземпляр UserInfo для управления информацией о пользователе
const bioData = new UserInfo({
  nameSelector:   profileNameSelector,
  infoSelector:   profileDescSelector,
  avatarSelector: avatarSelector
})

// ## экземпляр PopupWithForm для управления картинкой профиля
const avatarModal = new PopupWithForm(avatarModalSelector,
    ({ "avatar-field-link": link }) => {
      avatarModal.togglePreloaderOnSubmit(true)
      api.setUserAvatar(link).then((userAvatar) => {
        bioData.setAvatarToMarkup(userAvatar)
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        avatarModal.togglePreloaderOnSubmit(false)
        formValidators["avatar-form"].disableButton()
      })
      avatarModal.close()
    })

avatarBtn.addEventListener("mousedown", () => {
  formValidators["avatar-form"].resetForm()
  avatarModal.open()
})

// ## экземпляр PopupWithForm для установки имени и описания
const bioModal = new PopupWithForm(bioModalSelector, (inputValues) => {
  bioModal.togglePreloaderOnSubmit(true)
  api.setUserInfo(inputValues).then((userData) => {
    bioData.setUserInfoToMarkup(userData)
  }).catch((err) => {
    alert(err)
  }).finally(() => {
    bioModal.togglePreloaderOnSubmit(false)
  })
  bioModal.close()
})

profileEditBtn.addEventListener("mousedown", () => {
  formValidators["bio-form"].resetForm()
  const currentBioData = bioData.getUserInfoFromMarkup()
  nameInput.value = currentBioData.name
  descInput.value = currentBioData.info
  bioModal.open()
})

// # экземпляры Section, Card и PopupWithImage для управления карточками мест
const maxModal = new PopupWithImage(maxModalSelector)

// ## экземпляр Section, где расположены все карточки
const cardList = new Section({
  renderer: (place) => {
    cardList.addItem(createCard(place))
  }
}, galleryContainerSelector)

// ## функция-сборщик карточки. Создает Card и возвращает готовый элемент
const createCard = (place) => {
  const newPlace = new Card({
    place,
    handleCardClick:  () => {
      maxModal.open(place)
    },
    handleCardLike:   () => {
      console.log("Like!")
      console.log(place.likes)
    },
    handleCardDelete: () => {
      console.log("Delete!")
    }

  }, galleryItemTemplate)
  return newPlace.assembleCard()
}

// ## экземпляр PopupWithForm для добавления новой карточки
const cardModal = new PopupWithForm(cardModalSelector,
    ({
      "card-field-title":   title,
      "card-field-picture": picture
    }) => {
      const newItem = {
        name: title,
        link: picture,
      }
      cardModal.togglePreloaderOnSubmit(true)
      api.createNewPlace(newItem).then((newPlace) => {
        cardList.addItem(createCard(newPlace))
        cardModal.close()
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        cardModal.togglePreloaderOnSubmit(false)
      })
    })

addNewPictureBtn.addEventListener("mousedown", () => {
  formValidators["card-form"].resetForm()
  cardModal.open()
})

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// # изначальное наполнение страницы
// TODO: как отображать, что данные подгружаются до того, как они пришли?
api.getDataOnPageLoad().then(([ userInfo, places ]) => {
  // ## получение инфы о пользоваетеле с сервера и установка
  bioData.setUserInfoToMarkup(userInfo)
  bioData.setAvatarToMarkup(userInfo)
  //// ## получение карточек с сервера и отрисовка
  console.log(places)
  cardList.renderItems(places)
})

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// # управление валидацией
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const formToValidate = new FormValidator(formElement, config)
    formValidators[formElement.name] = formToValidate
    formToValidate.enableValidation()
  })
}

// ## запуск валидации
enableValidation(formConfig)
