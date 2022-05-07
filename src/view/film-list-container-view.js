import AbstractView from '../framework/view/abstract-view';

const createContainerFilms = () => '<div class="films-list__container"></div>';

export default class ContainerListFilmView extends AbstractView {

  get template() {
    return createContainerFilms();
  }
}
