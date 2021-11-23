export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
    this._preloader = this._container.querySelector(".gallery__status")
  }

  renderItems(places) {
    places.forEach(item => {
      this._renderer(item)
    })
  }

  addItem(element) {
    this._container.prepend(element)
  }

}
