import {createElement} from '../render.js';

const createContainerFilms = () => '<div class="films-list__container"></div>';

export default class ContainerListFilmView {

  #element = null;

  get template() {
    return createContainerFilms();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
