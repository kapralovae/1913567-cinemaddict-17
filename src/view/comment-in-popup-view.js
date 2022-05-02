import {createElement} from '../render.js';
import { humanizeDate } from '../util.js';


const createComment = (comments) => {
  const {comment, date, emotion, author, id} = comments;

  return (`
  <li class="film-details__comment">

    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text"> ${id + comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${humanizeDate(date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>

  `);
};

export default class NewCommentView {

  constructor(comment) {
    this.comment = comment;
  }

  getTemplate() {
    return createComment(this.comment);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}