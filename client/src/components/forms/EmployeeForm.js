import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import FormField from './FormField';

class EmployeeForm extends Component{

  renderFields(){
    return(
      <div>
        <Field
          type="text"
          name="surveyTitle"
          component={FormField}
        />
      </div>
    );
  }

  render(){
    return(
      <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
        <FormField />
        <button type="submit">submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'employeeForm'
}) (EmployeeForm);
