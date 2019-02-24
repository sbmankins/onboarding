export function daysBetween(start) {
    const oneDay = 24 * 60 * 60 * 1000;
    start = new Date(start).toLocaleDateString('en-US', {
        timeZone: 'UTC',
    });
    const now = new Date();
    const startDate = new Date(start);
    startDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffDays = Math.round((startDate.getTime() - now.getTime()) / oneDay);
    return diffDays;
}
