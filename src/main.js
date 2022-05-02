import { render } from './render.js';
import { RenderPosition } from './render.js';
import NewRankUserView from './view/rank-user-view';
import NewNavigationView from './view/navigation-view.js';
import NewFilterView from './view/filter-view.js';
import ContainerFilmsPresenter from './presenter/main-films-presenter.js';
import MovieModel from './model/movie-model.js';
import NewPopupFilmView from './view/popup-film-view.js';


const headerLogo = document.querySelector('.header');
const main = document.querySelector('main');
const commentList = document.querySelector('.film-details__comments-list');

const containerFilmsPresenter = new ContainerFilmsPresenter;
const movieModel = new MovieModel;


render(new NewRankUserView, headerLogo);
render(new NewNavigationView, main, RenderPosition.BEFOREEND );
render(new NewFilterView, main, RenderPosition.BEFOREEND );
render(new NewPopupFilmView, document.body, RenderPosition.BEFOREEND);


containerFilmsPresenter.init(main, movieModel);
containerFilmsPresenter.pasteComments(commentList, movieModel);

