import React from 'react';
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


export default ({input, label, meta: {touched, error}}) => {
  return(

    <Paper style={{margin:'10px 20px', padding:'10px'}}>
      <FormGroup style={{margin: '10px 20px 0 20px'}}>
        <FormLabel><Typography variant='body1'>{label}</Typography></FormLabel>
        <TextField {...input} />
        <div style={{color:'red'}}>
          {touched && error}
        </div>
      </FormGroup>
    </Paper>
  );
};
