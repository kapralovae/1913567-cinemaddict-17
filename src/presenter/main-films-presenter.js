import { render, RenderPosition } from '../framework/render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilmView from '../view/film-list-container-view.js';
import NewCardFilmView from '../view/card-film-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NewCommentView from '../view/comment-in-popup-view.js';
import NewPopupFilmView from '../view/popup-film-view.js';
import NoMovieView from '../view/no-movie-view.js';
import NewFilterView from '../view/filter-view.js';

const SHOW_FILM_COUNT_STEP = 5;

export default class ContainerFilmsPresenter {

  #sectioinFilms = new NewSectionFilmsView();
  #containerListFilm = new ContainerListFilmView();
  #loadMoreButton = new LoadMoreButtonView();
  #placeContainer = null;
  #movieModel = null;
  #sectionMovie = [];
  #renderedMovie = SHOW_FILM_COUNT_STEP;
  #main = document.querySelector('main');

  constructor(placeContainer, movieModel) {
    this.#placeContainer = placeContainer;
    this.#movieModel = movieModel;
  }

  #createMovie = (movie) => {
    const movieComponent = new NewCardFilmView(movie);
    render(movieComponent, this.#containerListFilm.element);
    movieComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      const popupComponent = new NewPopupFilmView(movie);
      render(popupComponent, document.body, RenderPosition.BEFOREEND);
      const commentList = document.querySelector('.film-details__comments-list');
      this.pasteComments(commentList, movie);
      document.body.classList.add('hide-overflow');

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          document.body.classList.remove('hide-overflow');
          document.body.removeChild(document.body.querySelector('.film-details'));
          popupComponent.removeElement();
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };

      popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
        document.body.classList.remove('hide-overflow');
        document.body.removeChild(document.body.querySelector('.film-details'));
        popupComponent.removeElement();
        document.removeEventListener('keydown', onEscKeyDown);
      });
      document.addEventListener('keydown', onEscKeyDown);
    });
  };

  init = () => {

    this.#sectionMovie = [...this.#movieModel.movie];
    //this.#sectionMovie = []; //Проверка заглушки при отсутствии карточек.
    this.#renderMovie();
  };

  #renderMovie = () => {

    if (this.#sectionMovie.length === 0) {
      render(new NoMovieView(), this.#placeContainer);
    } else {
      render(new NewFilterView(), this.#main, RenderPosition.BEFOREEND );
      render(this.#sectioinFilms, this.#placeContainer);
      render(this.#containerListFilm, this.#sectioinFilms.element);
    }

    for (let i = 0; i < Math.min(this.#sectionMovie.length, SHOW_FILM_COUNT_STEP); i++) {
      this.#createMovie(this.#sectionMovie[i]);
    }

    if (this.#sectionMovie.length > SHOW_FILM_COUNT_STEP) {
      render(this.#loadMoreButton, this.#sectioinFilms.element);
      this.#loadMoreButton.element.addEventListener('click', this.#onLoadMoreButtonClick);
    }
  };

  #place = null;
  #commentsModel = null;
  #sectionComment = [];

  pasteComments = (place, commentsModel) => {
    this.#place = place;
    this.#commentsModel = commentsModel;
    this.#sectionComment = [...this.#commentsModel.comments];

    for (let i = 0; i < this.#sectionComment.length; i++) {
      render(new NewCommentView(this.#sectionComment[i]), this.#place, RenderPosition.BEFOREEND);
    }
  };

  #onLoadMoreButtonClick = (evt) => {
    evt.preventDefault();
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

