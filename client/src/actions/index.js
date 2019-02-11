import axios from 'axios'
import { ADD_EMPLOYEE, FETCH_EMPLOYEES, DELETE_EMPLOYEE } from './types.js'

export const submitEmployee = (values, history) => async dispatch => {
    const res = await axios.post('/api/employees', values)
    history.push('/')
    dispatch({ type: ADD_EMPLOYEE, payload: res.data })
}

export const fetchEmployees = () => async dispatch => {
    const res = await axios.get('api/employees')
    dispatch({ type: FETCH_EMPLOYEES, payload: res.data })
}

export const deleteEmployee = id => async dispatch => {
    console.log('action: ' + id)
    const req = await axios.delete(`/api/${id}`)
    dispatch({ type: DELETE_EMPLOYEE, payload: req })
}
