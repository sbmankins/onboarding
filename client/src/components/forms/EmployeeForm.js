import _ from 'lodash';
import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import employeeFormFields from './employeeFormFields';
import SearchSelect from './SearchSelect';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel'

const colors = [
  {
    label: "Red",
    value: "r"
  },
  {
    label: "Blue",
    value: "b"
  },
  {
    label: "Green",
    value: "g"
  },
  {
    label: "Orange",
    value: "o"
  },
  {
    label: "Purple",
    value: "p"
  },
  {
    label: "Brown",
    value: "b"
  },
  {
    label: "Teal",
    value: "t"
  }
];
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
      <Paper style={{width:'80%', margin:'0 auto', padding:'10px', background:'#edeeef'}} elevation={1}>
        <Paper style={{background:'#dbe2ef', padding:'20px', marginBottom:'20px'}}>
        <Typography style={{textAlign:'center', color:'#626f78'}} variant="title">Employee Detail</Typography>
        </Paper>
        <form onSubmit={this.props.handleSubmit(this.props.handleSubmit(this.props.onEmployeeSubmit))}>
          <Grid container spacing={24}>
            {this.renderFields()}
            <Grid item xs={7}>
              <Paper style={{margin:'0px 20px', padding:'10px'}}>
                <FormGroup style={{margin: '10px 10px 0 10px'}}>
                  <FormLabel><Typography variant='body1'>Dropdown Example</Typography></FormLabel>
                  <Field
                name="favoriteColor"
                component={SearchSelect}
                options={colors}
                clearable={true}
                placeholder="Favorite Color"
                />
              </FormGroup>
            </Paper>
          </Grid>
        </Grid>
          <Button variant="contained" color="secondary" style={{margin: '30px 30px 0 10px', width: '100px'}}>
            <Link to="/" style={{textDecoration:'none', color:'white', display: 'block', height: '100%'}}>Cancel</Link>
          </Button>
          <Button variant="contained" color="primary" style={{margin: '30px 0 0 10px', width: '100px'}} type="submit">Next</Button>
      </form>
    </Paper>
    );
  };
}

function validate (values){
  //console.log(values.dateStart);
  //console.log(values.test);

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
