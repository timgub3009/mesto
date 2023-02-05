export default class Section {
  constructor(renderer , containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }
  //рисовка элементов
  renderAllItems(items) {
    items.forEach(item => {
      this.addItem(item)
    });
  }
  //добавление
  addItem(element) {
    const card = this._renderer(element);
    this._container.prepend(card)
  }
}

