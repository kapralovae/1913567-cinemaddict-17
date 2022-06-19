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
    try {
      const moviesId = [];
      // const moviesId  = this.#movieModel.movie.map((movie) => movie.id);
      this.#movieModel.movie.forEach((movie) => {
        moviesId.push(movie.id);
      });
      const commentsFetch = await this.#moviesApiService.getAllComments(moviesId);
      for (let i = 0; i < commentsFetch.length; i++) {
        const commentsByMovie = commentsFetch[i].comments;
        this.#comments.push(...commentsByMovie);
      }
      // this.#comments = commentsFetch.map((comFetch) => comFetch.comments);
      console.log(this.comment);
    } catch(err) {
      this.#comments = [];
    }
    this._notify(UpdateType.INITCOMMENT);
  };

  addComment = async (updateType, update) => {
    console.log(update);
    const addedComment = {...update};
    delete addedComment['idMovie'];
    const commentsForMovie = await this.#moviesApiService.addCommentOnServer(addedComment, update.idMovie);

    this.#comments.push(commentsForMovie.comments[commentsForMovie.comments.length - 1]);

    console.log(this.#comments);
    this._notify(updateType, commentsForMovie);
  };

  deleteComment = async (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.deletedComment.id);
    // this.#comments = this.#comments.filter((comment) => comment.id !== update.idUniq);
    if (index === -1) {
      throw new Error('Can\'t delete unexusting comment');
    }
    try {
      await this.#moviesApiService.deleteComment(update.deletedComment);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];

      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }

  };
}


