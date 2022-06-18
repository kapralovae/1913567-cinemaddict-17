import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import NewCommentView from './comment-in-popup-view.js';

const createPopupFilm = (movie, commentsArr) => {
  const {filmInfo, emotionSelect, comments} = movie;
  const commentsForMovie = [];

  comments.forEach((commentId) => {
    commentsArr.some((commentsId) => {
      if (commentsId.id === commentId) {
        commentsForMovie.push(commentsId);
      }
    });
  });


  let classActiveWatchlist = '';
  let classActiveWatched = '';
  let classActiveFavorite = '';
  if (movie.userDetails.watchlist) {
    classActiveWatchlist = 'film-details__control-button--active';
  }
  if (movie.userDetails.alreadyWatched) {
    classActiveWatched = 'film-details__control-button--active';
  }
  if (movie.userDetails.favorite) {
    classActiveFavorite = 'film-details__control-button--active';
  }


  return(`
  <section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${filmInfo.poster}" alt="">

            <p class="film-details__age">${filmInfo.ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmInfo.title}</h3>
                <p class="film-details__title-original">Original: ${filmInfo.title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmInfo.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmInfo.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmInfo.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${filmInfo.release.date}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${filmInfo.runtime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${filmInfo.genre}</span>
                  <span class="film-details__genre">${filmInfo.genre}</span>
                  <span class="film-details__genre">${filmInfo.genre}</span></td>
              </tr>
            </table>

            <p class="film-details__film-description">
            ${filmInfo.description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${classActiveWatchlist}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${classActiveWatched}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${classActiveFavorite}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsForMovie.reduce((template, comment, index) => {
      template += new NewCommentView(comment, index).template;
      return template;
    }, '')}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
            <img src="./images/emoji/${movie.emotionSelect}.png" width="70" height="70" alt="emoji">
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${movie.commentEmoji}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input ${emotionSelect === 'smile'? 'checked': ''} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input ${emotionSelect === 'sleeping'? 'checked': ''} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input ${emotionSelect === 'puke'? 'checked': ''} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input ${emotionSelect === 'angry'? 'checked': ''} class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`);
};

export default class NewPopupFilmView extends AbstractStatefulView {
  #comments = null;
  constructor(movie, comments) {
    super();
    this.#comments = comments;
    this._state = NewPopupFilmView.parseMovieToState(movie, comments);
    this.#setInnerHandlers();
  }

  get template() {
    return createPopupFilm(this._state, this.#comments);
  }


  setClickCloseHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click',  this.#clickHandler);
    document.addEventListener('keydown', this.#handlerKeyDown);
    this.#setInnerHandlers();
  };

  setClickDeleteMessageHandler = (callback) => {
    this._callback.delete = callback;
    this.element.querySelector('.film-details__comments-list').addEventListener('click', this.#handlerDeleteComment);
  };

  _restoreHandlers = () => {
    this.element.scroll({
      top : this.popupScrollPosition,
    });
    this.#setInnerHandlers();
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setAllredyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setFavoritesClickHandler(this._callback.favoritesClick);
    this.setClickCloseHandler(this._callback.click);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#handlerKeyDown);
    this._callback.click();
  };

  #handlerKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#clickHandler(evt);
    }
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('#watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  setAllredyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('#watched').addEventListener('click', this.#allredyWatchedClickHandler);
  };

  #allredyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
    this.popupScrollPosition = this.element.scrollTop;
  };

  setFavoritesClickHandler = (callback) => {
    this._callback.favoritesClick = callback;
    this.element.querySelector('#favorite').addEventListener('click', this.#favoritesClickHandler);
  };

  #favoritesClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoritesClick();
  };

  static parseMovieToState = (movie, comments) => {
    console.log(comments);
    return ({...movie,
      commentEmoji: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
      emotionSelect: 'smile'});};

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((element) => {
      element.addEventListener('change', this.#handlerClickEmoji);
    });
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#handlerInputText);
  };

  #handlerClickEmoji = (evt) => {
    evt.preventDefault();
    this.popupScrollPosition = this.element.scrollTop;
    this.lastChekedSmile = evt.target.value;
    this.updateElement({
      emotionSelect: evt.target.value,
    });

  };

  #handlerInputText = (evt) => {
    evt.preventDefault();
    this._setState({
      commentEmoji: evt.target.value,
    });
  };

  #handlerDeleteComment = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'BUTTON') {
      this._callback.delete(evt.target.dataset.commentIndex);
    }
  };
}
