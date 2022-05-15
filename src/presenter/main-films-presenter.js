import { render } from '../framework/render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilmView from '../view/film-list-container-view.js';
// import NewCardFilmView from '../view/card-film-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
// import NewPopupFilmView from '../view/popup-film-view.js';
import NoMovieView from '../view/no-movie-view.js';
import NewFilterView from '../view/filter-view.js';
import MoviePresenter from './movie-presenter.js';

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
  #sectionMovie = [];
  #renderedMovie = SHOW_FILM_COUNT_STEP;

  constructor(placeContainer, placePopupContainer, movieModel) {
    this.#placeContainer = placeContainer;
    this.#placePopupContainer = placePopupContainer;
    this.#movieModel = movieModel;
  }

  // #createMovie = (movie) => {
  //   const movieComponent = new NewCardFilmView(movie);
  //   render(movieComponent, this.#containerListFilm.element);
  //   const popupComponent = new NewPopupFilmView(movie);

  //   const onCloseButtonPopupClick = () => {
  //     popupComponent.element.remove();
  //     popupComponent.removeElement();
  //   };

  //   movieComponent.setClickHandler(()=>{
  //     render(popupComponent, this.#placePopupContainer);
  //     popupComponent.setClickCloseHandler(onCloseButtonPopupClick);
  //   });
  // };

  init = () => {
    this.#renderFilter();

    this.#sectionMovie = [...this.#movieModel.movie];
    if (this.#sectionMovie.length === 0) {
      render(this.#noMovieText, this.#placeContainer);
    } else {
      this.#renderSectionFilm();
      render(this.#containerListFilm, this.#sectioinFilms.element);

      for (let i = 0; i < Math.min(this.#sectionMovie.length, SHOW_FILM_COUNT_STEP); i++) {
        this.#renderMovie(this.#sectionMovie[i]);
      }

      if (this.#sectionMovie.length > SHOW_FILM_COUNT_STEP) {
        render(this.#loadMoreButton, this.#sectioinFilms.element);
        this.#loadMoreButton.setClickHandler(this.#onLoadMoreButtonClick);
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

    // if (this.#sectionMovie.length === 0) {
    //   render(this.#noMovieText, this.#placeContainer);
    // } else {
    const moviePresenter = new MoviePresenter(this.#containerListFilm.element, this.#placePopupContainer);
    // for (let i = 0; i <= this.#sectionMovie.length - 1; i++) {
    moviePresenter.init(movie);
    // }
    // }

    // for (let i = 0; i < Math.min(this.#sectionMovie.length, SHOW_FILM_COUNT_STEP); i++) {
    //   this.#createMovie(this.#sectionMovie[i]);
    // }

    // if (this.#sectionMovie.length > SHOW_FILM_COUNT_STEP) {
    //   render(this.#loadMoreButton, this.#sectioinFilms.element);
    //   this.#loadMoreButton.setClickHandler(this.#onLoadMoreButtonClick);
    // }
  };

  #onLoadMoreButtonClick = () => {
    this.#sectionMovie
      .slice(this.#renderedMovie, this.#renderedMovie + SHOW_FILM_COUNT_STEP)
      .forEach((element) => this.#renderMovie(element));

    this.#renderedMovie += SHOW_FILM_COUNT_STEP;

    if (this.#renderedMovie >= this.#sectionMovie.length) {
      this.#loadMoreButton.element.remove();
      this.#loadMoreButton.removeElement();
    }
  };
}

