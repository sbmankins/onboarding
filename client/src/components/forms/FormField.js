import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default ({ input, label, meta: { touched, error } }) => {
    return (
        <Grid item xs={6}>
            <FormGroup style={{ margin: '20px 10px 10px 10px' }}>
                <FormLabel style={{ marginBottom: '20px ' }}>
                    <Typography variant="body1">{label}</Typography>
                </FormLabel>
                <TextField {...input} />
                <div style={{ color: 'red' }}>{touched && error}</div>
            </FormGroup>
        </Grid>
    );
};
