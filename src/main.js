import { render } from './framework/render.js';
import NewRankUserView from './view/rank-user-view';
import ContainerFilmsPresenter from './presenter/main-films-presenter.js';
import MovieModel from './model/movie-model.js';
import CommentsModel from './model/comments-model.js';
// import FiltersPresenter from './presenter/filters-presenter.js';
import FiltersModel from './model/filters-model.js';

const headerLogo = document.querySelector('.header');
const main = document.querySelector('main');
const movieModel = new MovieModel();
const commentsModal = new CommentsModel(movieModel);
const filtersModal = new FiltersModel();
// const filtersPresenter = new FiltersPresenter(main);
const containerFilmsPresenter = new ContainerFilmsPresenter(main, document.body, movieModel,commentsModal, filtersModal);
render(new NewRankUserView(), headerLogo);

containerFilmsPresenter.init();
// filtersPresenter.init();
