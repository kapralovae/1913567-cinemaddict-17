import { FilterType, FilterMapType } from '../const';
import AbstractView from '../framework/view/abstract-view';

const createFilters = (renderMovies, currentFilter) => {
  const countWatchlistMovie = renderMovies.filter((movie) => movie.userDetails['watchlist']).length;
  const countAlreadyWatchedMovie = renderMovies.filter((movie) => movie.userDetails['alreadyWatched']).length;
  const countFavoriteMovie = renderMovies.filter((movie) => movie.userDetails['favorite']).length;
  return (`<nav class="main-navigation">
<a href="#all" data-type-filter="all" class="main-navigation__item ${FilterMapType[currentFilter] === FilterType.ALL_MOVIES ? 'main-navigation__item--active' : ''} ">All movies</a>
<a href="#watchlist" data-type-filter="watchlist" class="main-navigation__item ${FilterMapType[currentFilter] === FilterType.WATCHLIST ? 'main-navigation__item--active' : ''}">Watchlist <span data-type-filter="watchlist" class="main-navigation__item-count">${countWatchlistMovie}</span></a>
<a href="#alreadyWatched" data-type-filter="alreadyWatched" class="main-navigation__item ${FilterMapType[currentFilter] === FilterType.HISTORY ? 'main-navigation__item--active' : ''}">History <span data-type-filter="alreadyWatched" class="main-navigation__item-count">${countAlreadyWatchedMovie}</span></a>
<a href="#favorite" data-type-filter="favorite" class="main-navigation__item ${FilterMapType[currentFilter] === FilterType.FAVORITES ? 'main-navigation__item--active' : ''}">Favorites <span data-type-filter="favorite" class="main-navigation__item-count">${countFavoriteMovie}</span></a>
</nav>`);};

export default class FiltersView extends AbstractView {
  #renderMovies = null;
  #currentFilter = null;

  constructor(renderMovies, currentFilter) {
    super();
    this.#renderMovies = renderMovies;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilters(this.#renderMovies, this.#currentFilter);
  }

  handlerClickFilters = (callback) => {
    this._callback.filterClick = callback;
    this.element.querySelectorAll('a').forEach((link) => {link.addEventListener('click', this.#hadndlerClickOnFilter);});
  };

  #hadndlerClickOnFilter = (evt) => {
    evt.preventDefault();
    this._callback.filterClick(evt.target.dataset.typeFilter);
  };

}
