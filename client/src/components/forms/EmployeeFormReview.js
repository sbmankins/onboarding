import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import employeeFormFields from './employeeFormFields';
import _ from 'lodash';

const EmployeeFormReview = ({onCancel, formValues}) => {
  const reviewFields = _.map(employeeFormFields, ({name, label}) => {
    return(
      <div key={name} style={{marginBottom:'10px'}}>
        <Typography style={{fontWeight:'bold'}}>{label}</Typography>
        <div><Typography variant="body1">{formValues[name]}</Typography></div>
      </div>
    );
  });
  return(
    <Paper elevation={1} style={{margin:'20px 20px', background:'#edeeef'}}>
    <div style={{margin:'20px 20px'}}>
      <Typography variant="headline" gutterBottom style={{marginTop:'20px'}}>Please confirm your entries</Typography>
        {reviewFields}
        <Button variant="contained" color="secondary" style={{padding: '10px', margin: '30px 20px 10px 10px', width: '100px'}} onClick={onCancel}>
          Back
        </Button>
    </div>
    </Paper>
  );
};

function mapStateToProps(state){

  return {formValues: state.form.employeeForm.values};
};

export default connect(mapStateToProps) (EmployeeFormReview);
