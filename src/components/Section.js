export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  renderItems(places) {
    const reversedPlaces = places.reverse()
    reversedPlaces.forEach(place => {
      this._renderer(place)
    })
  }

  addItem(element) {
    this._container.prepend(element)
  }
}
