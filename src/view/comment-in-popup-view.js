import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../util.js';

const createComment = (comments, idComment) => {
  const {comment, date, emotion, author, id} = comments;
  const isDisabled = () => {
    if (id === idComment) {
      return true;
    }
    return false;
  };
  return (`
  <li class="film-details__comment">

    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text"> ${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${humanizeDate(date)}</span>
        <button data-comment-index="${id}" ${isDisabled() ? 'disabled' : ''}class="film-details__comment-delete">${isDisabled() ? 'Deleting...' : 'Delete'}</button>
      </p>
    </div>
  </li>

  `);
};

export default class NewCommentView extends AbstractView {

  #comment = null;
  #isDisabled = null;

  constructor(comment, isDisabled) {
    super();
    this.#comment = comment;
    this.#isDisabled = isDisabled;
  }

  get template() {
    return createComment(this.#comment, this.#isDisabled);
  }
}
