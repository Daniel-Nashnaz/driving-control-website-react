import moment from 'moment';

export function formatTimeWithAM_PM(time)  {
    return moment(time).format("YYYY-MM-DD, h:mm:ss a");
}




export function formatTime(time) {
  return moment(time).format("MM/DD/YYYY HH:mm:ss");
}

