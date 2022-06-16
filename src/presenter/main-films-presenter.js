import { remove, render } from '../framework/render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilmView from '../view/film-list-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoMovieView from '../view/no-movie-view.js';
import NewSortView from '../view/sort-view.js';
import MoviePresenter from './movie-presenter.js';
import {UserAction, UpdateType, SortType} from '../const.js';
import FiltersPresenter from './filters-presenter.js';
import LoadingView from '../view/loading-view.js';

const SHOW_FILM_COUNT_STEP = 5;

export default class ContainerFilmsPresenter {

  #sectioinFilms = new NewSectionFilmsView();
  #containerListFilm = new ContainerListFilmView();
  #loadMoreButton = null;
  #noMovieText = null;
  #sort = null;
  #currentSort = SortType.DEFAULT;
  #placeContainer = null;
  #placePopupContainer = null;
  #movieModel = null;
  #renderedMovie = SHOW_FILM_COUNT_STEP;
  #moviePresenters = new Map();
  #commentsModel = null;
  #filtersModel = null;
  #filtersPresenter = null;
  #filterType = 'all';
  #loadingComponent = new LoadingView();
  #isLoading = true;


  constructor(placeContainer, placePopupContainer, movieModel, commentsModel, filtersModel) {
    this.#placeContainer = placeContainer;
    this.#placePopupContainer = placePopupContainer;
    this.#filtersModel = filtersModel;
    this.#movieModel = movieModel;
    this.#commentsModel = commentsModel;

    this.#movieModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelCommentsEvent);
    this.#filtersModel.addObserver(this.#handleModelFiltersEvent);
  }

  get movies() {
    return this.#movieModel.movie;
  }

  #handlerViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this.#movieModel.updateMovie(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update);
        break;
      case UserAction.FILTER_MOVIE:
        this.#filtersModel.changeFilter(updateType, update);
        break;
      case UserAction.CLOSE_POPUP:
        this.#handleModelFiltersEvent('MAJOR', this.#filterType, false);
        break;
    }
  };

  #handleModelEvent = (updateType, updatedMovie) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#moviePresenters.get(updatedMovie.id).init(updatedMovie, true);
        break;
      case UpdateType.MINOR:
        this.#handleModelFiltersEvent('MAJOR', this.#filterType, false);
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        // this.init();
        break;
    }
  };

  #handleModelCommentsEvent = (updateType, updatedComments) => {
    switch (updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:
        console.log('tut');
          const movie = this.movies.find((currentMovie) => currentMovie.id === updatedComments.id);
          console.log(updatedComments);
        this.#moviePresenters.get(updatedComments.id).init(movie, true);
        break;
      case UpdateType.INITCOMMENT:
        this.init();
        break;
    }
  };

  #handleModelFiltersEvent = (updateType, updatedFilters, resetRenderedMovieCount = true) => {
    const filterMovie = this.movies.filter((movie) => movie.userDetails[updatedFilters]);
    this.#filterType = updatedFilters;
    switch (updateType) {
      case UpdateType.MAJOR:
        this.#clearBoardFilms(resetRenderedMovieCount);
        if (updatedFilters === 'all') {
          this.init();
          return;
        }
        this.#renderBoardFilms(filterMovie);
        break;
    }
  };

  init = () => {
    this.#renderBoardFilms(this.movies);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#placeContainer);
  };

  #renderSort = () => {
    this.#sort = new NewSortView(this.#currentSort);
    render(this.#sort, this.#placeContainer);
  };

  #renderSectionFilm = () => {
    render(this.#sectioinFilms, this.#placeContainer);
  };

  #renderMovie = (movie) => {
    const moviePresenter = new MoviePresenter(this.#containerListFilm.element, this.#placePopupContainer, this.#handlerViewAction, this.#handleModalOpenned, movie, this.#commentsModel.comment);
    moviePresenter.init(movie);
    this.#moviePresenters.set(movie.id, moviePresenter);
  };

  #renderMovies = (movies) => {
    movies.forEach((movie) => this.#renderMovie(movie));
  };

  #renderBoardFilms = (renderMovies) => {
    const movieCount = renderMovies.length;

    if (this.#isLoading) {
      this.#filtersPresenter = new FiltersPresenter(this.#placeContainer, this.#filterType, this.#handlerViewAction);
      this.#filtersPresenter.init(this.#movieModel.movie);
      this.#renderLoading();
      return;
    }
    this.#filtersPresenter.removeFilters();
    this.#filtersPresenter = new FiltersPresenter(this.#placeContainer, this.#filterType, this.#handlerViewAction);
    this.#filtersPresenter.init(this.#movieModel.movie);
    remove(this.#loadingComponent);
    this.#renderSort();

    if (movieCount === 0) {
      this.#renderNoMovie();
      return;
    }

    this.#renderSectionFilm();
    render(this.#containerListFilm, this.#sectioinFilms.element);
    this.#renderMovies(renderMovies.slice(0, Math.min(movieCount, this.#renderedMovie)));

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

    if (this.#noMovieText) {
      remove(this.#noMovieText);
    }

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
    this.#noMovieText = new NoMovieView(this.#filtersModel.selectFilter);
    render(this.#noMovieText, this.#placeContainer);
    remove(this.#loadingComponent);
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

