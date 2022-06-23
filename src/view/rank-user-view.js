import { Rank } from '../const';
import { remove, render, replace } from '../framework/render';
import AbstractView from '../framework/view/abstract-view';

const createRankUser = (getRank, renderMovies) => (
  `<section class="header__profile profile">
  ${getRank(renderMovies)}
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`);

export default class RankUserView extends AbstractView {
  #renderMovies = null;
  #rankComponent = null;
  #prevRankComponent = null;

  constructor(renderMovies) {
    super();
    this.#renderMovies = renderMovies;
  }

  get template() {
    return createRankUser(this.#getRank, this.#renderMovies);
  }

  init = (rankView, containerRank) => {
    this.#prevRankComponent = this.#rankComponent;
    this.#rankComponent = rankView;
    console.log(rankView, this.#prevRankComponent);

    if (this.#prevRankComponent === null) {
      render (rankView, containerRank);
      return;
    }

    if (containerRank.contains(this.#prevRankComponent.element)) {
      replace(this.#rankComponent, this.#prevRankComponent);
    }
    remove(this.#prevRankComponent);
  };

  #getRank = (renderMovies) => {
    let rank = null;
    const countWatchlistMovie = renderMovies.filter((movie) => movie.userDetails['watchlist']).length;
    if (countWatchlistMovie === 0 || countWatchlistMovie === undefined) {
      return;
    }
    if (countWatchlistMovie >= Rank.novice.min && countWatchlistMovie <= Rank.novice.max) {
      rank = Rank.novice.name;
    }
    if (countWatchlistMovie >= Rank.fan.min && countWatchlistMovie <= Rank.fan.max) {
      rank = Rank.fan.name;
    }
    if (countWatchlistMovie >= Rank.movieBuff.min) {
      rank = Rank.movieBuff.name;
    }
    return `<p class="profile__rating">${rank}</p>`;
  };
}
