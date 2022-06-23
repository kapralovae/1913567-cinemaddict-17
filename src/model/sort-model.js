import Observable from '../framework/observable';

export default class SortModel extends Observable {
  #currentSort = null;

  constructor(currentSort) {
    super();
    this.#currentSort = currentSort;
  }

  get selectSort () {return this.#currentSort;}

  changeSort = (updateType, updatedSort) => {
    this.#currentSort = updatedSort;
    this._notify(updateType, updatedSort);
  };
}
