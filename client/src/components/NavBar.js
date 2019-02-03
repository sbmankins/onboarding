import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar,
});

const NavBar = (props) => {
  const { classes } = props;

  return (
        <div>
          <AppBar>
            <Toolbar>
              <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}><Typography variant="title" color="inherit">Bayer IT Onboarding</Typography></Link>
            </Toolbar>
          </AppBar>
          <div className={classes.toolbar}/>
        </div>

    )
}


export default withStyles(styles)(NavBar);
