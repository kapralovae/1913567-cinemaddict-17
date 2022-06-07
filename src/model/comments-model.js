import { generateComment } from '../fish/comment-template.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable{

  constructor(movieModel) {
    super();
    movieModel.movie.forEach((element) => {
      this.#createCommentsFilmById(element.id);
    });
  }

  #comments = [];
  getCommentsById = (id) => this.#comments.filter((comment) => comment.id === id);


  get comment() { return this.#comments;}

  #createCommentsFilmById = (id) => {

    for (let i = 0; i < 10; i++) {

      this.#comments.push(generateComment(id));
    }
  };

  addComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  };

  deleteComment = (updateType, update) => {
    this.#comments = this.#comments.filter((comment) => comment.idUniq !== update.idUniq);
    this._notify(updateType, update);
  };
}


