import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../util.js';

const createComment = (comments) => {
  const {comment, date, emotion, author} = comments;

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
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>

  `);
};

export default class NewCommentView extends AbstractView {

  #comment = null;

  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createComment(this.#comment);
  }
}
