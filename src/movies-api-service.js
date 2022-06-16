import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class MoviesApiService extends ApiService {
  get movies() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  // qwer = () => {
  //   const arr = [];
  //   this.movies.forEach((movie) => {
  //     arr.push(movie.id);
  //   });
  //   return arr;

  // };

  getTest = (idMovie) => this._load({url: `comments/${idMovie}`})
    .then(ApiService.parseResponse);

  getTestAll = async (moviesId) => {
    // const arr = [1,2,3,4,5];//id filmov dlya commentov
    //  console.log(await movieId[1]);
    // const reluslts = {};
    const reluslts = [];
    for (let i = 0; i < moviesId.length;i++) {
      const id = moviesId[i];
      const commentById = await this.getTest(id);
      // reluslts[id] = commentById;
      reluslts.push({id: id, comments: commentById});
      //  this.getTest(id)
      //   .then((commentById) => {
      //     reluslts[id] = commentById;
      //     // for (let j = 0; j < commentById.length; j++) {
      //     // }
      //   });
      // reluslts.push({id: id, comments: commentById});
    }
    return reluslts;
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
      'film_info' : {...movie.filmInfo,
        'age_rating': movie.filmInfo.ageRating,
        'total_rating': movie.filmInfo.totalRating,
        release: {
          ...movie.filmInfo['release'],
          'release_country': movie.filmInfo.release.releaseCountry,
        },
      },
      'user_details' : {...movie.userDetails,
        'already_watched' : movie.userDetails['alreadyWatched'],
        'watching_date' : movie.userDetails['watchingDate'],
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
