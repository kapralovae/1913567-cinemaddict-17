import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export default class MoviesApiService extends ApiService {
  get movies() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  getCommentsByMovie = (idMovie) => this._load({url: `comments/${idMovie}`})
    .then(ApiService.parseResponse);

  getAllComments = async (moviesId) => {
    const reluslts = [];
    for (let i = 0; i < moviesId.length;i++) {
      const id = moviesId[i];
      const commentById = await this.getCommentsByMovie(id);
      reluslts.push({id: id, comments: commentById});
    }
    return reluslts;
  };

  deleteComment = async (comment) => {
    console.log(comment);
    const response = await this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });
    console.log(response);
    return response;
  };

  updatedMovie = async (movie) => {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  };

  #adaptToServer = (movie) => {
    const adaptedMovie = {...movie,
      'film_info': {...movie.filmInfo,
        'age_rating': movie.filmInfo.ageRating,
        'total_rating': movie.filmInfo.totalRating,
        release: {
          ...movie.filmInfo['release'],
          'release_country': movie.filmInfo.release.releaseCountry,
        },
      },
      'user_details': {...movie.userDetails,
        'already_watched': movie.userDetails['alreadyWatched'],
        'watching_date': movie.userDetails['watchingDate'],
      },
    };

    delete adaptedMovie.filmInfo;
    delete adaptedMovie.film_info.ageRating;
    delete adaptedMovie.film_info.totalRating;
    delete adaptedMovie.film_info.release.releaseCountry;
    delete adaptedMovie.userDetails;
    delete adaptedMovie.user_details.alreadyWatched;
    delete adaptedMovie.user_details.watchingDate;

    return adaptedMovie;
  };
}
