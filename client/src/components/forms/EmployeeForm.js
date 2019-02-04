import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import FormField from './FormField';
import DatePicker, {
  FieldDatePicker,
  formatDates,
  normalizeDates,
} from '../DatePicker';

class EmployeeForm extends Component{

  renderFields(){
    return(
      <div>
        <Field label="First Name:  " type="text" name="firstName" component={FormField}/>
        <Field label="Last Name:  " type="text" name="lastName" component={FormField}/>
        <Field label="Manager:  " type="text" name="manager" component={FormField}/>
        <Field label="Admin:  " type="text" name="admin" component={FormField}/>
        <FieldDatePicker name="dateStart" placeholder="Start Date" component={DatePicker} parse={normalizeDates} format={formatDates}/>

    </div>
    );
  };

  render(){
    return(
      <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
        {this.renderFields()}
        <button type="submit">submit</button>
      </form>
    );
  };
}

export default reduxForm({
  form: 'employeeForm'
}) (EmployeeForm);
