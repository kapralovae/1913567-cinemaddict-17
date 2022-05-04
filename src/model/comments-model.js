import { generateComment } from '../fish/comment-template.js';

export default class CommentsModel {
  #comments = Array.from({length: 50}, generateComment);

  get comment() { return this.#comments;}
  getCommentsById = (id) => this.#comments.filter((comment) => comment.id === id);
}
