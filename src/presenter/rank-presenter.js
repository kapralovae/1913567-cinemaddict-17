import { remove, render, replace } from '../framework/render';
import RankUserView from '../view/rank-user-view';

export default class RankPresenter {
  #placeRankContainer = null;
  #rankComponent = null;

  constructor(placeRankContainer){
    this.#placeRankContainer = placeRankContainer;
  }

  init = (movies) => {
    const prevRankComponent = this.#rankComponent;
    this.#rankComponent = new RankUserView(movies);

    if (prevRankComponent === null) {
      render (this.#rankComponent, this.#placeRankContainer);
      return;
    }

    if (this.#placeRankContainer.contains(prevRankComponent.element)) {
      replace(this.#rankComponent, prevRankComponent);
    }

    remove(prevRankComponent);

  };

  removeRank = () => {
    remove(this.#rankComponent);
  };

}
