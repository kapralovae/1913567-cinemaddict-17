import { remove, render, replace } from '../framework/render';
import NewFiltersView from '../view/filters-view';
import { RenderPosition } from '../framework/render';
import { UserAction } from '../const';
import { UpdateType } from '../const';

export default class FiltersPresenter {
  #placeFiltersContainer = null;
  #changeData = null;
  #currentFilter = null;

  #filterComponents = null;

  constructor(placeFiltersContainer, currentFilter, changeData){
    this.#placeFiltersContainer = placeFiltersContainer;
    this.#changeData = changeData;
    this.#currentFilter = currentFilter;
  }

  init(renderMovies) {
    const prevFilterComponents = this.#filterComponents;
    this.#filterComponents = new NewFiltersView(renderMovies, this.#currentFilter);
    this.#filterComponents.handlerClickFilters(this.#handlerClickOnFilter);

    if (prevFilterComponents === null) {
      render(this.#filterComponents, this.#placeFiltersContainer, RenderPosition.BEFOREBEGIN);
      return;
    }
    replace(this.#filterComponents, prevFilterComponents);
    remove(prevFilterComponents);
  }

  removeFilters = () => {
    remove(this.#filterComponents);
  };

  #handlerClickOnFilter = (selectedType) => {
    this.#changeData(
      UserAction.FILTER_MOVIE,
      UpdateType.MAJOR,
      selectedType,
    );
  };

}
