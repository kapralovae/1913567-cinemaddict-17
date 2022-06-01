import AbstractView from '../framework/view/abstract-view';
import {FilterType} from '../const.js';

const createFilter = (currentFilter) =>(`  <ul class="sort">
<li><a href="#" class="sort__button ${currentFilter === FilterType.DEFAULT ? 'sort__button--active' : ''}">Sort by default</a></li>
<li><a href="#" class="sort__button ${currentFilter === FilterType.DATE ? 'sort__button--active' : ''}">Sort by date</a></li>
<li><a href="#" class="sort__button ${currentFilter === FilterType.RATING ? 'sort__button--active' : ''}">Sort by rating</a></li>
</ul>`);

export default class NewFilterView extends AbstractView{
  #currentFilter = null;

  constructor(currentFilter) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilter(this.#currentFilter);
  }
}
