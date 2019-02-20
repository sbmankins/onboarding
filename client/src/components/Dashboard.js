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

    getNextSevenCount() {
        let sevenCount = 0;
        this.props.employees.forEach(function(employee) {
            let start = new Date();
            start = employee.dateStart;

            const between = daysBetween(start);
            if ((between > 0) & (between <= 7)) {
                sevenCount++;
            }
        });

        if (sevenCount === 1) {
            return 'There is 1 employee onboarding in the next seven days.';
        } else if (sevenCount > 1) {
            return (
                'There are ' +
                sevenCount +
                '  employees onboarding in the next seven days.'
            );
        } else if (sevenCount === 0) {
            return 'There are no employees onboarding in the next seven days.';
        }
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

        if (lateCount === 1) {
            return 'There is 1 employee overdue.';
        } else if (lateCount > 1) {
            return 'There are ' + lateCount + '  employees overdue.';
        } else if (lateCount === 0) {
            return 'There are no employees overdue.';
        }
    }

    getTodayCount() {
        let todayCount = 0;
        this.props.employees.forEach(function(employee) {
            let start = new Date();
            start = employee.dateStart;

            const between = daysBetween(start);
            console.log(between);
            if (between === 0) {
                todayCount++;
            }
            console.log(todayCount);
        });

        if (todayCount === 1) {
            return 'There is 1 employee onboarding today.';
        } else if (todayCount > 1) {
            return 'There are ' + todayCount + '  employees onboarding today.';
        } else if (todayCount === 0) {
            return 'There are no employees onboarding today.';
        }
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
                    <Paper
                        className={classes.dashTitle}
                        elevation={1}
                        style={{
                            width: '60%',
                            minHeight: '50px',
                            margin: '0 auto ',
                            padding: '20px',
                            backgroundColor: '#3f51b5',
                        }}
                    >
                        <Typography
                            variant="title"
                            gutterBottom={true}
                            style={{
                                margin: '20px ',

                                color: 'white',
                            }}
                        >
                            {' '}
                            &mdash; There are currently{' '}
                            {this.props.employees.length} employees onboarding.
                        </Typography>
                        <Typography
                            variant="title"
                            gutterBottom={true}
                            style={{
                                margin: '20px ',

                                color: 'white',
                            }}
                        >
                            &mdash; {this.getTodayCount()}
                        </Typography>
                        <Typography
                            variant="title"
                            gutterBottom={true}
                            style={{
                                margin: '20px ',

                                color: 'white',
                            }}
                        >
                            &mdash; {this.getNextSevenCount()}
                        </Typography>
                        <Typography
                            variant="title"
                            gutterBottom={true}
                            style={{
                                margin: '20px ',

                                color: 'white',
                            }}
                        >
                            &mdash; {this.getLateCount()}
                        </Typography>
                    </Paper>
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
