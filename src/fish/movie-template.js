import { getRandomInt } from '../util.js';
import CommentsModel from '../model/comments-model.js';


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
  'horror',
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
      'age_rating': getRandomInt(0, 18),
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano'
      ],
      'actors': actorsFilm.slice(0,[getRandomInt(0, actorsFilm.length - 1)]),
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'releaseCountry': country.slice(0,[getRandomInt(0, country.length - 1)])
      },
      'runtime': 77,
      'genre': genreFilm.slice(0,[getRandomInt(0, genreFilm.length - 1)]),
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


