import { render } from '../framework/render.js';
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

    render (this.#movieComponent, this.#containerListFilm);
  };

  #onCloseButtonPopupClick = () => {
    this.#popupComponent.element.remove();
    this.#popupComponent.removeElement();
  };

}
