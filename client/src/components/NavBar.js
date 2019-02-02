import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const NavBar = (props) => {
  const { classes } = props;
    return(
        <div>
        <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={8}>
        <AppBar position="static">
            <Toolbar>
             <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="title" color="inherit">Bayer IT Onboarding</Typography>
                </Grid>
                <Grid item xs={3} sm={2} md={2} lg={2}>
                <Button variant="contained" className={classes.button} color="gray" href="/"><Typography variant="button">Home</Typography></Button>
                </Grid>
            </Toolbar>
        </AppBar>
        </Grid>
        </div>
    )
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
