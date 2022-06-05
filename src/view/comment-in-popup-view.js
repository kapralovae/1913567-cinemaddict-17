import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate } from '../util.js';

const createComment = (comments) => {
  const {comment, date, emotion, author,  idUniq} = comments;

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
        <button data-comment-index=${idUniq} class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>

  `);
};

export default class NewCommentView extends AbstractView {

  #comment = null;
  #index = null;

  constructor(comment, index) {
    super();
    this.#comment = comment;
    this.#index = index;
  }

  get template() {
    return createComment(this.#comment);
  }

  // handlerDeleteComment = (callback) => {
  //   this._callback.deleteComment = callback;
  //   this.element.querySelector('.film-details__comment-delete').addEventListener('click', this.#handlerDeleteButton);
  // };

  // #handlerDeleteButton = (evt) => {
  //   evt.preventDefault();
  //   console.log(evt.target);
  //   //достать уникальный ид коментария и передать в делеткоммент 49строка
  //   this._callback.deleteComment();
  // };
}
