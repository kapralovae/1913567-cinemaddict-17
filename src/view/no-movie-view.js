import {createElement} from '../render.js';

const noMovieSection = () => `
<section class="films">
  <section class="films-list">
    <h2 class="films-list__title">There are no movies in our database</h2>

    <!--
      Значение отображаемого текста зависит от выбранного фильтра:
        * All movies – 'There are no movies in our database'
        * Watchlist — 'There are no movies to watch now';
        * History — 'There are no watched movies now';
        * Favorites — 'There are no favorite movies now'.
    -->
  </section>
</section>`;

export default class NoMovieView {

  #element = null;

  get template() {
    return noMovieSection();
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
