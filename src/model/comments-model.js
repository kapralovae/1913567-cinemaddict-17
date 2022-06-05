import { generateComment } from '../fish/comment-template.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable{

  constructor(movieModel) {
    super();
    movieModel.movie.forEach((element) => {
      this.#createCommentsFilmById(element.id);
    });
  }

  getCommentsById = (id) => this.#comments.filter((comment) => comment.id === id);

  #comments = [];

  get comment() { return this.#comments;}

  #createCommentsFilmById = (id) => {

    for (let i = 0; i < 10; i++) {

      this.#comments.push(generateComment(id));
    }

  };

  updateComment = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      update,
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  };

  deleteComment = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting movie');
    }
//Найти комментарий по update.id
// В комментариях найти нужный комментарий по update.idUniq
// удалить комментарий.
    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}


