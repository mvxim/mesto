// Страница
const page = document.querySelector('.page')

// Галерея
const gallery = document.querySelector('.gallery__grid')
const galleryTemplateItem = document.querySelector('.gallery__item-template')

// Имя и описание
const profileName = document.querySelector('.profile__name')
const profileDesc = document.querySelector('.profile__desc')

// Фон модалок
const modals = document.querySelectorAll('.modal')

// Редактирование био
const formBioElement = document.querySelector('.modal_type_bio')
const nameInput = formBioElement.querySelector('.modal__input_field_name')
const descInput = formBioElement.querySelector('.modal__input_field_desc')

// Добавление карточки
const formCardElement = document.querySelector('.modal_type_card')
const titleInput = formCardElement.querySelector('.modal__input_field_title')
const pictureInput = formCardElement.querySelector('.modal__input_field_picture')

// Кнопки
const profileEditBtn = document.querySelector('.profile__edit-btn')
const addNewPictureBtn = document.querySelector('.profile__add-btn')
const modalCloseBtn = document.querySelectorAll('.modal__close-btn')

// Просмотр картинки
const maxModal = document.querySelector('.modal_type_picture')
const maxModalPicture = maxModal.querySelector('.modal__image')
const maxModalCaption = maxModal.querySelector('.modal__caption')

// Набор карточек
const places = [
  {
    name: '💙 Зубчатки',
    link: 'https://res.cloudinary.com/mvxim/image/upload/v1633024288/1.jpg'
  },
  {
    name: '🗿 Курум',
    link: 'https://res.cloudinary.com/mvxim/image/upload/v1633024290/2.jpg'
  },
  {
    name: '🏝 Джабык',
    link: 'https://res.cloudinary.com/mvxim/image/upload/v1633024291/3.jpg'
  },
  {
    name: '🏞 Река Агидель',
    link: 'https://res.cloudinary.com/mvxim/image/upload/v1633024286/4.jpg'
  },
  {
    name: '🏔 Ямантау',
    link: 'https://res.cloudinary.com/mvxim/image/upload/v1633024286/5.jpg'
  },
  {
    name: '🌊 Тургояк',
    link: 'https://res.cloudinary.com/mvxim/image/upload/v1633024286/6.jpg'
  }
];

// создает карточки с местами
function renderPlace(place) {
  const newPlace = galleryTemplateItem.content.cloneNode(true)
  const galleryItemText = newPlace.querySelector('.gallery__text')
  const galleryItemImage = newPlace.querySelector('.gallery__image')
  const galleryItemDeleteBtn = newPlace.querySelector('.gallery__delete-btn')
  const galleryItemLikeBtn = newPlace.querySelector('.like')
  galleryItemText.textContent = place.name
  galleryItemImage.alt = place.name
  galleryItemImage.src = place.link
  galleryItemDeleteBtn.addEventListener('click', deletePlace)
  galleryItemLikeBtn.addEventListener('click', setLike)
  galleryItemImage.addEventListener('click', () => maximizePlace(galleryItemImage.src, galleryItemImage.alt, galleryItemText.textContent))
  gallery.prepend(newPlace)
}

places.forEach(renderPlace)

// открывает модальные окна
function modalOn(modalElement) {
  modalElement.classList.add('modal_active')
  if (modalElement === formBioElement) {
    nameInput.value = profileName.textContent
    descInput.value = profileDesc.textContent
  }
  page.classList.add('page_no-scroll')
}

profileEditBtn.addEventListener('click', () => modalOn(formBioElement))
addNewPictureBtn.addEventListener('click', () => modalOn(formCardElement))

// закрывает модальные окна
function modalOff(modalElement) {
  modalElement.classList.remove('modal_active')
  page.classList.remove('page_no-scroll')
}

// листнеры для всех модальных окон
modals.forEach((item) => {
  item.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      modalOff(event.target)
    }
  })
})

modalCloseBtn.forEach((item) => {
  item.addEventListener('click', () => {
    modalOff(item.closest('.modal'))
  })
})

// обновляет текст на странице в разделе «профиль»
function updateProfileDetails(event) {
  event.preventDefault()
  if (nameInput.value === '') {
  } else {
    profileName.textContent = nameInput.value
  }
  if (descInput.value === '') {
  } else {
    profileDesc.textContent = descInput.value
  }
  modalOff(formBioElement)
}

formBioElement.addEventListener('submit', updateProfileDetails)

// добавляет новую карточку
function createNewPlace(event) {
  event.preventDefault()
  let newItem = {
    name: titleInput.value,
    link: pictureInput.value,
  }
  places.push(newItem)
  renderPlace(newItem)
  modalOff(formCardElement)
  titleInput.value = ''
  pictureInput.value = ''
}

formCardElement.addEventListener('submit', createNewPlace)

// ставит лайк
function setLike(event) {
  event.target.classList.toggle('like_active')
}

// удаляет карточку
function deletePlace(event) {
  const place = event.currentTarget.closest('.gallery__item')
  place.remove()
}

// открывает картинку
function maximizePlace(image, alt, caption) {
  modalOn(maxModal)
  maxModalPicture.src = image
  maxModalPicture.alt = alt
  maxModalCaption.textContent = caption
}
