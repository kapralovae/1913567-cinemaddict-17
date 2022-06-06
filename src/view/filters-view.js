import { FilterType, FilterMapType } from '../const';
import AbstractView from '../framework/view/abstract-view';

const createFilters = (currentFilter) => `<nav class="main-navigation">
<a href="#all" class="main-navigation__item ${FilterMapType[currentFilter] === FilterType.ALL ? 'main-navigation__item--active' : ''} ">All movies</a>
<a href="#watchlist" class="main-navigation__item ${FilterMapType[currentFilter] === FilterType.WATCHLIST ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">13</span></a>
<a href="#alreadyWatched" class="main-navigation__item ${FilterMapType[currentFilter] === FilterType.HISTORY ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">4</span></a>
<a href="#favorite" class="main-navigation__item ${FilterMapType[currentFilter] === FilterType.FAVORITES ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">8</span></a>
</nav>`;

export default class NewFiltersView extends AbstractView {

  constructor() {
    super();
  }

  get template() {
    return createFilters();
  }

  handlerClickFilterWatchlist = (callback) => {
    this._callback.filterWatchlistClick = callback;
    this.element.querySelectorAll('a').forEach((link) => {link.addEventListener('click', this.#hadndlerClickWatchlist);});
    // document.querySelector('.main-navigation').addEventListener('click', this.#hadndlerClickWatchlist);//пофиксить
  };

  #hadndlerClickWatchlist = (evt) => {
    evt.preventDefault();
    console.log(evt.target.getAttribute('href').replace('#', ''));
    this._callback.filterWatchlistClick(evt.target.getAttribute('href').replace('#', ''));
  };

}
