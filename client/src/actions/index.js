import axios from 'axios';

import {
    ADD_EMPLOYEE,
    FETCH_EMPLOYEES,
    DELETE_EMPLOYEE,
    FETCH_ONE_EMPLOYEE,
    EDIT_EMPLOYEE,
    TABLE_STATE,
    STATS_STATE,
    COMPLETE_STATE,
    PROGRESS_STATE,
    HOLD_STATE,
    ROADBLOCK_STATE,
} from './types.js';

export const getCompleteState = completeState => {
    return {
        type: COMPLETE_STATE,
        payload: completeState,
    };
};

export const getProgressState = progressState => {
    return {
        type: PROGRESS_STATE,
        payload: progressState,
    };
};

export const getHoldState = holdState => {
    return {
        type: HOLD_STATE,
        payload: holdState,
    };
};

export const getRoadblockState = roadblockState => {
    return {
        type: ROADBLOCK_STATE,
        payload: roadblockState,
    };
};

export const getTableState = tableState => {
    return {
        type: TABLE_STATE,
        payload: tableState,
    };
};

export const getStatsState = statsState => {
    return {
        type: STATS_STATE,
        payload: statsState,
    };
};

export const submitEmployee = (values, history) => async dispatch => {
    const res = await axios.post('/api/employees', values);
    history.push('/');
    dispatch({ type: ADD_EMPLOYEE, payload: res.data });
};

export const fetchEmployees = () => async dispatch => {
    const res = await axios.get('/api/employees');
    dispatch({ type: FETCH_EMPLOYEES, payload: res.data });
};

export const deleteEmployee = id => async dispatch => {
    const req = await axios.delete(`/api/${id}`);
    dispatch({ type: DELETE_EMPLOYEE, payload: req });
};

export const fetchOneEmployee = id => async dispatch => {
    const res = await axios.get(`/api/${id}`);
    dispatch({ type: FETCH_ONE_EMPLOYEE, payload: res.data });
};

export const editEmployee = (id, values, history) => async dispatch => {
    const res = await axios.put(`/api/${id}`, values);
    history.push('/');
    dispatch({ type: EDIT_EMPLOYEE, payload: res.data });
};
