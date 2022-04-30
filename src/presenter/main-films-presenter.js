import { render } from '../render.js';
// import { RenderPosition } from '../render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilmView from '../view/film-list-container-view.js';
import NewCardFilmView from '../view/card-film-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';


export default class ContainerFilmsPresenter {

  sectioinFilms = new NewSectionFilmsView;
  containerListFilm = new ContainerListFilmView;

  init = (placeContainer, movieModel) => {
    this.placeContainer = placeContainer;
    this.movieModel = movieModel;
    this.sectionMovie = [...this.movieModel.getMovie()];


    render(this.sectioinFilms, this.placeContainer);
    render(this.containerListFilm, this.sectioinFilms.getElement());

    for (let i = 0; i < this.sectionMovie.length; i++) {
      render(new NewCardFilmView(this.sectionMovie[i]), this.containerListFilm.getElement());
    }
    render(new LoadMoreButtonView, this.sectioinFilms.getElement());

  };
}
