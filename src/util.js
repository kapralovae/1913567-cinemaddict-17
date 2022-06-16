import dayjs from 'dayjs';

const humanizeDate = (dueDate) => dayjs(dueDate).format('YYYY');

export { humanizeDate, };
