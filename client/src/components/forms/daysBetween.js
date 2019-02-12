export function daysBetween(start) {
    var oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
    var firstDate = new Date(Date.now())
    console.log('First' + firstDate)
    var secondDate = new Date(start)
    console.log('Second' + secondDate)
    return Math.round(secondDate.getTime() - firstDate.getTime()) / oneDay
}
