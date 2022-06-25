import AbstractView from '../framework/view/abstract-view.js';
import { getRuntime, humanizeYearDate } from '../util.js';

const createCardFilm = (movie,) => {

  const {filmInfo, id, comments} = movie;
  let classActiveWatchlist = '';
  let classActiveWatched = '';
  let classActiveFavorite = '';
  if (movie.userDetails.watchlist) {
    classActiveWatchlist = 'film-card__controls-item--active';
  }
  if (movie.userDetails.alreadyWatched) {
    classActiveWatched = 'film-card__controls-item--active';
  }
  if (movie.userDetails.favorite) {
    classActiveFavorite = 'film-card__controls-item--active';
  }
  const MAX_LENGTH = 140;
  return (`
  <article class="film-card">
    <a class="film-card__link">
      <p style="display:none">${id}</p>
      <h3 class="film-card__title">${filmInfo.title}</h3>
      <p class="film-card__rating">${filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${humanizeYearDate(filmInfo.release.date)}</span>
        <span class="film-card__duration">${getRuntime(filmInfo.runtime)}</span>
        <span class="film-card__genre">${filmInfo.genre[0]}</span>
      </p>
      <img src="./${filmInfo.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${filmInfo.description.length > MAX_LENGTH ? filmInfo.description.slice(0, MAX_LENGTH).concat('...'): filmInfo.description}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${classActiveWatchlist}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${classActiveWatched}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${classActiveFavorite}" type="button">Mark as favorite</button>
    </div>
  </article>`);
};

export default class CardFilmView extends AbstractView{

  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createCardFilm(this.#movie, this.#limitText);
  }

  getMovieForView = () => this.#movie;

  #limitText = () => {
    const regular = /\*{0,39}/;
    const descriotion = this.element.querySelector('.film-card__description');
    descriotion.text(descriotion.text().split(regular));

  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    document.body.classList.add('hide-overflow');
    this._callback.click();
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  setAllredyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#allredyWatchedClickHandler);
  };

  #allredyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  setFavoritesClickHandler = (callback) => {
    this._callback.favoritesClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoritesClickHandler);
  };

  #favoritesClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoritesClick();
  };
}
