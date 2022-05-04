import { render, RenderPosition } from '../render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilmView from '../view/film-list-container-view.js';
import NewCardFilmView from '../view/card-film-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NewCommentView from '../view/comment-in-popup-view.js';
import NewPopupFilmView from '../view/popup-film-view.js';

export default class ContainerFilmsPresenter {

  #sectioinFilms = new NewSectionFilmsView();
  #containerListFilm = new ContainerListFilmView();
  #placeContainer = null;
  #movieModel = null;
  #sectionMovie = [];

  #renderMovie = (movie) => {
    const movieComponent = new NewCardFilmView(movie);
    render(movieComponent, this.#containerListFilm.element);
    movieComponent.element.querySelector('a').addEventListener('click', () => {
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

  init = (placeContainer, movieModel) => {
    this.#placeContainer = placeContainer;
    this.#movieModel = movieModel;
    this.#sectionMovie = [...this.#movieModel.movie];

    render(this.#sectioinFilms, this.#placeContainer);
    render(this.#containerListFilm, this.#sectioinFilms.element);

    for (let i = 0; i < this.#sectionMovie.length; i++) {
      this.#renderMovie(this.#sectionMovie[i]);
    }

    render(new LoadMoreButtonView(), this.#sectioinFilms.element);
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
}
