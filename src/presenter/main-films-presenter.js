import { render } from '../framework/render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilmView from '../view/film-list-container-view.js';
import NewCardFilmView from '../view/card-film-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NewPopupFilmView from '../view/popup-film-view.js';
import NoMovieView from '../view/no-movie-view.js';
import NewFilterView from '../view/filter-view.js';

const SHOW_FILM_COUNT_STEP = 5;

export default class ContainerFilmsPresenter {

  #sectioinFilms = new NewSectionFilmsView();
  #containerListFilm = new ContainerListFilmView();
  #loadMoreButton = new LoadMoreButtonView();
  #placeContainer = null;
  #placePopupContainer = null;
  #movieModel = null;
  #sectionMovie = [];
  #renderedMovie = SHOW_FILM_COUNT_STEP;

  constructor(placeContainer, placePopupContainer, movieModel) {
    this.#placeContainer = placeContainer;
    this.#placePopupContainer = placePopupContainer;
    this.#movieModel = movieModel;
  }

  #createMovie = (movie) => {
    const movieComponent = new NewCardFilmView(movie);
    render(movieComponent, this.#containerListFilm.element);
    const popupComponent = new NewPopupFilmView(movie);

    const onCloseButtonPopupClick = () => {
      popupComponent.element.remove();
      popupComponent.removeElement();
    };

    movieComponent.setClickHandler(()=>{
      render(popupComponent, this.#placePopupContainer);
      popupComponent.setClickCloseHandler(onCloseButtonPopupClick);
    });
  };

  init = () => {
    this.#sectionMovie = [...this.#movieModel.movie];
    this.#renderMovie();
  };

  #renderMovie = () => {

    if (this.#sectionMovie.length === 0) {
      render(new NoMovieView(), this.#placeContainer);
    } else {
      render(new NewFilterView(), this.#placeContainer);
      render(this.#sectioinFilms, this.#placeContainer);
      render(this.#containerListFilm, this.#sectioinFilms.element);
    }

    for (let i = 0; i < Math.min(this.#sectionMovie.length, SHOW_FILM_COUNT_STEP); i++) {
      this.#createMovie(this.#sectionMovie[i]);
    }

    if (this.#sectionMovie.length > SHOW_FILM_COUNT_STEP) {
      render(this.#loadMoreButton, this.#sectioinFilms.element);
      this.#loadMoreButton.setClickHandler(this.#onLoadMoreButtonClick);
    }
  };

  #onLoadMoreButtonClick = () => {
    this.#sectionMovie
      .slice(this.#renderedMovie, this.#renderedMovie + SHOW_FILM_COUNT_STEP)
      .forEach((element) => this.#createMovie(element));

    this.#renderedMovie += SHOW_FILM_COUNT_STEP;

    if (this.#renderedMovie >= this.#sectionMovie.length) {
      this.#loadMoreButton.element.remove();
      this.#loadMoreButton.removeElement();
    }
  };
}

