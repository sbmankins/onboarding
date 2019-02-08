import axios from 'axios';
import {ADD_EMPLOYEE} from './types.js';


  export const submitEmployee = values => async dispatch => {
    const res = await axios.post('/api/employees', values);
    dispatch ({type: ADD_EMPLOYEE, payload: res.data});
  };
