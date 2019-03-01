import axios from 'axios';
import {
    ADD_EMPLOYEE,
    ADD_TICKET,
    FETCH_EMPLOYEES,
    DELETE_EMPLOYEE,
    FETCH_ONE_EMPLOYEE,
    EDIT_EMPLOYEE,
    DASH_STATE,
} from './types.js';

export const getDashState = (tableState, statsState) => async dispatch => {
    return {
        type: DASH_STATE,
        payload: {
            showStatsBar: statsState,
            showTable: tableState,
        },
    };
};

export const submitEmployee = (values, history) => async dispatch => {
    const res = await axios.post('/api/employees', values);
    history.push('/');
    dispatch({ type: ADD_EMPLOYEE, payload: res.data });
};

export const submitTicket = (values, history, id) => async dispatch => {
    console.log(id);
    const value = { values: values, id: id };
    const res = await axios.post(`/api/tickets/`, value);
    history.push('/');
    dispatch({ type: ADD_TICKET, payload: res.data });
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
