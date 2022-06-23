import { remove, render, replace } from '../framework/render';
import SortView from '../view/sort-view';
import { RenderPosition } from '../framework/render';
import { UserAction } from '../const';
import { UpdateType } from '../const';

export default class SortPresenter {
  #placeSortContainer = null;
  #changeData = null;
  #currentSort = null;

  #sortComponents = null;

  constructor(placeSortContainer, currentSort, changeData){
    this.#placeSortContainer = placeSortContainer;
    this.#changeData = changeData;
    this.#currentSort = currentSort;
  }

  init() {
    const prevSortComponents = this.#sortComponents;
    this.#sortComponents = new SortView(this.#currentSort);
    this.#sortComponents.handlerClickSort(this.#handlerClickOnSort);

    if (prevSortComponents === null) {
      render(this.#sortComponents, this.#placeSortContainer, RenderPosition.BEFOREBEGIN);
      return;
    }
    replace(this.#sortComponents, prevSortComponents);
    remove(prevSortComponents);
  }

  removeSort = () => {
    remove(this.#sortComponents);
  };

  #handlerClickOnSort = (selectedType) => {
    this.#changeData(
      UserAction.SORT_MOVIE,
      UpdateType.SORT,
      selectedType,
    );
  };

}
