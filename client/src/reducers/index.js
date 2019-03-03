import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import employeesReducer from './employeesReducer';
import dashReducer from './dashReducer';
import filterReducer from './filterReducer';

export default combineReducers({
    form: reduxForm,
    employees: employeesReducer,
    dashState: dashReducer,
    filterState: filterReducer,
});
