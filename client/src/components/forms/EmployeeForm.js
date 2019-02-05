import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import FormField from './FormField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import DateField from './DateField';


class EmployeeForm extends Component{

  renderFields(){
    return(
      <Grid container direction="column" spacing={24}>
        <Grid container direction="row">
          <Grid item xs={6}>
            <Field label="First Name:" type="text" name="firstName" component={FormField}/>
          </Grid>
          <Grid item xs={6}>
            <Field label="Last Name:" type="text" name="lastName" component={FormField}/>
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ padding:'20px', margin:'10px 0 0 20px'}}>
          <Field label="Start Date:" name="dateStart" type="text" component={DateField}/>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
        <Grid item xs={7}>
          <Field label="Manager:" type="text" name="manager" component={FormField}/>
        </Grid>
        <Grid item xs={7}>
          <Field label="Admin:" type="text" name="admin" component={FormField}/>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
      </Grid>

    );
  };

  render(){
    return(
      <Paper style={{margin:'0 20px', padding:'10px', background:'#edeeef'}} elevation={1}>
        <Typography style={{margin: '0 0 20px 20px'}} variant="h4">Employee Detail</Typography>
        <form onSubmit={this.props.handleSubmit(this.props.handleSubmit(this.props.onEmployeeSubmit))}>
          {this.renderFields()}
          <Button variant="contained" color="secondary" style={{padding: '10px', margin: '30px 30px 0 10px', width: '100px'}}>
            <Link to="/" style={{textDecoration:'none', color:'white', display: 'block', height: '100%'}}>Cancel</Link>
          </Button>
          <Button variant="contained" color="primary" style={{padding: '10px', margin: '30px 0 0 10px', width: '100px'}} type="submit">submit</Button>
        </form>
      </Paper>
    );
  };
}

function validate (values){
  const errors = {};
  console.log(values.dateStart);

  if (!values.firstName){
    errors.firstName = 'You must provide a first name';
  }
  if (!values.lastName){
    errors.lastName = 'You must provide a last name';
  }

  // if (!values.dateStart){
  //   errors.dateStart = 'Date required';
  // }

  if (!values.manager){
    errors.manager = 'You must provide a manager';
  }

  if (!values.admin){
    errors.admin= 'You must provide an admin';
  }

  return errors;

}

export default reduxForm({
validate,
form: 'employeeForm'
}) (EmployeeForm);
