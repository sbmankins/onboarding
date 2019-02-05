import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import FormField from './FormField';
import DatePicker, {
  FieldDatePicker,
  formatDates,
  normalizeDates,
} from '../DatePicker';
import Button from '@material-ui/core/Button';


class EmployeeForm extends Component{

  renderFields(){
    return(
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Field label="First Name:  " type="text" name="firstName" component={FormField}/>
        <Field label="Last Name:  " type="text" name="lastName" component={FormField}/>
        <Field label="Manager:  " type="text" name="manager" component={FormField}/>
        <Field label="Admin:  " type="text" name="admin" component={FormField}/>
        <div style={{margin:'10px 0 0 10px'}}>
          <FieldDatePicker name="dateStart" placeholder="Start Date" component={DatePicker} parse={normalizeDates} format={formatDates}/>
        </div>
    </div>
    );
  };

  render(){
    return(
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Button variant="contained" color="primary" style={{margin: '30px 0 0 10px', width: '50px'}} type="submit">submit</Button>
        </form>
    );
  };
}

export default reduxForm({
  form: 'employeeForm'
}) (EmployeeForm);
