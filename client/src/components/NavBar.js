import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ListIcon from '@material-ui/icons/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    toolbar: theme.mixins.toolbar,

    linkStyle: {
        textDecoration: 'none',
        color: 'white',
    },

    linkStyleRight: {
        textAlign: 'right',
        textDecoration: 'none',
        color: 'white',
    },
    button: {
        margin: theme.spacing.unit,
    },
});

const NavBar = props => {
    const { classes } = props;

    return (
        <div style={{ marginBottom: '20px' }}>
            <Grid
                container
                direction="row"
                spacing={8}
                justify="space-between"
                alignItems="center"
                style={{ margin: '10px' }}
            >
                <AppBar>
                    <Toolbar style={{ flexGrow: 1 }}>
                        <Grid item xs={6}>
                            <span>
                                <Link className={classes.linkStyle} to={'/'}>
                                    {' '}
                                    <Typography
                                        variant="headline"
                                        color="inherit"
                                    >
                                        Bayer Crop Science
                                    </Typography>
                                </Link>
                            </span>
                            <span>
                                <Link className={classes.linkStyle} to={'/'}>
                                    {' '}
                                    <Typography
                                        variant="body1"
                                        color="inherit"
                                        gutterBottom="true"
                                    >
                                        IT Onboarding
                                    </Typography>
                                </Link>
                            </span>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            spacing={4}
                            justify="flex-end"
                            alignItems="baseline"
                        >
                            <Grid item>
                                <Tooltip
                                    title="Dashboard"
                                    aria-label="Dashboard"
                                >
                                    <IconButton>
                                        <Link
                                            className={classes.linkStyleRight}
                                            to={'/'}
                                        >
                                            <DashboardIcon />
                                        </Link>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Table" aria-label="Table">
                                    <IconButton>
                                        <Link
                                            className={classes.linkStyleRight}
                                            to={'/listview'}
                                        >
                                            <ListIcon />
                                        </Link>
                                    </IconButton>
                                </Tooltip>
                            </Grid>

                            <Grid item>
                                <Tooltip title="Add" aria-label="Add">
                                    <IconButton>
                                        <Link
                                            className={classes.linkStyleRight}
                                            to={'/new'}
                                        >
                                            <AddIcon />
                                        </Link>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Grid>
            <div className={classes.toolbar} />
        </div>
    );
};

export default withStyles(styles)(NavBar);
