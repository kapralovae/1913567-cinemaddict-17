import { render } from '../framework/render';
import NewFiltersView from '../view/filters-view';
import { RenderPosition } from '../framework/render';
import { UserAction } from '../const';
import { UpdateType } from '../const';

export default class FiltersPresenter {
  #placeFiltersContainer = null;
  #filters = null;
  #changeData = null;

  constructor(placeFiltersContainer, changeData){
    this.#placeFiltersContainer = placeFiltersContainer;
    this.#changeData = changeData;
  }

  init() {
    this.#filters = new NewFiltersView();
    render(this.#filters, this.#placeFiltersContainer, RenderPosition.BEFOREBEGIN);
    this.#filters.handlerClickFilterWatchlist(this.#hadndlerClickWatchlistFilter);
  }

  #hadndlerClickWatchlistFilter = (selectedType) => {
    this.#changeData(
      UserAction.FILTER_MOVIE,
      UpdateType.MAJOR,
      selectedType,
    );
  };

}
