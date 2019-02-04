import React from 'react';
import FormLabel from '@material-ui/core/FormLabel'
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup'

export default ({input, label}) => {
  return(

      <FormGroup style={{margin: '10px 0 0 20px'}}>
        <FormLabel>{label}</FormLabel>
        <TextField style={{marginRight: '20px'}}{...input} style={{width: '300px'}}/>
      </FormGroup>
  );
};
