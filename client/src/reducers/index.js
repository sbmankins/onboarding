import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import employeesReducer from './employeesReducer';

export default combineReducers({
    form: reduxForm,
    employees: employeesReducer,
});
