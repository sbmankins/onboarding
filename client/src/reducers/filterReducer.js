// import {
//     COMPLETE_STATE,
//     PROGRESS_STATE,
//     HOLD_STATE,
//     ROADBLOCK_STATE,
// } from '../actions/types';
//
// const initState = {
//     showProgress: true,
//     showComplete: true,
//     showRoadblock: true,
//     showHold: true,
// };
// export default function(state = initState, action) {
//     switch (action.type) {
//         case COMPLETE_STATE:
//             return { ...state, showComplete: action.payload };
//
//         case PROGRESS_STATE:
//             return { ...state, showProgress: action.payload };
//
//         case HOLD_STATE:
//             return { ...state, showHold: action.payload };
//
//         case ROADBLOCK_STATE:
//             return { ...state, showRoadblock: action.payload };
//
//         default:
//             return state;
//     }
// }
