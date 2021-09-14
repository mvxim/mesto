const page = document.querySelector('.page') //выбираем всю страницу
const modal = document.querySelector('.modal') //выбираем модалку с затемнением
const profileEditBtn = document.querySelector('.profile__edit-btn') //выбираем кнопку редактирования
const modalCloseBtn = document.querySelector('.modal__close-btn') //выбираем кнопку закрытия
const profileName = document.querySelector('.profile__name') //выбираем имя профиля
const profileDesc = document.querySelector('.profile__desc') //выбираем описание профиля
const formElement = document.querySelector('.modal__form') //выбираем форму целиком
const nameInput = document.querySelector('.modal__input_name') //поле ввода имени в форме
const descInput = document.querySelector('.modal__input_desc') //поле ввода описания в форме
const likeBtn = document.querySelectorAll('.like') //все кнопки лайка

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