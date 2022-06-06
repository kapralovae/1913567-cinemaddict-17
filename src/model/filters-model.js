import Observable from '../framework/observable';

export default class FiltersModel extends Observable {
  #currentFilter = null;

  constructor(currentFilter = 'All_movies') {
    super();
    this.#currentFilter = currentFilter;
  }

  get selectFilter () {return this.#currentFilter;}

  changeFilter = (updateType, updateFilter) => {
    this.#currentFilter = updateFilter;
    console.log(updateFilter);
    this._notify(updateType, updateFilter);
  };
}
