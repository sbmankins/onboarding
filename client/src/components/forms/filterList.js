export function filterList(progress, complete, hold, roadblock, employees) {
    let progressArray;
    let holdArray;
    let roadblockArray;
    let completeArray;
    if (progress) {
        progressArray = employees.filter(
            employee => employee._status.name === 'In progress'
        );
    } else {
        progressArray = [];
    }

    if (complete) {
        completeArray = employees.filter(
            employee => employee._status.name === 'Complete'
        );
    } else {
        completeArray = [];
    }

    if (roadblock) {
        roadblockArray = employees.filter(
            employee => employee._status.name === 'Roadblock'
        );
    } else {
        roadblockArray = [];
    }

    if (hold) {
        holdArray = employees.filter(
            employee => employee._status.name === 'On hold'
        );
    } else {
        holdArray = [];
    }

    const filteredEmployeesList = [
        ...progressArray,
        ...completeArray,
        ...roadblockArray,
        ...holdArray,
    ];

    const filteredEmployees = filteredEmployeesList.sort(function(a, b) {
        // convert date object into number to resolve issue in typescript
        return +new Date(a.dateStart) - +new Date(b.dateStart);
    });
    console.log(filteredEmployees);
    return filteredEmployees;
}
