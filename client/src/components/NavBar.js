import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';


const NavBar = () => {

    return(
        <div>
          <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={8}>
            <AppBar position="static">
              <Toolbar>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}><Typography variant="title" color="inherit">Bayer IT Onboarding</Typography></Link>
                </Grid>
              </Toolbar>
            </AppBar>
          </Grid>
        </div>
    )
}


export default NavBar;
