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

  getTestAll = async () => {
    const arr = [1,2,3,4,5];//id filmov dlya commentov
    const reluslts = [];
    for (let i = 0; i < arr.length;i++) {
      const id = arr[i];
      const commentById = await this.getTest(id);
      reluslts.push(commentById);
    }
    return reluslts;
  };

  /*
    0) Дописать адаптер для комментариев фильма
    1) В моделе комментариев собрать все id фильмов
    2) Используя id из п.1 вызвать getTestAll передать все id
    3) Результат работы getTestAll заполнить модель данных
  */
  // getComments() {

  //   const arr = [];
  //   let qwer = null;
  //   for (let i = 0; i < this.movies.length; i++) {
  //     qwer = this._load({url: `comments/${i}`})//return this._load({url: `comments/${this.movies.id}`})
  //       .then(ApiService.parseResponse);
  //     arr.push(qwer);
  //   }
  //   console.log(arr);
  //   return arr;
  // }


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
