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

    btnFloat: {
        float: 'right',
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
});

class Dashboard extends Component {
    componentDidMount() {
        console.log(this.props);
    }

    getStatuses() {
        let inProgress = 0;
        let roadblock = 0;
        let onHold = 0;
        let complete = 0;
        let emplStatus = {};

        this.props.employees.forEach(function(employee) {
            if (employee._status.name === 'In progress') {
                inProgress++;
            } else if (employee._status.name === 'On hold') {
                onHold++;
            } else if (employee._status.name === 'Roadblock') {
                roadblock++;
            } else if (employee._status.name === 'Complete') {
                complete++;
            }
        });
        emplStatus = {
            InProgress: inProgress,
            Roadblock: roadblock,
            OnHold: onHold,
            Complete: complete,
        };
        return emplStatus;
    }

    getNextSevenCount() {
        let sevenCount = 0;
        this.props.employees.forEach(function(employee) {
            let start = new Date();
            start = employee.dateStart;

            const between = daysBetween(start);
            if (
                between >= 0 &&
                between <= 7 &&
                employee._status.name !== 'Complete'
            ) {
                sevenCount++;
            }
        });

        return sevenCount;
    }

    getLateCount() {
        let lateCount = 0;
        this.props.employees.forEach(function(employee) {
            let start = new Date();
            start = employee.dateStart;

            const between = daysBetween(start);
            if (between < 0 || between === undefined) {
                lateCount++;
            }
        });
        return lateCount;
    }

    getTodayCount() {
        let todayCount = 0;
        this.props.employees.forEach(function(employee) {
            let start = new Date();
            start = employee.dateStart;

            const between = daysBetween(start);

            if (between >= 0 && between < 1) {
                todayCount++;
            }
        });

        return todayCount;
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.outerContainer} elevation={1}>
                <Paper className={classes.headerContainer} elevation={1}>
                    <Typography className={classes.dashTitle} variant="title">
                        Dashboard
                    </Typography>
                </Paper>
                <div style={{ marginBottom: '15px' }}>
                    <Card
                        raised={true}
                        className={classes.dashTitle}
                        style={{
                            width: '50%',

                            margin: '0 auto ',

                            backgroundColor: '#3f51b5',
                            borderRadius: '100px',
                        }}
                    >
                        <CardContent>
                            <Grid container justify="center" spacing={8}>
                                <Grid item>
                                    <Typography
                                        variant="title"
                                        style={{
                                            margin: '10px ',

                                            color: 'white',
                                        }}
                                    >
                                        <strong>Total:</strong>{' '}
                                        {this.props.employees.length}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="title"
                                        style={{
                                            margin: '10px ',

                                            color: 'white',
                                        }}
                                    >
                                        <strong>Today:</strong>{' '}
                                        {this.getTodayCount()}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="title"
                                        style={{
                                            margin: '10px ',

                                            color: 'white',
                                        }}
                                    >
                                        <strong>Next 7 days:</strong>{' '}
                                        {this.getNextSevenCount()}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="title"
                                        style={{
                                            margin: '10px ',

                                            color: 'white',
                                        }}
                                    >
                                        <strong>Overdue:</strong>{' '}
                                        {this.getLateCount()}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider
                                variant="middle"
                                style={{ backgroundColor: 'white' }}
                            />
                            <Grid container justify="center" spacing={8}>
                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        style={{
                                            margin: '10px ',

                                            color: 'white',
                                        }}
                                    >
                                        <strong>In Progress:</strong>{' '}
                                        {this.getStatuses().InProgress}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        style={{
                                            margin: '10px ',

                                            color: 'white',
                                        }}
                                    >
                                        <strong>On hold:</strong>{' '}
                                        {this.getStatuses().OnHold}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        style={{
                                            margin: '10px ',

                                            color: 'white',
                                        }}
                                    >
                                        {' '}
                                        <strong>Roadblock:</strong>{' '}
                                        {this.getStatuses().Roadblock}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        variant="body1"
                                        style={{
                                            margin: '10px ',

                                            color: 'white',
                                        }}
                                    >
                                        <strong>Complete:</strong>{' '}
                                        {this.getStatuses().Complete}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
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

function mapStateToProps(state) {
    return {
        employees: state.employees,
    };
}

Dashboard = connect(mapStateToProps)(Dashboard);

export default withStyles(styles)(Dashboard);
