import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import employeeFormFields from './employeeFormFields';


class EmployeeForm extends Component{

  renderFields(){
    return _.map(employeeFormFields, ({label, name, component, type}) => {
      return(
        <Field  key={name} component={component} type={type} label={label} name={name}/>
      );
    });
  };


  render(){
    return(
      <Paper style={{margin:'0 20px', padding:'10px', background:'#edeeef'}} elevation={1}>
        <Typography style={{margin: '0 0 20px 20px'}} variant="h4">Employee Detail</Typography>
        <form onSubmit={this.props.handleSubmit(this.props.handleSubmit(this.props.onEmployeeSubmit))}>
          <Grid container spacing={24}>
            {this.renderFields()}
          </Grid>
          <Button variant="contained" color="secondary" style={{padding: '10px', margin: '30px 30px 0 10px', width: '100px'}}>
            <Link to="/" style={{textDecoration:'none', color:'white', display: 'block', height: '100%'}}>Cancel</Link>
          </Button>
          <Button variant="contained" color="primary" style={{padding: '10px', margin: '30px 0 0 10px', width: '100px'}} type="submit">Next</Button>
        </form>
      </Paper>
    );
  };
}

function validate (values){
  const errors = {};

  _.each(employeeFormFields, ({name, type})=>{

    if(!values[name] && values[type] !=='date'){
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
validate,
form: 'employeeForm',
destroyOnUnmount: false
}) (EmployeeForm);
