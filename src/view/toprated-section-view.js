import AbstractView from '../framework/view/abstract-view';

const createTopratedFilmSection = (nameSection) => `
<section films-list films-list--extra">
  <h2 class="films-list__title">${nameSection}</h2>
</section>`;

export default class SpecialFilmSectionView extends AbstractView {
  #nameSection = null;
  constructor (nameSection) {
    super();
    this.#nameSection = nameSection;
  }

  get template() {
    return createTopratedFilmSection(this.#nameSection);
  }
}
