// import { generateComment } from '../fish/comment-template.js.js';
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class CommentsModel extends Observable{
  #movieModel = null;
  #moviesApiService = null;
  #comments = [];

  constructor(movieModel, moviesApiService) {
    super();
    this.#movieModel = movieModel;
    this.#moviesApiService = moviesApiService;
  }

  get comment() { return this.#comments;}

  init =  async () => {
    // console.log();
    try {
      const moviesId = [];
      this.#movieModel.movie.forEach((movie) => {
        moviesId.push(movie.id);
      });
      const commentsFetch = await this.#moviesApiService.getAllComments(moviesId);
      for (let i = 0; i < commentsFetch.length; i++) {
        const commentsByMovie = commentsFetch[i].comments;
        this.#comments.push(...commentsByMovie);
      }
    } catch(err) {
      this.#comments = [];
    }
    this._notify(UpdateType.INITCOMMENT);
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


