import dayjs from 'dayjs';

const humanizeDate = (dueDate) => dayjs(dueDate).format('YYYY');

const isCtrlKey = (evt) => evt.key === 'Ctrl';

const isEnterKey = (evt) => evt.key === 'Enter';

export { humanizeDate, isCtrlKey, isEnterKey};
