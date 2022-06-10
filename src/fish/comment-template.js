import { nanoid } from 'nanoid';
import { getRandomInt } from '../util.js';

const commentEmotion = ['smile', 'sleeping', 'puke', 'angry'];

const authors = [
  'user_agent',
  'Keks',
  'Luntic',
  'Aligator_Gena',
  'Suslik',
];

const textComments = [
  'Всем привет!',
  'Крутой фильм!',
  'Какой отстой, фу!',
  'Лучшее, что я видел.',
  'Ну так, с пивом пойдет)',
];

const datesComment = [
  '2000-05-11T16:12:32.554Z',
  '2005-05-11T16:12:32.554Z',
  '2010-05-11T16:12:32.554Z',
  '2015-05-11T16:12:32.554Z',
  '2020-05-11T16:12:32.554Z'
];

export const generateComment = (id) => ({
  'id': id,
  'idUniq' : nanoid(),
  'author': authors[getRandomInt(0, authors.length - 1)],
  'comment': textComments[getRandomInt(0, textComments.length - 1)],
  'date': datesComment[getRandomInt(0, datesComment.length - 1)],
  'emotion': `${commentEmotion[getRandomInt(0, commentEmotion.length - 1)]}`
});
