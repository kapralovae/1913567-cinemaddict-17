import {createElement} from '../render.js';
import { humanizeDate } from '../util.js';


const createCardFilm = (movie) => {
  const {filmInfo, id, comments} = movie;

  return (`
  <article class="film-card">
    <a class="film-card__link">
      <p style="display:none">${id}</p>
      <h3 class="film-card__title">${filmInfo.title}</h3>
      <p class="film-card__rating">${filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${humanizeDate(filmInfo.release.date)}</span>
        <span class="film-card__duration">54m</span>
        <span class="film-card__genre">Western</span>
      </p>
      <img src="./${filmInfo.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${filmInfo.description}</p>
      <span class="film-card__comments">${comments.length} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`);
};

export default class NewCardFilmView {

  constructor(movie) {
    this.movie = movie;
  }

  getTemplate() {
    return createCardFilm(this.movie);
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
