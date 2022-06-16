// import { generateComment } from '../fish/comment-template.js.js';
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class CommentsModel extends Observable{
  #movieModel = null;
  #moviesApiService = null;

  constructor(movieModel, moviesApiService) {
    super();
    this.#movieModel = movieModel;
    this.#moviesApiService = moviesApiService;
    // movieModel.movie.forEach((element) => {
    //   this.#createCommentsFilmById(element.id);
    // });
    // console.log(this.#movieModel);
  }

  #comments = [];
  // getCommentsById = (id) => this.#comments.filter((comment) => comment.id === id);


  get comment() { return this.#comments;}

  init =  async () => {
    // console.log();
    try {
      const moviesId = [];
      this.#movieModel.movie.forEach((movie) => {
        moviesId.push(movie.id);
      });
      // const comments = await this.#moviesApiService.getTestAll(moviesId);
      // this.#comments = comments;
      // let test = null;
      const commentsFetch = await this.#moviesApiService.getTestAll(moviesId);
      for (let i = 0; i < commentsFetch.length; i++) {
        const commentsByMovie = commentsFetch[i].comments;
        this.#comments.push(...commentsByMovie);
      }
      // this.#comments.push(commentsFetch.forEach((comments) => comments.comments));

      // const comments = await this.#moviesApiService.getComments(this.#movieModel.movie);
      // this.#comments = comments;
    } catch(err) {
      this.#comments = [];
    }
    console.log(this.comment);
    this._notify(UpdateType.INITCOMMENT);
  };

  // #createCommentsFilmById = (id) => {

  //   for (let i = 0; i < 10; i++) {

  //     this.#comments.push(generateComment(id));
  //   }
  // };

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


