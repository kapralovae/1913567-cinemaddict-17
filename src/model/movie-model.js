import { genetateCardMovie } from '../fish/movie-template.js';


export default class MovieModel {
  movie = Array.from({length: 20}, genetateCardMovie);

  getMovie = () => this.movie;
}
