import { render } from './framework/render.js';
import NewRankUserView from './view/rank-user-view';
import ContainerFilmsPresenter from './presenter/main-films-presenter.js';
import MovieModel from './model/movie-model.js';
import CommentsModel from './model/comments-model.js';
import FiltersModel from './model/filters-model.js';
import MoviesApiService from './movies-api-service.js';

const AUTHORIZATION = 'Basic hbvjlhb553345klhb3kl45';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const headerLogo = document.querySelector('.header');
const main = document.querySelector('main');

const moviesApiService = new MoviesApiService(END_POINT, AUTHORIZATION);
const movieModel = new MovieModel(moviesApiService);
const filtersModel = new FiltersModel();
const commentsModel = new CommentsModel(movieModel, moviesApiService);
const getData = async() => {
  await movieModel.init();
  await commentsModel.init();
};
getData();
const containerFilmsPresenter = new ContainerFilmsPresenter(main, document.body, movieModel,commentsModel, filtersModel);

render(new NewRankUserView(), headerLogo);

containerFilmsPresenter.init();


