import { render, RenderPosition } from '../render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilmView from '../view/film-list-container-view.js';
import NewCardFilmView from '../view/card-film-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NewCommentView from '../view/comment-in-popup-view.js';


export default class ContainerFilmsPresenter {

  sectioinFilms = new NewSectionFilmsView();
  containerListFilm = new ContainerListFilmView();
  // newComments = new NewCommentView;


  init = (placeContainer, movieModel) => {
    this.placeContainer = placeContainer;
    this.movieModel = movieModel;
    this.sectionMovie = [...this.movieModel.getMovie()];
    // this.sectionComment = [...this.movieModel.getComment()];


    render(this.sectioinFilms, this.placeContainer);
    render(this.containerListFilm, this.sectioinFilms.getElement());
    // render(this.containerListComments, this);

    for (let i = 0; i < this.sectionMovie.length; i++) {
      render(new NewCardFilmView(this.sectionMovie[i]), this.containerListFilm.getElement());

    }
    render(new LoadMoreButtonView(), this.sectioinFilms.getElement());


  };

  pasteComments = (place, commentsModel) => {
    this.place = place;
    this.commentsModel = commentsModel;
    this.sectionComment = [...this.commentsModel.getComment()];

    for (let i = 0; i < this.sectionComment.length; i++) {
      render(new NewCommentView(this.sectionComment[i]), this.place, RenderPosition.BEFOREEND);
    }

  };
}
