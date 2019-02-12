export function daysBetween(start) {
    var oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
    var firstDate = new Date(Date.now())
    var secondDate = new Date(start)
    return Math.round(secondDate.getTime() - firstDate.getTime()) / oneDay
}
