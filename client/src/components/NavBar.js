import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  toolbar: theme.mixins.toolbar
});

const NavBar = (props) => {
  const { classes } = props;

  return (
        <div style ={{marginBottom: '20px'}}>
          <AppBar>
            <Toolbar style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}><Typography variant="headline" color="inherit">Bayer IT Onboarding</Typography></Link>
              <Link style={{ textDecoration: 'none', color: 'white' }} to={'/new'}><Typography variant="button" color="inherit">New</Typography></Link>
            </Toolbar>
          </AppBar>
          <div className={classes.toolbar}/>
        </div>

    )
}


export default withStyles(styles)(NavBar);
