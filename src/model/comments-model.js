import { generateComment } from '../fish/comment-template.js';

export default class CommentsModel {
  #comments = Array.from({length: 50}, generateComment);

  get comment() { return this.#comments;}

  getCommentsById = (id) => {
    const comments = [];
    for (let i = 0; i < 10; i++) {

      comments.push(generateComment(id));
    }
    return comments;
  };
}


