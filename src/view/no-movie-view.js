import AbstractView from '../framework/view/abstract-view';
import { FilterMapType } from '../const';

const noMovieTextType = {
  [FilterMapType.all] : 'There are no movies in our database',
  [FilterMapType.watchlist] : 'There are no movies to watch now',
  [FilterMapType.alreadyWatched] : 'There are no watched movies now',
  [FilterMapType.favorite] : 'There are no favorite movies now',
};


const noMovieSection = (filterType) => {
  const noMovieText = noMovieTextType[filterType];
  return (`
  <section class="films">
    <section class="films-list">
      <h2 class="films-list__title">${noMovieText}</h2>

      <!--
        Значение отображаемого текста зависит от выбранного фильтра:
          * All movies – 'There are no movies in our database'
          * Watchlist — 'There are no movies to watch now';
          * History — 'There are no watched movies now';
          * Favorites — 'There are no favorite movies now'.
      -->
    </section>
  </section>`);
};

export default class NoMovieView extends AbstractView {
  #filterType = FilterMapType.all;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {

    return noMovieSection(this.#filterType);
  }
}
