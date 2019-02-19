import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import EmployeeList from './forms/EmployeeList';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const styles = theme => ({
    outerContainer: {
        width: '90%',
        margin: '0 auto',
        padding: '10px',
        background: '#edeeef',
        textAlign: 'center',
    },

    headerContainer: {
        background: '#dbe2ef',
        padding: '20px',
        marginBottom: '20px',
    },

    dashTitle: {
        textAlign: 'center',
        color: '#626f78',
    },

    cardContainer: {
        flexGrow: 1,
    },

    fab: {
        margin: theme.spacing.unit,
    },
});

class Dashboard extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.outerContainer} elevation={1}>
                <Paper className={classes.headerContainer}>
                    <Typography className={classes.dashTitle} variant="title">
                        Dashboard
                    </Typography>
                </Paper>
                <div className={classes.cardContainer}>
                    <Grid container justify="space-evenly" spacing={24}>
                        <EmployeeList onDelete={this.onEmployeeDelete} />
                    </Grid>
                </div>
                <Tooltip title="Add" aria-label="Add">
                    <Fab
                        style={{
                            float: 'right',
                            margin: 0,
                            top: 'auto',
                            right: 20,
                            bottom: 20,
                            left: 'auto',
                            position: 'fixed',
                        }}
                        color="primary"
                        aria-label="Add"
                        className={classes.fab}
                    >
                        {' '}
                        <Link
                            style={{ textDecoration: 'none', color: 'white' }}
                            to={'/new'}
                        >
                            <AddIcon />
                        </Link>
                    </Fab>
                </Tooltip>
            </Paper>
        );
    }
}

export default withStyles(styles)(Dashboard);
