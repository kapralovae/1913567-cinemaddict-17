import { genetateCardMovie } from '../fish/movie-template.js';

export default class MovieModel {
  #movie = Array.from({length: 28}, genetateCardMovie);

  get movie () { return this.#movie;}
}
