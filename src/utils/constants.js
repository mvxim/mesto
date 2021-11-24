export const formConfig = {
  modalSelector: ".modal",
  modalCloseButtonSelector: ".modal__close-btn",
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonSelector: "modal__button_disabled",
  inputErrorSelector: "modal__input_error",
}

export const page = document.querySelector(".page"),
  formBioElement = document.querySelector(".modal_type_bio"),
  nameInput = formBioElement.querySelector(".modal__input_field_name"),
  descInput = formBioElement.querySelector(".modal__input_field_desc"),
  profileEditBtn = document.querySelector(".profile__edit-btn"),
  addNewPictureBtn = document.querySelector(".profile__add-btn"),
  avatarBtn = document.querySelector(".profile__avatar-btn"),

  galleryItemTemplate = ".gallery__item-template",
  galleryContainerSelector = ".gallery__grid",
  avatarSelector = ".profile__avatar",
  profileNameSelector = ".profile__name",
  profileDescSelector = ".profile__desc",
  avatarModalSelector = ".modal_type_avatar",
  bioModalSelector = ".modal_type_bio",
  cardModalSelector = ".modal_type_card",
  maxModalSelector = ".modal_type_picture",
  confirmModalSelector = ".modal_type_confirm",
  formValidators = {}
