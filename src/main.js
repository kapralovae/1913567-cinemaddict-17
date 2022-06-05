import { render } from './framework/render.js';
import NewRankUserView from './view/rank-user-view';
import NewNavigationView from './view/navigation-view.js';
import ContainerFilmsPresenter from './presenter/main-films-presenter.js';
import MovieModel from './model/movie-model.js';
import CommentsModel from './model/comments-model.js';

const headerLogo = document.querySelector('.header');
const main = document.querySelector('main');
const movieModel = new MovieModel();
const commentsModal = new CommentsModel(movieModel);
const containerFilmsPresenter = new ContainerFilmsPresenter(main, document.body, movieModel,commentsModal);
console.log(commentsModal.comment);
render(new NewRankUserView(), headerLogo);
render(new NewNavigationView(), main);

containerFilmsPresenter.init();
