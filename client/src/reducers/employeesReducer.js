import {
    FETCH_EMPLOYEES,
    DELETE_EMPLOYEE,
    FETCH_ONE_EMPLOYEE,
    EDIT_EMPLOYEE,
} from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_EMPLOYEES:
            return action.payload;

        case FETCH_ONE_EMPLOYEE:
            return action.payload;

        case DELETE_EMPLOYEE:
            const employeeID = action.payload;
            return state.filter(employee => employee.id !== employeeID);

        case EDIT_EMPLOYEE:
            return action.payload;

        default:
            return state;
    }
}
