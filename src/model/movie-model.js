import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class MovieModel extends Observable {
  #moviesApiService = null;
  #movies = [];

  constructor(moviesApiService) {
    super(moviesApiService);
    this.#moviesApiService = moviesApiService;
  }

  get movie () { return this.#movies;}

  init = async () => {
    try {
      const movies = await this.#moviesApiService.movies;
      this.#movies = movies.map(this.#adaptToClient);
    } catch(err) {
      this.#movies = [];
    }
    this._notify(UpdateType.INIT);
  };

  updateMovie = async (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    try {
      const response = await this.#moviesApiService.updatedMovie(update);
      const updatedMovie = this.#adaptToClient(response);
      this.#movies = [
        ...this.#movies.slice(0, index),
        updatedMovie,
        ...this.#movies.slice(index + 1),
      ];

      this._notify(updateType, updatedMovie);
    } catch(err) {
      throw new Error('Can\'t update movie');
    }
  };

  deleteMovie = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting movie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType);
  };

  #adaptToClient = (movie) => {
    const adaptedMovie = {...movie,
      filmInfo : {...movie['film_info'],
        ageRating: movie.film_info.age_rating,
        totalRating: movie.film_info.total_rating,
        release: {
          ...movie.film_info['release'],
          releaseCountry: movie.film_info.release.release_country,
        },
      },
      userDetails:{ ...movie['user_details'],
        alreadyWatched : movie.user_details['already_watched'],
        watchingDate : movie.user_details['watching_date'],
      },
    };

    delete adaptedMovie['film_info'];
    delete adaptedMovie['user_details'];
    delete adaptedMovie.filmInfo['age_rating'];
    delete adaptedMovie.filmInfo['total_rating'];
    delete adaptedMovie.filmInfo.release['release_country'];
    delete adaptedMovie.userDetails['already_watched'];
    delete adaptedMovie.userDetails['watching_date'];

    return adaptedMovie;
  };
}


