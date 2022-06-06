import { render } from './framework/render.js';
import NewRankUserView from './view/rank-user-view';
import NewNavigationView from './view/navigation-view.js';
import ContainerFilmsPresenter from './presenter/main-films-presenter.js';
import MovieModel from './model/movie-model.js';
import CommentsModel from './model/comments-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';

const headerLogo = document.querySelector('.header');
const main = document.querySelector('main');
const movieModel = new MovieModel();
const commentsModal = new CommentsModel(movieModel);
const filtersPresenter = new FiltersPresenter();
const containerFilmsPresenter = new ContainerFilmsPresenter(main, document.body, movieModel,commentsModal);
render(new NewRankUserView(), headerLogo);
render(new NewNavigationView(), main);

filtersPresenter.init();
containerFilmsPresenter.init();
