export function daysBetween(start) {
    start = new Date(start).toLocaleDateString('en-US', {
        timeZone: 'UTC',
    });
    var now = new Date();
    var startDate = new Date(start);
    startDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((startDate.getTime() - now.getTime()) / oneDay);
    return diffDays;
}
