import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
});

const NavBar = props => {
    const { classes } = props;

    return (
        <div style={{ marginBottom: '20px' }}>
            <AppBar>
                <Toolbar style={{ flexGrow: 1 }}>
                    <Grid
                        container
                        direction="row"
                        spacing={12}
                        justify="flex-start"
                    >
                        <Grid item xs={12}>
                            <Link
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                                to={'/'}
                            >
                                <Typography variant="headline" color="inherit">
                                    Bayer IT Onboarding
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            spacing={2}
                            justify="flex-end"
                        >
                            <Grid item xs={1}>
                                <Link
                                    style={{
                                        textAlign: 'right',
                                        textDecoration: 'none',
                                        color: 'white',
                                    }}
                                    to={'/listview'}
                                >
                                    <AssignmentIcon />
                                </Link>
                            </Grid>
                            <Grid item xs={1}>
                                <Link
                                    style={{
                                        textAlign: 'right',
                                        textDecoration: 'none',
                                        color: 'white',
                                    }}
                                    to={'/'}
                                >
                                    <DashboardIcon />
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar} />
        </div>
    );
};

export default withStyles(styles)(NavBar);

// <Link
//     style={{
//         textAlign: 'right',
//         textDecoration: 'none',
//         color: 'white',
//     }}
//     to={'/new'}
// >
//     <Typography variant="button" color="inherit">
//         New
//     </Typography>
// </Link>
