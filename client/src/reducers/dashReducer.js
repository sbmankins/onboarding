import { TABLE_STATE, STATS_STATE } from '../actions/types';

const initState = {
    showStatsBar: false,
    showTable: false,
};
export default function(state = initState, action) {
    console.log(action.payload);
    switch (action.type) {
        case TABLE_STATE:
            return { ...state, showTable: action.payload };

        case STATS_STATE:
            return { ...state, showStatsBar: action.payload };

        default:
            return state;
    }
}
