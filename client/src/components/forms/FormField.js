import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default ({ input, label, meta: { touched, error } }) => {
    return (
        <Grid item xs={7}>
            <Paper style={{ margin: '0px 20px', padding: '10px' }}>
                <FormGroup style={{ margin: '10px 10px 0 10px' }}>
                    <FormLabel>
                        <Typography variant="body1">{label}</Typography>
                    </FormLabel>
                    <TextField {...input} />
                    <div style={{ color: 'red' }}>{touched && error}</div>
                </FormGroup>
            </Paper>
        </Grid>
    );
};
