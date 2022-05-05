import { getRandomInt } from '../util.js';
import CommentsModel from '../model/comments-model.js';
import { humanizeDate } from '../util.js';

const postersArray = ['made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg'
];

const description = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
];

const titleFilm = ['Зеленая миля',
  'Побег из Шоушенка',
  'Форрест Гамп',
  'Король Лев',
  'Интерстеллар'
];

const genreFilm = [
  'Comedy',
  'Triller',
  'Horror',
  'Adventure',
  'Detective',
];

const actorsFilm = [
  'Morgan Freeman',
  'Vin Dizel',
  'Tom Holand',
  'Bred Pit',
  'Robert Downy Jr',

];

const country = [
  'Russia',
  'Finland',
  'Germany',
  'Norway',
  'Sweden'
];

const directors = [
  'Cristofer Nolan',
  'Frank Dorabont',
  'Stiven Spilberg',
  'Kventin Torantino',
  'David Fincher',
];

const writers = [
  'Jonatan Nolan',
  'Jim Uls',
  'Hayao Midziyaki',
  'Guy Ritchie',
  'Ivan Atkinson',
];

const dates = [
  '2000-05-11T00:00:00.000Z',
  '2005-05-11T00:00:00.000Z',
  '2010-05-11T00:00:00.000Z',
  '2015-05-11T00:00:00.000Z',
  '2020-05-11T00:00:00.000Z',
];

const timeFilms = [
  90,50,70,48,55,84,60
];

const getRuntime = (offer) => {
  const runtime = [];

  for (let i = 0; i < offer.length; i++) {
    if(offer[i] % 60 === 0) {
      runtime.push(`${offer[i]/60}h`);
    }
    runtime.push(`${Math.ceil(offer[i]/60)}h ${offer[i] % 60}m`);
  }

  return runtime[getRandomInt(0, runtime.length - 1)];
};

const commentsList = new CommentsModel();

export const genetateCardMovie = () => {
  const id = getRandomInt(1, 5);
  return{

    'id': id,
    'comments': [
      ...commentsList.getCommentsById(id)
    ],
    'filmInfo': {
      'title': titleFilm[getRandomInt(0, 4)],
      'alternative_title': 'Laziness Who Sold Themselves',
      'totalRating': getRandomInt(0, 10),
      'poster': `images/posters/${postersArray[getRandomInt(0, 6)]}`,
      'ageRating': getRandomInt(0, 18),
      'director': directors[getRandomInt(0, 4)],
      'writers': writers.slice(0,[getRandomInt(1, actorsFilm.length)]),
      'actors': actorsFilm.slice(0,[getRandomInt(1, actorsFilm.length - 1)]),
      'release': {
        'date': humanizeDate(dates[getRandomInt(0, 4)]),
        'releaseCountry': country.slice().splice(getRandomInt(0, country.length - 1), 1)
      },
      'runtime': getRuntime(timeFilms),
      'genre': genreFilm.slice().splice(getRandomInt(0, genreFilm.length - 1), 1),
      'description': description[getRandomInt(0, 4)],
    },
    'user_details': {
      'watchlist': false,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      'favorite': false
    }
  };
};


