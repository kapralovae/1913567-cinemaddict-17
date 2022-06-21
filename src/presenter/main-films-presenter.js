import { remove, render } from '../framework/render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilmView from '../view/film-list-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoMovieView from '../view/no-movie-view.js';
import MoviePresenter from './movie-presenter.js';
import {UserAction, UpdateType, SortType} from '../const.js';
import FiltersPresenter from './filters-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import SortPresenter from './sort-presenter.js';

const SHOW_FILM_COUNT_STEP = 5;
const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class ContainerFilmsPresenter {

  #sectioinFilms = new NewSectionFilmsView();
  #containerListFilm = new ContainerListFilmView();
  #loadMoreButton = null;
  #noMovieText = null;
  #placeContainer = null;
  #placePopupContainer = null;
  #movieModel = null;
  #renderedMovie = SHOW_FILM_COUNT_STEP;
  #moviePresenters = new Map();
  #commentsModel = null;
  #filtersModel = null;
  #filtersPresenter = null;
  #filterType = 'all';
  #sortPresenter = null;
  #currentSort = SortType.DEFAULT;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #sortModel = null;
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);


  constructor(placeContainer, placePopupContainer, movieModel, commentsModel, filtersModel, sortModel) {
    this.#placeContainer = placeContainer;
    this.#placePopupContainer = placePopupContainer;
    this.#filtersModel = filtersModel;
    this.#movieModel = movieModel;
    this.#commentsModel = commentsModel;
    this.#sortModel = sortModel;

    this.#movieModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelCommentsEvent);
    this.#filtersModel.addObserver(this.#handleModelFiltersEvent);
    this.#sortModel.addObserver(this.#handleModelSortEvent);
  }

  get movies() {
    return this.#movieModel.movie;
  }

  #handlerViewAction = async (actionType, updateType, update) => {
    // this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this.#movieModel.updateMovie(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#moviePresenters.get(update.id).setDeleting(update.deletedComment.id);
        try {
          await this.#commentsModel.deleteComment(updateType, update);
        } catch(err) {
          this.#moviePresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_COMMENT:
        this.#moviePresenters.get(update.idMovie).setSending();
        try {
          await this.#commentsModel.addComment(updateType, update);
        } catch(err) {
          this.#moviePresenters.get(update.idMovie).setAborting();
        }
        break;
      case UserAction.FILTER_MOVIE:
        this.#filtersModel.changeFilter(updateType, update);
        break;
      case UserAction.SORT_MOVIE:
        this.#sortModel.changeSort(updateType, update);
        break;
      case UserAction.CLOSE_POPUP:
        this.#handleModelFiltersEvent('MAJOR', this.#filterType, false);
        break;
    }
    // this.#uiBlocker.unblock();
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
    let movie;
    switch (updateType) {
      case UpdateType.PATCH:
        movie = this.#getMovieById(updatedComments.movie.id);
        movie.comments = updatedComments.movie.comments;
        this.#moviePresenters.get(updatedComments.movie.id).init(movie, true);
        break;
      case UpdateType.MINOR:
        movie = this.#getMovieById(updatedComments.id);
        movie.comments = movie.comments.filter((commId) => commId !== updatedComments.deletedComment.id);
        this.#moviePresenters.get(updatedComments.id).init(movie, true);
        break;
      case UpdateType.INITCOMMENT:
        this.init();
        break;
    }
  };

  #getMovieById = (idMovie) => {
    const movie = this.movies.find((currentMovie) => currentMovie.id === idMovie );
    return movie;
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

  #handleModelSortEvent = (updateType, updatedSort, resetRenderedMovieCount = true) => {
    const sortMovie = this.#sortMovie(updatedSort);
    this.#currentSort = updatedSort;
    switch (updatedSort) {
      case SortType.DEFAULT:
        this.#clearBoardFilms(resetRenderedMovieCount);
        this.init();
        break;
      case SortType.DATE:
        this.#clearBoardFilms(resetRenderedMovieCount);
        this.#renderBoardFilms(sortMovie, true);
        break;
      case SortType.RATING:
        this.#clearBoardFilms(resetRenderedMovieCount);
        this.#renderBoardFilms(sortMovie, true);
        break;
    }
  };

  #sortMovie = (sortType) => {
    const moviq = [...this.movies];
    if (sortType === SortType.DATE) {

      return moviq.sort((a, b) => (a.filmInfo.release.date < b.filmInfo.release.date) ? 1 : -1);
    }
    if (sortType === SortType.RATING) {
      return moviq.sort((a, b) => (a.filmInfo.totalRating < b.filmInfo.totalRating) ? 1 : -1);
    }

    this.#currentSort = sortType;
  };


  init = () => {
    this.#renderBoardFilms(this.movies);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#placeContainer);
  };

  #renderSort = () => {
    this.#sortPresenter = new SortPresenter(this.#placeContainer, this.#currentSort, this.#handlerViewAction);
    this.#sortPresenter.init();
  };

  #renderSectionFilm = () => {
    render(this.#sectioinFilms, this.#placeContainer);
  };

  #renderMovie = (movie) => {
    const moviePresenter = new MoviePresenter(this.#containerListFilm.element, this.#placePopupContainer, this.#handlerViewAction, this.#handleModalOpenned, movie, this.#commentsModel);
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
      this.#sortPresenter = new SortPresenter(this.#placeContainer, this.#currentSort, this.#handlerViewAction);
      this.#sortPresenter.init();
      this.#renderLoading();
      return;
    }
    this.#filtersPresenter.removeFilters();
    this.#filtersPresenter = new FiltersPresenter(this.#placeContainer, this.#filterType, this.#handlerViewAction);
    this.#filtersPresenter.init(this.#movieModel.movie);
    remove(this.#loadingComponent);
    // this.#renderSort();
    this.#sortPresenter.removeSort();
    this.#sortPresenter = new SortPresenter(this.#placeContainer, this.#currentSort, this.#handlerViewAction);
    this.#sortPresenter.init();

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
    this.#sortPresenter.removeSort();
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

