const FilterType = {
  ALL_MOVIES: 'All_movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

const FilterMapType = {
  all: 'All_movies',
  watchlist: 'Watchlist',
  alreadyWatched: 'History',
  favorite: 'Favorites',
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const UserAction = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  FILTER_MOVIE : 'FILTER_MOVIE',
  CLOSE_POPUP: 'CLOSE_POPUP',
  SORT_MOVIE: 'SORT_MOVIE',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  INITCOMMENT: 'INITCOMMENT',
  SORT: 'SORT',
};

export {SortType, UserAction, UpdateType, FilterType, FilterMapType};
