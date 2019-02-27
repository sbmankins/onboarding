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
//import { connect } from 'react-redux';
import StatsBar from './StatsBar';
import IconButton from '@material-ui/core/IconButton';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import ClearIcon from '@material-ui/icons/Clear';
import DashboardTable from './DashboardTable';
import TableChartIcon from '@material-ui/icons/TableChart';
import DashboardIcon from '@material-ui/icons/Dashboard';

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
        margin: '0 auto',
    },

    dashTitle: {
        textAlign: 'center',
        position: 'relative',
        marginLeft: '48px',
        color: '#626f78',
        display: 'inline',
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

    floatLink: {
        textDecoration: 'none',
        color: 'white',
    },

    dashButton: {
        float: 'right',
        display: 'inline-block',
    },
});

class Dashboard extends Component {
    state = { showStatsBar: false, showTable: false };

    handleStatsClick(event, status) {
        this.setState({ showStatsBar: status });
    }

    handleTableClick(event, status) {
        this.setState({ showTable: status });
    }

    renderTableButton() {
        if (this.state.showTable === true) {
            return (
                <Tooltip title="Card View" aria-label="Card View">
                    <IconButton
                        onClick={event => {
                            this.handleTableClick(event, false);
                        }}
                    >
                        <DashboardIcon />
                    </IconButton>
                </Tooltip>
            );
        } else {
            return (
                <Tooltip title="Table View" aria-label="Table View">
                    <IconButton
                        onClick={event => {
                            this.handleTableClick(event, true);
                        }}
                    >
                        <TableChartIcon />
                    </IconButton>
                </Tooltip>
            );
        }
    }

    renderStatsButton() {
        if (this.state.showStatsBar === true) {
            return (
                <Tooltip title="Hide stats" aria-label="Hide Stats">
                    <IconButton
                        onClick={event => {
                            this.handleStatsClick(event, false);
                        }}
                    >
                        <ClearIcon />
                    </IconButton>
                </Tooltip>
            );
        } else {
            return (
                <Tooltip title="Show Stats" aria-label="Show Stats">
                    <IconButton
                        onClick={event => {
                            this.handleStatsClick(event, true);
                        }}
                    >
                        <InsertChartIcon />
                    </IconButton>
                </Tooltip>
            );
        }
    }
    renderStats() {
        if (this.state.showStatsBar === true) {
            return <StatsBar />;
        }
    }

    renderContent() {
        if (this.state.showTable === true) {
            return <DashboardTable />;
        } else
            return (
                <Grid container justify="space-evenly" spacing={24}>
                    <EmployeeList onDelete={this.onEmployeeDelete} />
                </Grid>
            );
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.outerContainer} elevation={1}>
                <Paper className={classes.headerContainer} elevation={1}>
                    <Typography className={classes.dashTitle} variant="title">
                        Dashboard
                    </Typography>

                    <div className={classes.dashButton}>
                        {this.renderStatsButton()}
                    </div>

                    <div className={classes.dashButton}>
                        {this.renderTableButton()}
                    </div>
                </Paper>

                <div>{this.renderStats()}</div>

                <div className={classes.cardContainer}>
                    {this.renderContent()}
                </div>

                <Tooltip title="New Employee" aria-label="New Employee">
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

// function mapStateToProps(state) {
//     return {
//         employees: state.employees,
//     };
// }
//
// Dashboard = connect(mapStateToProps)(Dashboard);

export default withStyles(styles)(Dashboard);
