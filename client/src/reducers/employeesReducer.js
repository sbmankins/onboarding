import { FETCH_EMPLOYEES, DELETE_EMPLOYEE } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_EMPLOYEES:
            return action.payload;

        case DELETE_EMPLOYEE:
            const employeeID = action.payload;
            console.log('from reducer ' + employeeID);
            return state.filter(employee => employee.id !== employeeID);

        default:
            return state;
    }
}
