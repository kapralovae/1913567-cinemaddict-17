import { remove, render } from '../framework/render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilmView from '../view/film-list-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoMovieView from '../view/no-movie-view.js';
import NewFilterView from '../view/filter-view.js';
import MoviePresenter from './movie-presenter.js';
import { updateItem } from '../util.js';

const SHOW_FILM_COUNT_STEP = 5;

export default class ContainerFilmsPresenter {

  #sectioinFilms = new NewSectionFilmsView();
  #containerListFilm = new ContainerListFilmView();
  #loadMoreButton = new LoadMoreButtonView();
  #noMovieText = new NoMovieView();
  #filter = new NewFilterView();
  #placeContainer = null;
  #placePopupContainer = null;
  #movieModel = null;
  #sectionMovie = [];
  #renderedMovie = SHOW_FILM_COUNT_STEP;
  #moviePresenter = new Map();

  constructor(placeContainer, placePopupContainer, movieModel) {
    this.#placeContainer = placeContainer;
    this.#placePopupContainer = placePopupContainer;
    this.#movieModel = movieModel;
  }

  init = () => {
    this.#renderFilter();

    this.#sectionMovie = [...this.#movieModel.movie];
    if (this.#sectionMovie.length === 0) {
      render(this.#noMovieText, this.#placeContainer);
    } else {
      this.#renderSectionFilm();
      render(this.#containerListFilm, this.#sectioinFilms.element);

      for (let i = 0; i < Math.min(this.#sectionMovie.length, SHOW_FILM_COUNT_STEP); i++) {
        this.#renderMovie(this.#sectionMovie[i]);
      }

      if (this.#sectionMovie.length > SHOW_FILM_COUNT_STEP) {
        render(this.#loadMoreButton, this.#sectioinFilms.element);
        this.#loadMoreButton.setClickHandler(this.#onLoadMoreButtonClick);
      }
    }
  };

  #renderFilter = () => {
    render(this.#filter, this.#placeContainer);
  };

  #renderSectionFilm = () => {
    render(this.#sectioinFilms, this.#placeContainer);
  };

  #renderMovie = (movie) => {
    const moviePresenter = new MoviePresenter(this.#containerListFilm.element, this.#placePopupContainer, this.#handleMovieChange);
    moviePresenter.init(movie);
    this.#moviePresenter.set(movie.idPresenter, moviePresenter);
  };

  #onLoadMoreButtonClick = () => {
    this.#sectionMovie
      .slice(this.#renderedMovie, this.#renderedMovie + SHOW_FILM_COUNT_STEP)
      .forEach((element) => this.#renderMovie(element));

    this.#renderedMovie += SHOW_FILM_COUNT_STEP;

    if (this.#renderedMovie >= this.#sectionMovie.length) {
      this.#loadMoreButton.element.remove();
      this.#loadMoreButton.removeElement();
    }
  };

  #clearMovieList = () => {
    this.#moviePresenter.forEach((presenter) => presenter.destroy());
    this.#moviePresenter.clear();
    this.#renderedMovie = SHOW_FILM_COUNT_STEP;
    remove(this.#loadMoreButton);
  };

  #handleMovieChange = (updatedMovie) => {
    this.#sectionMovie = updateItem(this.#sectionMovie, updatedMovie);
    this.#moviePresenter.get(updatedMovie.idPresenter).init(updatedMovie, true);
  };
}

