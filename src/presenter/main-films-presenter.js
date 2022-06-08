import { remove, render } from '../framework/render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilmView from '../view/film-list-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoMovieView from '../view/no-movie-view.js';
import NewSortView from '../view/sort-view.js';
import MoviePresenter from './movie-presenter.js';
import {UserAction, UpdateType, SortType} from '../const.js';
import FiltersPresenter from './filters-presenter.js';

const SHOW_FILM_COUNT_STEP = 5;

export default class ContainerFilmsPresenter {

  #sectioinFilms = new NewSectionFilmsView();
  #containerListFilm = new ContainerListFilmView();
  #loadMoreButton = null;
  #noMovieText = new NoMovieView();
  #sort = null;
  #currentSort = SortType.DEFAULT;
  #placeContainer = null;
  #placePopupContainer = null;
  #movieModel = null;
  #renderedMovie = SHOW_FILM_COUNT_STEP;
  #moviePresenters = new Map();
  #commentsModal = null;
  #filtersModel = null;
  #filtersPresenter = null;

  constructor(placeContainer, placePopupContainer, movieModel, commentsModal, filtersModel) {
    this.#placeContainer = placeContainer;
    this.#placePopupContainer = placePopupContainer;
    this.#movieModel = movieModel;
    this.#commentsModal = commentsModal;
    this.#filtersModel = filtersModel;

    this.#movieModel.addObserver(this.#handleModelEvent);
    this.#commentsModal.addObserver(this.#handleModelCommentsEvent);
    this.#filtersModel.addObserver(this.#handleModelFiltersEvent);
  }

  get movies() {
    return this.#movieModel.movie;
  }

  #handlerViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this.#movieModel.updateMovie(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModal.deleteComment(updateType, update);
        break;
      case UserAction.FILTER_MOVIE:
        this.#filtersModel.changeFilter(updateType, update);
        break;
    }
  };
  /*
    1) Если попап не открыт, перерисовать доску
    2) Если попап открыть перерисовать доску после закрытия
    3) Доделать 2 другие кнопки
    4) Кнопка лоадморе не должна перерисовывать доску при нажатии на кнопку
  */

  #handleModelEvent = (updateType, updatedMovie) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#moviePresenters.get(updatedMovie.id).init(updatedMovie, true, true);
        break;
      case 'test':
        console.log('123');
        this.#handleModelFiltersEvent('MAJOR', this.#filtersModel.selectFilter);
        break;
    }
  };

  #handleModelCommentsEvent = (updateType, updatedComments) => {
    const movie = this.movies.find((currentMovie) => currentMovie.id === updatedComments.id);
    const movieWithComments = this.#createPaireMovieComment(movie);
    switch (updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:
        this.#moviePresenters.get(updatedComments.id).init(movieWithComments, true);
        break;
      case UpdateType.MAJOR:
        break;
    }
  };

  #handleModelFiltersEvent = (updateType, updatedFilters) => {
    console.log(updatedFilters, 'из мейна');
    // this.#moviePresenters.get(updatedMovie.id).init(updatedMovie, true);
    const filterMovie = this.movies.filter((movie) => movie.userDetails[updatedFilters]);
    switch (updateType) {
      case UpdateType.MAJOR:
        this.#clearBoardFilms(true, true);

        if (updatedFilters === 'all') {
          this.init();
          return;
        }
        this.#renderBoardFilms(filterMovie, updatedFilters);
        break;
    }
  };

  init = () => {
    this.#renderBoardFilms(this.movies);
  };

  #renderSort = () => {
    this.#sort = new NewSortView(this.#currentSort);
    render(this.#sort, this.#placeContainer);
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

  #renderBoardFilms = (renderMovies, currentFilter = 'All_movies') => {
    const movies = renderMovies.map((movie) => this.#createPaireMovieComment(movie));
    const movieCount = renderMovies.length;

    this.#filtersPresenter = new FiltersPresenter(this.#placeContainer, currentFilter, this.#handlerViewAction);
    this.#filtersPresenter.init(this.#movieModel.movie);
    this.#renderSort();

    if (movieCount === 0) {
      this.#renderNoMovie();
      return;
    }

    this.#renderSectionFilm();
    render(this.#containerListFilm, this.#sectioinFilms.element);
    this.#renderMovies(movies.slice(0, Math.min(movieCount, this.#renderedMovie)));

    if (movieCount > this.#renderedMovie) {
      this.#renderLoadMoreButton(() => {this.#handlerLoadMoreButtonClick(renderMovies);});
    }
  };

  #clearBoardFilms = (resetRenderedMovieCount = false, resetSortType = false) => {
    const movieCount = this.movies.length;
    this.#moviePresenters.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.clear();


    this.#filtersPresenter.removeFilters();
    remove(this.#sort);
    remove(this.#noMovieText);
    remove(this.#loadMoreButton);

    if (resetRenderedMovieCount) {
      this.#renderedMovie = SHOW_FILM_COUNT_STEP;
    } else {
      this.#renderedMovie = Math.min(movieCount, this.#renderedMovie);
    }

    if (resetSortType) {
      this.#currentSort = SortType.DEFAULT;
    }
  };

  #renderNoMovie = () => {
    render(this.#noMovieText, this.#placeContainer);
  };

  #renderLoadMoreButton = (cb) => {
    this.#loadMoreButton = new LoadMoreButtonView();
    render(this.#loadMoreButton, this.#sectioinFilms.element);
    this.#loadMoreButton.setClickHandler(cb);
  };


  #handlerLoadMoreButtonClick = (renderMoreMovie) => {
    const movieCount = renderMoreMovie.length;
    const newRenderedMovieCount = Math.min(movieCount, this.#renderedMovie + SHOW_FILM_COUNT_STEP);
    const movies = renderMoreMovie.slice(this.#renderedMovie, newRenderedMovieCount);
    const moviesWithComments = movies.map((movie) => this.#createPaireMovieComment(movie));
    this.#renderMovies(moviesWithComments);
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

