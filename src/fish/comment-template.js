import { getRandomInt } from '../util.js';

const commentEmotion = ['smile', 'sleeping', 'puke', 'angry'];


export const generateComment = () => ({
  'id': getRandomInt(1, 5),
  'author': 'Ilya O\'Reilly',
  'comment': 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  'date': '2019-05-11T16:12:32.554Z',
  'emotion': `${commentEmotion[getRandomInt(0, commentEmotion.length-1)]}`
});
