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


  constructor(containerListFilm, placePopupContainer, changeData) {
    this.#containerListFilm = containerListFilm;
    this.#placePopupContainer = placePopupContainer;
    this.#changeData = changeData;
  }

  init = (movie, reinit) => {
    this.#movie = movie;
    const prevMovieComponent = this.#movieComponent;
    const prevPopupComponent = this.#popupComponent;
    this.#movieComponent = new NewCardFilmView(movie);
    this.#popupComponent = new NewPopupFilmView(movie);

    this.#movieComponent.setClickHandler(()=>{
      render(this.#popupComponent, this.#placePopupContainer);
      this.#modalOpened = true;
      this.setHandlersButtonOpenModal();
    });

    if (this.#modalOpened === true && reinit === true) {
      this.setHandlersButtonOpenModal();
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
    }

    remove(prevMovieComponent);
    remove(prevPopupComponent);
  };

  setHandlersButtonOpenModal = () => {
    this.#popupComponent.setWatchlistClickHandler(this.#handlerWatchlistClick);
    this.#popupComponent.setAllredyWatchedClickHandler(this.#handlerAllredyWatchedClick);
    this.#popupComponent.setFavoritesClickHandler(this.#handlerFavoritesClick);
    this.#popupComponent.setClickCloseHandler(this.#onCloseButtonPopupClick);
  };

  destroy = () => {
    remove(this.#movieComponent);
    remove(this.#popupComponent);
  };

  #onCloseButtonPopupClick = () => {
    this.#modalOpened = false;
    this.#popupComponent.element.remove();
    this.#popupComponent.removeElement();
  };

  #handlerWatchlistClick = () => {
    this.#changeData({...this.#movie, userDetails: {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist}});
  };

  #handlerAllredyWatchedClick = () => {
    this.#changeData({...this.#movie, userDetails: {...this.#movie.userDetails, alreadyWatched: !this.#movie.userDetails.alreadyWatched}});
  };

  #handlerFavoritesClick = () => {
    this.#changeData({...this.#movie, userDetails: {...this.#movie.userDetails, favorite: !this.#movie.userDetails.favorite}});
  };
}