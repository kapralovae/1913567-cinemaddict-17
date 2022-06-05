import { remove, render } from '../framework/render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilmView from '../view/film-list-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoMovieView from '../view/no-movie-view.js';
import NewFilterView from '../view/filter-view.js';
import MoviePresenter from './movie-presenter.js';
import {UserAction, UpdateType, FilterType} from '../const.js';

const SHOW_FILM_COUNT_STEP = 5;

export default class ContainerFilmsPresenter {

  #sectioinFilms = new NewSectionFilmsView();
  #containerListFilm = new ContainerListFilmView();
  #loadMoreButton = null;
  #noMovieText = new NoMovieView();
  #filter = null;
  #currentFilter = FilterType.DEFAULT;
  #placeContainer = null;
  #placePopupContainer = null;
  #movieModel = null;
  #renderedMovie = SHOW_FILM_COUNT_STEP;
  #moviePresenters = new Map();
  #commentsModal = null;

  constructor(placeContainer, placePopupContainer, movieModel, commentsModal) {
    this.#placeContainer = placeContainer;
    this.#placePopupContainer = placePopupContainer;
    this.#movieModel = movieModel;
    this.#commentsModal = commentsModal;

    this.#movieModel.addObserver(this.#handleModelEvent);
    this.#commentsModal.addObserver(this.#handleModelCommentsEvent);
  }

  get movies() {
    return this.#movieModel.movie;
  }

  #handlerViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this.#movieModel.updateMovie(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModal.deleteComment(updateType, update);
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

  #handleModelCommentsEvent = (updateType, updatedComments) => {
    /*
      1) Надо найти фильм имея ид комента. ид ком = ид фильма
      4) Для каждого комментария порядковый номер по индексу в массиве
      5) дата атрибут посмотреть в попап вью.
      6) Соединить фильм и комменты и передать в инит и перерисовать с новыми коментами.
    */
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
    this.#renderBoardFilms();
  };

  #renderFilter = () => {
    this.#filter = new NewFilterView(this.#currentFilter);
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

  #renderMovies = (movies) => {
    movies.forEach((movie) => this.#renderMovie(movie));
  };

  #createPaireMovieComment = (movie) => {
    const commentsForFilm = this.#commentsModal.getCommentsById(movie.id);
    return {...movie, comments: commentsForFilm};
  };

  #renderBoardFilms = () => {
    const movies = this.movies.map((movie) => this.#createPaireMovieComment(movie));
    const movieCount = movies.length;

    this.#renderFilter();

    if (movieCount === 0) {
      this.#renderNoMovie();
      return;
    }

    this.#renderSectionFilm();
    render(this.#containerListFilm, this.#sectioinFilms.element);
    this.#renderMovies(movies.slice(0, Math.min(movieCount, this.#renderedMovie)));

    if (movieCount > this.#renderedMovie) {
      this.#renderLoadMoreButton();
    }
  };

  #clearBoardFilms = ({resetRenderedMovieCount = false, resetFilterType = false} = {}) => {
    const movieCount = this.movies.length;

    this.#moviePresenters.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.clear();

    remove(this.#filter);
    remove(this.#noMovieText);
    remove(this.#loadMoreButton);

    if (resetRenderedMovieCount) {
      this.#renderedMovie = SHOW_FILM_COUNT_STEP;
    } else {
      this.#renderedMovie = Math.min(movieCount, this.#renderedMovie);
    }

    if (resetFilterType) {
      this.#currentFilter = FilterType.DEFAULT;
    }
  };

  #renderNoMovie = () => {
    render(this.#noMovieText, this.#placeContainer);
  };

  #renderLoadMoreButton = () => {
    this.#loadMoreButton = new LoadMoreButtonView();
    render(this.#loadMoreButton, this.#sectioinFilms.element);
    this.#loadMoreButton.setClickHandler(this.#handlerLoadMoreButtonClick);
  };

  #handlerLoadMoreButtonClick = () => {
    const movieCount = this.movies.length;
    const newRenderedMovieCount = Math.min(movieCount, this.#renderedMovie + SHOW_FILM_COUNT_STEP);
    const movies = this.movies.slice(this.#renderedMovie, newRenderedMovieCount);

    this.#renderMovies(movies);
    this.#renderedMovie = newRenderedMovieCount;

    if (this.#renderedMovie >= movieCount) {
      this.#loadMoreButton.element.remove();
      this.#loadMoreButton.removeElement();
    }
  };

  #handleModalOpenned = () => {
    this.#moviePresenters.forEach((presenter) => presenter.resetModal());
  };


}

