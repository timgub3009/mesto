export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
//рисовка элементов
  renderAllItems() {
    this._items.forEach(item => {
      this._renderer(item)
    });
  }
//добавление
  addItem(element) {
    this._container.prepend(element)
  }
}

