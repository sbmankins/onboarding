import { DASH_STATE } from '../actions/types';

export default function dashStateReducer(dashState = {}, action) {
    if (action.type === DASH_STATE) {
        return action.payload;
    }

    return dashState;
}