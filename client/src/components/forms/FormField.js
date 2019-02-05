import React from 'react';
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup'
import Typography from '@material-ui/core/Typography'

export default ({input, label}) => {
  return(

      <FormGroup style={{margin: '10px 20px 0 20px'}}>
        <FormLabel><Typography variant='title'>{label}</Typography></FormLabel>
        <TextField {...input} style={{width: '300px'}}/>
      </FormGroup>
  );
};
