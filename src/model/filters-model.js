import Observable from '../framework/observable';

export default class FiltersModel extends Observable {
  #currentFilter = 'All_movies';

  constructor(currentFilter) {
    super();
    this.#currentFilter = currentFilter;
  }

  get selectFilter () {return this.#currentFilter;}

  changeFilter = (updateType, updateFilter) => {
    this.#currentFilter = updateFilter;
    this._notify(updateType, updateFilter);
  };
}
