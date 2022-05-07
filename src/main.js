import { render, RenderPosition } from './framework/render.js';
import NewRankUserView from './view/rank-user-view';
import NewNavigationView from './view/navigation-view.js';
import ContainerFilmsPresenter from './presenter/main-films-presenter.js';
import MovieModel from './model/movie-model.js';

const headerLogo = document.querySelector('.header');
const main = document.querySelector('main');
const movieModel = new MovieModel();
const containerFilmsPresenter = new ContainerFilmsPresenter(main, movieModel);

render(new NewRankUserView(), headerLogo);
render(new NewNavigationView(), main, RenderPosition.BEFOREEND);

containerFilmsPresenter.init();

