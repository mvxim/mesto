import "./index.css"
import {
  addNewPictureBtn,
  avatarBtn,
  avatarModalSelector,
  avatarSelector,
  bioModalSelector,
  cardModalSelector,
  confirmModalSelector,
  descInput,
  formValidators,
  galleryContainerSelector,
  galleryItemTemplate,
  maxModalSelector,
  nameInput,
  profileDescSelector,
  profileEditBtn,
  profileNameSelector,
} from "../utils/constants.js"
import {Section} from "../components/Section.js"
import {Card} from "../components/Card.js"
import {formConfig, FormValidator,} from "../components/FormValidator.js"
import {PopupWithImage} from "../components/PopupWithImage.js"
import {PopupWithForm} from "../components/PopupWithForm.js"
import {PopupWithConfirmation} from "../components/PopupWithConfirmation.js"
import {UserInfo} from "../components/UserInfo.js"
import {Api} from "../components/Api.js"

// экземпляр API для управления информацией на сервере
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-30/",
  headers: {
    authorization: "a2e8d35a-8087-4045-b36f-fee28ac34f65",
    "Content-Type": "application/json"
  }
})

api.getDataOnPageLoad().then(([userInfo, places]) => {
  const userId = userInfo._id
  
  // экземпляр UserInfo для управления информацией о пользователе
  const bioData = new UserInfo({
    nameSelector: profileNameSelector,
    infoSelector: profileDescSelector,
    avatarSelector: avatarSelector
  })
  
  // экземпляр PopupWithForm для управления картинкой профиля
  const avatarModal = new PopupWithForm(avatarModalSelector,
      ({"avatar-field-link": link}) => {
        avatarModal.togglePreloaderOnSubmit(
            true)
        api.setUserAvatar(link)
            .then((userAvatar) => {
              bioData.setAvatarToMarkup(
                  userAvatar)
              avatarModal.close()
            })
            .catch((err) => {
              console.log(err)
            })
            .finally(() => {
              avatarModal.togglePreloaderOnSubmit(
                  false)
              formValidators["avatar-form"].disableButton()
            })
        
      })
  avatarModal.setEventListeners()
  
  
  avatarBtn.addEventListener("mousedown", () => {
    formValidators["avatar-form"].resetForm()
    avatarModal.open()
  })
  
  // получение инфы о пользоваетеле с сервера и установка
  bioData.setUserInfoToMarkup(userInfo)
  bioData.setAvatarToMarkup(userInfo)
  
  // экземпляр PopupWithForm для установки имени и описания
  const bioModal = new PopupWithForm(bioModalSelector, (inputValues) => {
    bioModal.togglePreloaderOnSubmit(true)
    api.setUserInfo(inputValues)
        .then((userData) => {
          bioData.setUserInfoToMarkup(userData)
          bioModal.close()
        }).catch((err) => {
      alert(err)
    }).finally(() => {
      bioModal.togglePreloaderOnSubmit(false)
    })
  })
  
  bioModal.setEventListeners()
  
  profileEditBtn.addEventListener("mousedown", () => {
    formValidators["bio-form"].resetForm()
    const currentBioData = bioData.getUserInfoFromMarkup()
    nameInput.value = currentBioData.name
    descInput.value = currentBioData.info
    bioModal.open()
  })
  
  // экземпляр PopupWithImage
  const maxModal = new PopupWithImage(maxModalSelector)
  maxModal.setEventListeners()
  
  // экземпляр PopupWithForm для добавления новой карточки
  const cardModal = new PopupWithForm(cardModalSelector,
      ({
         "card-field-title": title,
         "card-field-picture": picture
       }) => {
        const newItem = {
          name: title,
          link: picture,
        }
        cardModal.togglePreloaderOnSubmit(true)
        api.createNewPlace(newItem)
            .then((res) => {
              cardList.addItem(createCard(res,
                  userInfo))
              cardModal.close()
            })
            .catch((err) => {
              console.log(err)
            })
            .finally(() => {
              cardModal.togglePreloaderOnSubmit(
                  false)
            })
      })
  cardModal.setEventListeners()
  
  addNewPictureBtn.addEventListener("mousedown", () => {
    formValidators["card-form"].resetForm()
    cardModal.open()
  })
  
  // экземпляр PopupWithForm для подтверждения
  const confirmationModal = new PopupWithConfirmation(confirmModalSelector)
  confirmationModal.setEventListeners()
  
  // функция-сборщик карточки. Создает Card и возвращает готовый элемент
  const createCard = (place) => {
    const newPlace = new Card({
      place: {
        ...place,
        currentUserId: userId
      },
      cardClickCallback: () => {
        maxModal.open(place)
      },
      likeSetCallback: (placeId) => {
        api.setLike(placeId).then((res) => {
          newPlace.like(res)
        }).catch((err) => {
          console.log(err)
        })
      },
      likeRemoveCallback: (placeId) => {
        api.removeLike(placeId).then((res) => {
          newPlace.like(res)
        }).catch((err) => {
          console.log(err)
        })
      },
      cardDeleteCallback: (placeId) => {
        confirmationModal.open()
        formValidators["confirm-form"].enableButton()
        confirmationModal.onSubmit(() => {
          confirmationModal.togglePreloaderOnSubmit(
              true)
          api.removePlace(placeId).then(() => {
            confirmationModal.close()
            newPlace.removePlace()
          }).catch((err) => {
            console.log(err)
          }).finally(() => {
            confirmationModal.togglePreloaderOnSubmit(
                false)
          })
        })
      }
      
    }, galleryItemTemplate)
    return newPlace.assembleCard()
  }
  
  // экземпляр Section, где расположены все карточки
  const cardList = new Section({
    renderer: (place) => {
      cardList.addItem(createCard(place))
    }
  }, galleryContainerSelector)
  
  
  cardList.renderItems(places.reverse())
  
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
  
}).catch((err) => {
  console.log(err)
})
