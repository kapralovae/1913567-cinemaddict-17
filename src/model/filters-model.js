import Observable from '../framework/observable';
import { FilterMapType } from '../const';


export default class FiltersModel extends Observable {
  #currentFilter = null;

  constructor(currentFilter) {
    super();
    this.#currentFilter = currentFilter;
  }

  getCurrentFilter = () => this.#currentFilter;
  getKeysFilterMapType = () => Object.keys(FilterMapType).slice(1, FilterMapType.length);

  get selectFilter () {
    if (this.#currentFilter === undefined || this.#currentFilter === null) {
      this.#currentFilter = FilterMapType.all;
      return this.#currentFilter;
    }
    if (this.getKeysFilterMapType().some(this.getCurrentFilter)) {
      this.#currentFilter = FilterMapType[this.getCurrentFilter()];
    }
    return this.#currentFilter;
  }

  changeFilter = (updateType, updateFilter) => {
    this.#currentFilter = updateFilter;
    this._notify(updateType, updateFilter);
  };
}
