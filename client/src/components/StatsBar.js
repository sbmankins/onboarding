import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { daysBetween } from './forms/daysBetween';

const styles = theme => ({
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
        width: '60%',
        margin: '0 auto ',
        backgroundColor: '#3f51b5',
        borderRadius: '20px',
    },

    topStats: {
        margin: '0 10px 10px 0',
        color: 'white',
    },

    bottomStats: {
        margin: '10px 10px 0 0 ',
        color: 'white',
    },
});

class Dashboard extends Component {
    getStatuses() {
        let inProgress = 0;
        let roadblock = 0;
        let onHold = 0;
        let complete = 0;
        let emplStatus = {};

        //Determine total number by status

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

    //Determine number of employees onboarding in the next 7 days
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
    //Determine the number of employees who are past start date and not status = complete
    getLateCount() {
        let lateCount = 0;
        this.props.employees.forEach(function(employee) {
            let start = new Date();
            start = employee.dateStart;

            const between = daysBetween(start);
            if (
                (between < 0 || between === undefined) &&
                employee._status.name !== 'Complete'
            ) {
                lateCount++;
            }
        });
        return lateCount;
    }
    //Determine the number of employees onboarding today
    getTodayCount() {
        let todayCount = 0;
        this.props.employees.forEach(function(employee) {
            let start = new Date();
            start = employee.dateStart;

            const between = daysBetween(start);

            if (between === 0) {
                todayCount++;
            }
        });

        return todayCount;
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ marginBottom: '15px' }}>
                <Card
                    raised={true}
                    className={`${classes.dashTitle} ${classes.statsBar}`}
                >
                    <CardContent>
                        <Grid container justify="center" spacing={8}>
                            <Grid item>
                                <Typography
                                    variant="title"
                                    className={classes.topStats}
                                >
                                    <strong>Total:</strong>{' '}
                                    {this.props.employees.length}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="title"
                                    className={classes.topStats}
                                >
                                    <strong>Today:</strong>{' '}
                                    {this.getTodayCount()}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="title"
                                    className={classes.topStats}
                                >
                                    <strong>Next 7 days:</strong>{' '}
                                    {this.getNextSevenCount()}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="title"
                                    className={classes.topStats}
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
                                    className={classes.bottomStats}
                                >
                                    <strong>In Progress:</strong>{' '}
                                    {this.getStatuses().InProgress}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.bottomStats}
                                >
                                    <strong>On hold:</strong>{' '}
                                    {this.getStatuses().OnHold}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.bottomStats}
                                >
                                    <strong>Roadblock:</strong>{' '}
                                    {this.getStatuses().Roadblock}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.bottomStats}
                                >
                                    <strong>Complete:</strong>{' '}
                                    {this.getStatuses().Complete}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
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
