import { remove, render } from '../framework/render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilmView from '../view/film-list-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoMovieView from '../view/no-movie-view.js';
import NewFilterView from '../view/filter-view.js';
import MoviePresenter from './movie-presenter.js';
import {UserAction, UpdateType} from '../const.js';


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
  #renderedMovie = SHOW_FILM_COUNT_STEP;
  #moviePresenters = new Map();

  constructor(placeContainer, placePopupContainer, movieModel) {
    this.#placeContainer = placeContainer;
    this.#placePopupContainer = placePopupContainer;
    this.#movieModel = movieModel;

    this.#movieModel.addObserver(this.#handleModelEvent);
  }

  get movies() {
    return this.#movieModel.movie;
  }

  #handlerViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this.#movieModel.updateMovie(updateType, update);
        break;
      case UserAction.ADD_MOVIE:
        this.#movieModel.addMovie(updateType, update);
        break;
      case UserAction.DELETE_MOVIE:
        this.#movieModel.deleteMovie(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, updatedMovie) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#moviePresenters.get(updatedMovie.id).init(updatedMovie, true);
        break;
      case UpdateType.MINOR:
        break;
      case UpdateType.MAJOR:
        break;
    }
  };


  init = () => {

    this.#renderFilter();


    if (this.movies.length === 0) {
      render(this.#noMovieText, this.#placeContainer);
    } else {
      this.#renderSectionFilm();
      render(this.#containerListFilm, this.#sectioinFilms.element);

      for (let i = 0; i < Math.min(this.movies.length, SHOW_FILM_COUNT_STEP); i++) {
        this.#renderMovie(this.movies[i]);
      }

      if (this.movies.length > SHOW_FILM_COUNT_STEP) {
        render(this.#loadMoreButton, this.#sectioinFilms.element);
        this.#loadMoreButton.setClickHandler(this.#handlerLoadMoreButtonClick);
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
    const moviePresenter = new MoviePresenter(this.#containerListFilm.element, this.#placePopupContainer, this.#handlerViewAction, this.#handleModalOpenned);
    moviePresenter.init(movie);
    this.#moviePresenters.set(movie.id, moviePresenter);
  };

  #handlerLoadMoreButtonClick = () => {
    this.movies
      .slice(this.#renderedMovie, this.#renderedMovie + SHOW_FILM_COUNT_STEP)
      .forEach((element) => this.#renderMovie(element));

    this.#renderedMovie += SHOW_FILM_COUNT_STEP;

    if (this.#renderedMovie >= this.movies.length) {
      this.#loadMoreButton.element.remove();
      this.#loadMoreButton.removeElement();
    }
  };

  #handleModalOpenned = () => {
    this.#moviePresenters.forEach((presenter) => presenter.resetModal());
  };


  #clearMovieList = () => {
    this.#moviePresenters.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.clear();
    this.#renderedMovie = SHOW_FILM_COUNT_STEP;
    remove(this.#loadMoreButton);
  };

  // #handleMovieChange = (updatedMovie) => {
  //   this.movies = updateItem(this.movies, updatedMovie);
  //   this.#moviePresenters.get(updatedMovie.id).init(updatedMovie, true);
  // };
}

