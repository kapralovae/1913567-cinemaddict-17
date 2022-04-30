import { render } from './render.js';
import { RenderPosition } from './render.js';
import NewRankUserView from './view/rank-user-view';
import NewNavigationView from './view/navigation-view.js';
import NewFilterView from './view/filter-view.js';
import ContainerFilmsPresenter from './presenter/main-films-presenter.js';
import MovieModel from './model/movie-model.js';

const headerLogo = document.querySelector('.header');
const main = document.querySelector('main');
const containerFilmsPresenter = new ContainerFilmsPresenter;
const movieModel = new MovieModel;

render(new NewRankUserView, headerLogo);
render(new NewNavigationView, main, RenderPosition.BEFOREEND );
render(new NewFilterView, main, RenderPosition.BEFOREEND );

containerFilmsPresenter.init(main, movieModel);
