import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';

class EmployeeForm extends Component{
  render(){
    return(
      <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
        <Field
          type="text"
          name="formTitle"
          component="input"
        />
        <button type="submit">submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'employeeForm'
}) (EmployeeForm);
