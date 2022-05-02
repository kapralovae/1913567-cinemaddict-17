import { genetateCardMovie } from '../fish/movie-template.js';
import { generateComment } from '../fish/comment-template.js';


export default class MovieModel {
  movie = Array.from({length: 20}, genetateCardMovie);

  getMovie = () => this.movie;

  comments = Array.from({length: 50}, generateComment);

  getComment = () => this.comments;
}
