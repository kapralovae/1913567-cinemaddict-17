import { Rank } from '../const';
import AbstractView from '../framework/view/abstract-view';

const createRankUser = (getRank, renderMovies) => (
  `<section class="header__profile profile">
  ${getRank(renderMovies)}
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`);

export default class RankUserView extends AbstractView {
  #renderMovies = null;

  constructor(renderMovies) {
    super();
    this.#renderMovies = renderMovies;
  }

  get template() {
    return createRankUser(this.#getRank, this.#renderMovies);
  }


  #getRank = (renderMovies) => {
    let rank = null;
    const countWatchlistMovie = renderMovies.filter((movie) => movie.userDetails['alreadyWatched']).length;
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
