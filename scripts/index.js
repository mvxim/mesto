const page = document.querySelector('.page') //выбираем всю страницу
const modal = document.querySelector('.modal') //выбираем модалку с затемнением
const profileEditBtn = document.querySelector('.profile__edit-btn') //выбираем кнопку редактирования
const modalCloseBtn = document.querySelector('.modal__close-btn') //выбираем кнопку закрытия
const profileName = document.querySelector('.profile__name') //выбираем имя профиля
const profileDesc = document.querySelector('.profile__desc') //выбираем описание профиля
const formElement = document.querySelector('.modal__form') //выбираем форму целиком
const nameInput = document.querySelector('.modal__input_name') //поле ввода имени в форме
const descInput = document.querySelector('.modal__input_desc') //поле ввода описания в форме

// функции, управляющие открытием и закрытием модалки
function modalOn() {
    modal.classList.add('modal_active')
    page.classList.add('page_no-scroll')
}

function modalOff() {
    modal.classList.remove('modal_active')
    page.classList.remove('page_no-scroll')
}

// функция, которая получает value полей формы
function updateProfileDetails(event) {
    event.preventDefault() //предотвращаю перезагрузку страницы при отправке формы
    profileName.textContent = nameInput.value // передаю значение поля name в профиль, в элемент с классом .profile__name
    profileDesc.textContent = descInput.value // передаю значение поля desc в профиль, в элемент с классом .profile__desc
    modalOff()
}

// листнеры кликов по кнопкам
profileEditBtn.addEventListener('click', modalOn)
modalCloseBtn.addEventListener('click', modalOff)
modal.addEventListener('click', function (event) {

    if (event.target === event.currentTarget) {
        modalOff()
    }
})

formElement.addEventListener('submit', updateProfileDetails)