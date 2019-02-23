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
import { connect } from 'react-redux';
import { daysBetween } from './forms/daysBetween';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    outerContainer: {
        width: '90%',
        margin: '0 auto',
        padding: '10px',
        background: '#edeeef',
        textAlign: 'center',
        flexGrow: 1,
        borderRadius: '20px',
    },

    headerContainer: {
        background: '#dbe2ef',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '20px',
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

    btnFloat: {
        float: 'right',
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },

    statsBar: {
        width: '90%',
        margin: '0 auto ',
        backgroundColor: '#3f51b5',
        borderRadius: '50px',
    },

    topStats: {
        margin: '0 10px 10px 0',
        color: 'white',
    },

    bottomStats: {
        margin: '10px 10px 0 0 ',
        color: 'white',
    },

    floatLink: {
        textDecoration: 'none',
        color: 'white',
    },
});

class Dashboard extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.outerContainer} elevation={1}>
                <Paper className={classes.headerContainer} elevation={1}>
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
                        color="primary"
                        aria-label="Add"
                        className={`${classes.fab} ${classes.btnFloat}`}
                    >
                        <Link className={classes.floatLink} to={'/new'}>
                            <AddIcon />
                        </Link>
                    </Fab>
                </Tooltip>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    return {
        employees: state.employees,
    };
}

Dashboard = connect(mapStateToProps)(Dashboard);

export default withStyles(styles)(Dashboard);
