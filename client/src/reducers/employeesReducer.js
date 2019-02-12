import { FETCH_EMPLOYEES, DELETE_EMPLOYEE } from '../actions/types'

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_EMPLOYEES:
            return action.payload

        case DELETE_EMPLOYEE:
            return state.filter(employee => employee.id !== action.id)

        default:
            return state
    }
}
