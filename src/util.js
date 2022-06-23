import dayjs from 'dayjs';

const humanizeFullDate = (dueDate) => dayjs(dueDate).format('DD MMMM YYYY');
const humanizeYearDate = (dueDate) => dayjs(dueDate).format('YYYY');
const humanizeCommentDate = (dueDate) => dayjs(dueDate).format('YYYY/MM/DD HH:mm');
const humanizeTime = (dueTime) => dayjs(dueTime).format('H m');
const getRuntime = (runtime) =>`${Math.ceil(runtime/60)}h ${ runtime % 60}m`;

export { humanizeFullDate, humanizeYearDate, humanizeTime, getRuntime, humanizeCommentDate};
