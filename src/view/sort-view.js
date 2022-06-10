import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const.js';

const createSort = (currentSort) =>(`  <ul class="sort">
<li><a href="#" class="sort__button ${currentSort === SortType.DEFAULT ? 'sort__button--active' : ''}">Sort by default</a></li>
<li><a href="#" class="sort__button ${currentSort === SortType.DATE ? 'sort__button--active' : ''}">Sort by date</a></li>
<li><a href="#" class="sort__button ${currentSort === SortType.RATING ? 'sort__button--active' : ''}">Sort by rating</a></li>
</ul>`);

export default class NewSortView extends AbstractView{
  #currentSort = null;

  constructor(currentSort) {
    super();
    this.#currentSort = currentSort;
  }

  get template() {
    return createSort(this.#currentSort);
  }


}
