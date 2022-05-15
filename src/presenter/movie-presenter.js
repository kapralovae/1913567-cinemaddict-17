import { remove, render, replace } from '../framework/render.js';
import NewCardFilmView from '../view/card-film-view.js';
import NewPopupFilmView from '../view/popup-film-view.js';

export default class MoviePresenter {
  #containerListFilm = null;
  #placePopupContainer = null;
  #movieComponent = null;
  #popupComponent = null;

  constructor(containerListFilm, placePopupContainer) {
    this.#containerListFilm = containerListFilm;
    this.#placePopupContainer = placePopupContainer;
  }

  init = (movie) => {
    const prevMovieComponent = this.#movieComponent;
    const prevPopupComponent = this.#popupComponent;
    this.#movieComponent = new NewCardFilmView(movie);
    this.#popupComponent = new NewPopupFilmView(movie);

    this.#movieComponent.setClickHandler(()=>{
      render(this.#popupComponent, this.#placePopupContainer);
      this.#popupComponent.setClickCloseHandler(this.#onCloseButtonPopupClick);
    });

    this.#movieComponent.setClickHandler(()=>{
      render(this.#popupComponent, this.#placePopupContainer);
      this.#popupComponent.setClickCloseHandler(this.#onCloseButtonPopupClick);
    });

    if (prevMovieComponent === null || prevPopupComponent === null) {
      render (this.#movieComponent, this.#containerListFilm);
      return;
    }

    if (this.#movieComponent.contains(prevMovieComponent.element)) {
      replace(this.#movieComponent, prevMovieComponent);
    }

    if (this.#popupComponent.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevMovieComponent);
    remove(prevPopupComponent);
  };

  destroy = () => {
    remove(this.#movieComponent);
    remove(this.#popupComponent);
  };

  #onCloseButtonPopupClick = () => {
    this.#popupComponent.element.remove();
    this.#popupComponent.removeElement();
  };

}
