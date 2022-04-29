import {createElement} from '../render.js';

const createContainerFilms = () => '<div class="films-list__container"></div>';

export default class ContainerListFilm {
  getTemplate() {
    return createContainerFilms();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
