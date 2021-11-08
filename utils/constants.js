export const places = [
  {
    name: "💙 Зубчатки",
    link: "https://res.cloudinary.com/mvxim/image/upload/v1633024288/1.jpg",
  },
  {
    name: "🗿 Курум",
    link: "https://res.cloudinary.com/mvxim/image/upload/v1633024290/2.jpg",
  },
  {
    name: "🏝 Джабык",
    link: "https://res.cloudinary.com/mvxim/image/upload/v1633024291/3.jpg",
  },
  {
    name: "🏞 Река Агидель",
    link: "https://res.cloudinary.com/mvxim/image/upload/v1633024286/4.jpg",
  },
  {
    name: "🏔 Ямантау",
    link: "https://res.cloudinary.com/mvxim/image/upload/v1633024286/5.jpg",
  },
  {
    name: "🌊 Тургояк",
    link: "https://res.cloudinary.com/mvxim/image/upload/v1633024286/6.jpg",
  },
]


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
export const formCardElement = document.querySelector(".modal_type_card")
export const cardModalSelector = ".modal_type_card"
export const titleInput = formCardElement.querySelector(
    ".modal__input_field_title")
export const pictureInput = formCardElement.querySelector(
    ".modal__input_field_picture")

// Открытие карточки на весь экран
export const maxModalSelector = ".modal_type_picture"

// Кнопки
export const profileEditBtn = document.querySelector(".profile__edit-btn")
export const addNewPictureBtn = document.querySelector(".profile__add-btn")
