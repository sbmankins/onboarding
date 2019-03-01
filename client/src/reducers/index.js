import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import employeesReducer from './employeesReducer';
import dashReducer from './dashReducer';

export default combineReducers({
    form: reduxForm,
    employees: employeesReducer,
    dashState: dashReducer,
});
