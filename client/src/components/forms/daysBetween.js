import moment from 'moment';

export function daysBetween(start) {
    var now = Date.now();
    var today = new Date(now).toLocaleDateString('en-US', {
        timeZone: 'UTC',
    });
    start = new Date(start).toLocaleDateString('en-US', {
        timeZone: 'UTC',
    });
    var date1 = moment(today);
    var date2 = moment(start);
    console.log(date2.diff(date1, 'days') + 1);
    return date2.diff(date1, 'days') + 1;
}
