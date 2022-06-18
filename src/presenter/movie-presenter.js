import { UpdateType, UserAction } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import NewCardFilmView from '../view/card-film-view.js';
import NewPopupFilmView from '../view/popup-film-view.js';

export default class MoviePresenter {
  #containerListFilm = null;
  #placePopupContainer = null;
  #movieComponent = null;
  #popupComponent = null;
  #changeData = null;
  #movie = null;
  #modalOpened = false;
  #modalOpennedCallback = null;
  #comments = null;

  constructor(containerListFilm, placePopupContainer, changeData, modalOpennedCallback, movie, comments) {
    this.#containerListFilm = containerListFilm;
    this.#placePopupContainer = placePopupContainer;
    this.#changeData = changeData;
    this.#modalOpennedCallback = modalOpennedCallback;
    this.#movie = movie;
    this.#comments = comments;
  }


  init = (movie, reinit = false) => {
    this.#movie = movie;
    const prevMovieComponent = this.#movieComponent;
    const prevPopupComponent = this.#popupComponent;
    this.#movieComponent = new NewCardFilmView(movie);
    this.#popupComponent = new NewPopupFilmView(movie, this.#comments);

    this.#movieComponent.setClickHandler(() => {
      this.#modalOpennedCallback();
      this.#modalOpened = true;
      render(this.#popupComponent, this.#placePopupContainer);
      this.setOpenModalHandlers();
    });

    if (this.#modalOpened === true && reinit === true) {
      this.setOpenModalHandlers();
    }

    this.#movieComponent.setWatchlistClickHandler(this.#handlerWatchlistClick);
    this.#movieComponent.setAllredyWatchedClickHandler(this.#handlerAllredyWatchedClick);
    this.#movieComponent.setFavoritesClickHandler(this.#handlerFavoritesClick);

    if (prevMovieComponent === null || prevPopupComponent === null) {
      render (this.#movieComponent, this.#containerListFilm);
      return;
    }

    if (this.#containerListFilm.contains(prevMovieComponent.element)) {
      replace(this.#movieComponent, prevMovieComponent);
    }

    if (this.#placePopupContainer.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
      this.#popupComponent.element.scroll({
        top : this.popupScrollPosition,
      });
    }

    remove(prevMovieComponent);
    remove(prevPopupComponent);
  };


  setOpenModalHandlers = () => {
    this.#popupComponent.setWatchlistClickHandler(this.#handlerWatchlistClick);
    this.#popupComponent.setAllredyWatchedClickHandler(this.#handlerAllredyWatchedClick);
    this.#popupComponent.setFavoritesClickHandler(this.#handlerFavoritesClick);
    this.#popupComponent.setClickCloseHandler(this.#onCloseButtonPopupClick);
    this.#popupComponent.setClickDeleteMessageHandler(this.#handlerDeleteMessageClick);
  };

  resetModal = () => {
    remove(this.#popupComponent);
    this.#modalOpened = false;
  };

  destroy = () => {
    remove(this.#movieComponent);
    remove(this.#popupComponent);
  };

  #onCloseButtonPopupClick = () => {
    this.#modalOpened = false;
    this.#popupComponent.element.remove();
    this.#popupComponent.removeElement();
    this.#changeData(
      UserAction.CLOSE_POPUP,
      UpdateType.MINOR,
      this.#movie,
    );
  };

  #saveScrollPosition = () => {
    this.popupScrollPosition = this.#popupComponent.element.scrollTop;
    this.#popupComponent.element.scroll({
      top : this.popupScrollPosition,
    });
  };

  #handlerWatchlistClick = () => {
    this.#saveScrollPosition();
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      this.#modalOpened ? UpdateType.PATCH : UpdateType.MINOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist}},
    );
  };

  #handlerAllredyWatchedClick = () => {
    this.#saveScrollPosition();
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      this.#modalOpened ? UpdateType.PATCH : UpdateType.MINOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails, alreadyWatched: !this.#movie.userDetails.alreadyWatched}},
    );
  };

  #handlerFavoritesClick = () => {
    this.#saveScrollPosition();
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      this.#modalOpened ? UpdateType.PATCH : UpdateType.MINOR,
      {...this.#movie, userDetails: {...this.#movie.userDetails, favorite: !this.#movie.userDetails.favorite}},
    );
  };

  #handlerDeleteMessageClick = (idUniq) => {
    this.#saveScrollPosition();
    const deletedComment = this.#comments.find((comment) => comment.id === idUniq);
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.MINOR,
      {id : this.#movie.id,
        deletedComment},
    );
  };

}
