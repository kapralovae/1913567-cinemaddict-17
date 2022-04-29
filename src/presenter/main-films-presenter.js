import { render } from '../render.js';
// import { RenderPosition } from '../render.js';
import NewSectionFilmsView from '../view/film-section.js';
import ContainerListFilm from '../view/film-list-container-view.js';
import NewCardFilmView from '../view/card-film-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';

export default class ContainerFilmsPresenter {

  sectioinFilms = new NewSectionFilmsView;
  containerFilms = new ContainerListFilm;
  init = (placeContainer) => {
    this.placeContainer = placeContainer;


    render(this.sectioinFilms, this.placeContainer);
    render(this.containerFilms, this.sectioinFilms.getElement());

    for (let i = 0; i < 5; i++) {
      render(new NewCardFilmView, this.containerFilms.getElement());
    }
    render(new LoadMoreButtonView, this.sectioinFilms.getElement());

  };
}
