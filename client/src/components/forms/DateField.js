import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import DatePicker, {
    FieldDatePicker,
    formatDates,
    normalizeDates,
} from './DatePicker';
import Grid from '@material-ui/core/Grid';

export default ({ label, name, placeholder, required }) => {
    return (
        //
        <Grid item xs={6}>
            <FormGroup style={{ margin: '20px 0 20px 10px' }}>
                <FormLabel style={{ marginBottom: '10px' }}>
                    <Typography variant="body1">{label}</Typography>
                </FormLabel>
                <FieldDatePicker
                    name={name}
                    required={required}
                    style={{ width: '100%' }}
                    component={DatePicker}
                    placeholder={placeholder}
                    parse={normalizeDates}
                    format={formatDates}
                />
            </FormGroup>
        </Grid>
    );
};
