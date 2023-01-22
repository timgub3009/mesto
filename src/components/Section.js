export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }
  //рисовка элементов
  renderAllItems() {
    this._items.forEach(item => {
      this.addItem(item)
    });
  }
  //добавление
  addItem(element) {
    const card = this._renderer(element);
    this._container.prepend(card)
  }
}

