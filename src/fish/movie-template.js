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
      'totalRating': 5.3,
      'poster': `images/posters/${postersArray[getRandomInt(0, 6)]}`,
      'age_rating': 0,
      'director': 'Tom Ford',
      'writers': [
        'Takeshi Kitano'
      ],
      'actors': [
        'Morgan Freeman'
      ],
      'release': {
        'date': '2019-05-11T00:00:00.000Z',
        'release_country': 'Finland'
      },
      'runtime': 77,
      'genre': [
        'Comedy'
      ],
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


