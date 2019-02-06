
import React from 'react';
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DatePicker, {
  FieldDatePicker,
  formatDates,
  normalizeDates,
} from '../DatePicker';
import Grid from '@material-ui/core/Grid';




export default ({input, label}) => {
  return(


    //
    <Grid item xs={7}>
      <Paper style={{margin:'10px 20px', padding:'10px'}}>
        <FormGroup style={{margin: '10px 20px 0 20px'}}>
          <FormLabel><Typography variant='body1'>{label}</Typography></FormLabel>
          <FieldDatePicker style={{width:"100%"}}
               name="dateStart"
               placeholder="Start Date"
               component={DatePicker}
               parse={normalizeDates}
               format={formatDates}/>
          </FormGroup>
        </Paper>
      </Grid>


  );
};
