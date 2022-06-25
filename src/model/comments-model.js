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
      const moviesIds = [];
      this.#movieModel.movie.forEach((movie) => {
        moviesIds.push(movie.id);
      });
      const commentsFetch = await this.#moviesApiService.getAllComments(moviesIds);
      for (const commentFetch of commentsFetch) {
        const commentsByMovie = commentFetch.comments;
        this.#comments.push(...commentsByMovie);
      }
    } catch(err) {
      this.#comments = [];
    }
    this._notify(UpdateType.INITCOMMENT);
  };

  addComment = async (updateType, update) => {
    const addedComment = {...update};
    delete addedComment['idMovie'];
    const commentsForMovie = await this.#moviesApiService.addCommentOnServer(addedComment, update.idMovie);

    this.#comments.push(commentsForMovie.comments[commentsForMovie.comments.length - 1]);

    this._notify(updateType, commentsForMovie);
  };

  deleteComment = async (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.deletedComment.id);

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


