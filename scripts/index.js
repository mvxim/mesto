const page = document.querySelector('.page')
const modal = document.querySelector('.modal')
const profileEditBtn = document.querySelector('.profile__edit-btn')
const modalCloseBtn = document.querySelector('.modal__close-btn')
const profileName = document.querySelector('.profile__name')
const profileDesc = document.querySelector('.profile__desc')
const formElement = document.querySelector('.modal__form')
const nameInput = document.querySelector('.modal__input_field_name') // переволновался
const descInput = document.querySelector('.modal__input_field_desc') // :—)
const likeBtn = document.querySelectorAll('.like')

// открывает модальное окно
function modalOn() {
  modal.classList.add('modal_active')
  page.classList.add('page_no-scroll')
  nameInput.value = profileName.textContent
  descInput.value = profileDesc.textContent
}

// закрывает модальное окно
function modalOff() {
  modal.classList.remove('modal_active')
  page.classList.remove('page_no-scroll')
}

// обновляет текст на странице в разделе «профиль»
function updateProfileDetails(event) {
  event.preventDefault() //предотвращает перезагрузку страницы при отправке формы
  if (nameInput.value === '') { //если в поле формы ничего не ввели, то ничего не происходит
  } else {
    profileName.textContent = nameInput.value //если всё-таки ввели, то значение из поля подставляется в страницу
  }
  if (descInput.value === '') {
  } else {
    profileDesc.textContent = descInput.value
  }
  modalOff() // при сохранении модалка закрывается
}

// листнеры событий
profileEditBtn.addEventListener('click', modalOn) // при клике по кнопке редактирования открывает модалку
modalCloseBtn.addEventListener('click', modalOff) // при клике по кнопке закрытия закрывает
modal.addEventListener('click', function (event) { // при клике за пределами формы, но в пределах оверлея закрывает модалку
  if (event.target === event.currentTarget) {
    modalOff()
  }
})

// отправка формы
formElement.addEventListener('submit', updateProfileDetails) // когда форма отправляется, обновляет текст на странице

// активация лайка
for (let button = 0; button < likeBtn.length; button++) { // вешаем листнер на каждый элемент массива с классом .like
  likeBtn[button].addEventListener('click', function (event) {
    event.target.classList.toggle('like_active') // элемент, по которому кликнули, меняет свой класс
  })
}