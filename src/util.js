import dayjs from 'dayjs';

const getRandomInt = (from, to) => {
  from = Math.ceil(from);
  to = Math.floor(to);
  if (from <0 || to <0) {
    return 0;
  }
  if (from > to) {
    const memory = from;
    from = to;
    to = memory;
  }
  return Math.floor(Math.random() * (to - from + 1) + from);
};

const humanizeDate = (dueDate) => dayjs(dueDate).format('YYYY');

export {getRandomInt, humanizeDate, };
