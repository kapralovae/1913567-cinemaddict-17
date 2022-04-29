import {createElement} from '../render.js';

const createSectionFilms = () => `
<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
</section>`;

export default class NewSectionFilmsView {
  getTemplate() {
    return createSectionFilms();
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
