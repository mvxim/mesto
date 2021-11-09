import zubchatki from "../images/gallery/1.jpg"
import kurum from "../images/gallery/2.jpg"
import dzhabyk from "../images/gallery/3.jpg"
import agidel from "../images/gallery/4.jpg"
import jamantau from "../images/gallery/5.jpg"
import turgojak from "../images/gallery/6.jpg"

export const places = [
  {
    name: "💙 Зубчатки",
    link: zubchatki,
  },
  {
    name: "🗿 Курум",
    link: kurum,
  },
  {
    name: "🏝 Джабык",
    link: dzhabyk,
  },
  {
    name: "🏞 Река Агидель",
    link: agidel,
  },
  {
    name: "🏔 Ямантау",
    link: jamantau,
  },
  {
    name: "🌊 Тургояк",
    link: turgojak,
  },
]

export const formConfig = {
  modalSelector: ".modal",
  modalCloseButtonSelector: ".modal__close-btn",
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonSelector: "modal__button_disabled",
  inputErrorSelector: "modal__input_error",
}


// Страница
export const page = document.querySelector(".page")

// Галерея
export const galleryItemTemplate = ".gallery__item-template"
export const galleryContainerSelector = ".gallery__grid"

// Селекторы имени и описания
export const profileNameSelector = ".profile__name"
export const profileDescSelector = ".profile__desc"

// Редактирование био
export const formBioElement = document.querySelector(".modal_type_bio")
export const bioModalSelector = ".modal_type_bio"
export const nameInput = formBioElement.querySelector(".modal__input_field_name")
export const descInput = formBioElement.querySelector(".modal__input_field_desc")

// Добавление карточки
export const cardModalSelector = ".modal_type_card"

// Открытие карточки на весь экран
export const maxModalSelector = ".modal_type_picture"

// Кнопки
export const profileEditBtn = document.querySelector(".profile__edit-btn")
export const addNewPictureBtn = document.querySelector(".profile__add-btn")
