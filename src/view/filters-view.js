import { FilterType, FilterMapType } from '../const';
import AbstractView from '../framework/view/abstract-view';

const createFilters = (renderMovies, currentFilter) => {
  console.log(renderMovies, currentFilter);
  const countWatchlistMovie = renderMovies.filter((movie) => movie.userDetails['watchlist']).length;
  const countAlreadyWatchedMovie = renderMovies.filter((movie) => movie.userDetails['alreadyWatched']).length;
  const countFavoriteMovie = renderMovies.filter((movie) => movie.userDetails['favorite']).length;
  return (`<nav class="main-navigation">
<a href="#all" class="main-navigation__item ${FilterMapType[currentFilter] === FilterType.ALL ? 'main-navigation__item--active' : ''} ">All movies</a>
<a href="#watchlist" class="main-navigation__item ${FilterMapType[currentFilter] === FilterType.WATCHLIST ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">${countWatchlistMovie}</span></a>
<a href="#alreadyWatched" class="main-navigation__item ${FilterMapType[currentFilter] === FilterType.HISTORY ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">${countAlreadyWatchedMovie}</span></a>
<a href="#favorite" class="main-navigation__item ${FilterMapType[currentFilter] === FilterType.FAVORITES ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${countFavoriteMovie}</span></a>
</nav>`);};

export default class NewFiltersView extends AbstractView {
  #renderMovies = null;
  #currentFilter = null;

  constructor(renderMovies, currentFilter) {
    super();
    this.#renderMovies = renderMovies;
    this.#currentFilter = currentFilter;
    console.log(this.#currentFilter);
  }

  get template() {
    return createFilters(this.#renderMovies, this.#currentFilter);
  }

  handlerClickFilterWatchlist = (callback) => {
    this._callback.filterWatchlistClick = callback;
    this.element.querySelectorAll('a').forEach((link) => {link.addEventListener('click', this.#hadndlerClickWatchlist);});
    // document.querySelector('.main-navigation').addEventListener('click', this.#hadndlerClickWatchlist);//пофиксить
  };

  #hadndlerClickWatchlist = (evt) => {
    evt.preventDefault();
    this._callback.filterWatchlistClick(evt.target.getAttribute('href').replace('#', ''));
  };

}
