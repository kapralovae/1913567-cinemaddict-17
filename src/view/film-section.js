import AbstractView from '../framework/view/abstract-view';

const createSectionFilms = () => `
<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
</section>`;

export default class NewSectionFilmsView extends AbstractView {

  get template() {
    return createSectionFilms();
  }
}
