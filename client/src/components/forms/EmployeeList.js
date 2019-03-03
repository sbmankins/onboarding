import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import {
    fetchEmployees,
    deleteEmployee,
    getHoldState,
    getCompleteState,
    getRoadblockState,
    getProgressState,
} from '../../actions';
import { daysBetween } from './daysBetween';
import { filterList } from './filterList';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 12,
    },

    deleteIcon: {
        color: 'white',
        fontSize: '1.3rem',
    },
    editIcon: {
        color: 'white',
        fontSize: '1.3rem',
    },

    ticketButton: {
        padding: '3px',
        borderRadius: '20px',
        backgroundColor: '#bd512f',
        '&:hover': {
            backgroundColor: '#B34725',
        },
    },

    cardDivider: {
        margin: '5px 0 5px 0',
    },
});

//conditional styles for card background
const Normaltext = {
    color: 'black',
};
const Warning = {
    backgroundColor: '#faf096',
    margin: '20px',
    borderRadius: '30px',
};

const Dangertext = {
    color: 'white',
};

const Danger = {
    backgroundColor: '#c82121',
    margin: '20px',
    borderRadius: '30px',
};

const Good = {
    backgroundColor: '#acdeaa',
    margin: '20px',
    borderRadius: '30px',
};

let New = {};
let NewColor = {};

class EmployeeList extends Component {
    state = {
        employees: [],
        employee: {},
        employeeID: '',
        toDashboard: false,
        editing: false,
        ticket: false,
        showProgress: false,
        showComplete: false,
        showRoadblock: false,
        showHold: false,
        filteredEmployees: [],
    };

    async componentDidMount() {
        this.setState({ employees: await this.props.fetchEmployees() });

        this.setState({ editing: false });

        await this.setState({
            showProgress: this.props.filterState.showProgress,
            showComplete: this.props.filterState.showComplete,
            showRoadblock: this.props.filterState.showRoadblock,
            showHold: this.props.filterState.showHold,
        });

        const filteredEmployees = filterList(
            this.props.filterState.showProgress,
            this.props.filterState.showComplete,
            this.props.filterState.showHold,
            this.props.filterState.showRoadblock,
            this.props.employees
        );
        await this.setState({ filteredEmployees: filteredEmployees });
    }

    handleChange = name => event => {
        if (name === 'showProgress') {
            this.props.getProgressState(event.target.checked);
        }
        if (name === 'showComplete') {
            this.props.getCompleteState(event.target.checked);
        }
        if (name === 'showHold') {
            this.props.getHoldState(event.target.checked);
        }
        if (name === 'showRoadblock') {
            this.props.getRoadblockState(event.target.checked);
        }

        this.setState({ [name]: event.target.checked }, () => {
            const filteredEmployees = filterList(
                this.state.showProgress,
                this.state.showComplete,
                this.state.showHold,
                this.state.showRoadblock,
                this.props.employees
            );

            this.setState({ filteredEmployees: filteredEmployees });
        });
    };

    onEmployeeDelete = async (event, id) => {
        event.preventDefault();
        this.props.deleteEmployee(id);
        const newFilterList = this.state.filteredEmployees.filter(
            employee => employee._id !== id
        );

        this.setState({ filteredEmployees: newFilterList });
        console.log(newFilterList);
    };

    handleEditClick = (event, id) => {
        event.preventDefault();
        this.setState({
            employeeID: id,
            toDashboard: true,
            editing: true,
            ticket: false,
        });
    };

    handleTicketClick = (event, id) => {
        event.preventDefault();
        this.setState({
            employeeID: id,
            toDashboard: true,
            editing: true,
            ticket: true,
        });
    };
    //Determine whether or not to show ticket button
    renderButton(cwID, neID, id) {
        const { classes } = this.props;

        if (
            cwID &&
            (cwID !== undefined || cwID !== '') &&
            (neID && (neID !== undefined || neID !== ''))
        ) {
            return (
                <Tooltip title="Tickets" aria-label="Tickets">
                    <Button
                        variant="contained"
                        editing="true"
                        className={`${classes.button} ${classes.ticketButton}`}
                        onClick={(e, key) => this.handleTicketClick(e, id)}
                    >
                        <LocalActivityIcon
                            className={`${classes.iconRight} ${
                                classes.editIcon
                            }`}
                        />
                    </Button>
                </Tooltip>
            );
        } else return <div />;
    }
    //Create individual employee cards
    renderEmployees() {
        const { classes } = this.props;
        return (
            this.state.filteredEmployees &&
            this.state.filteredEmployees.map(employee => {
                const id = employee._id;
                let start = new Date();
                start = employee.dateStart;

                //get the number of days until employee onboarding and conditionallly style card color
                const between = daysBetween(start);

                if (between >= 7) {
                    New = Good;
                    NewColor = Normaltext;
                } else if (between >= 0 && between <= 7) {
                    New = Warning;
                    NewColor = Normaltext;
                } else {
                    New = Danger;
                    NewColor = Dangertext;
                }

                return (
                    <Grid
                        item
                        style={{
                            display: 'inline-block',
                        }}
                        xs={12}
                        key={employee._id}
                    >
                        <Card style={New} raised={true}>
                            <CardContent>
                                <Typography
                                    style={NewColor}
                                    variant="title"
                                    component="h6"
                                >
                                    {employee.firstName} {employee.lastName}
                                </Typography>
                                <Divider
                                    className={classes.cardDivider}
                                    variant="middle"
                                />
                                <div style={{ textAlign: 'Left' }}>
                                    <Typography style={NewColor} component="p">
                                        <strong>Manager:</strong>{' '}
                                        {employee._manager.name}
                                    </Typography>
                                    <Typography style={NewColor} component="p">
                                        <strong>Admin:</strong>{' '}
                                        {employee._admin.name}
                                    </Typography>
                                    <Divider
                                        className={classes.cardDivider}
                                        variant="middle"
                                    />
                                    <Grid container spacing={24}>
                                        <Grid item xs={6}>
                                            <Typography
                                                style={NewColor}
                                                component="p"
                                            >
                                                <strong>Start Date:</strong>{' '}
                                                {new Date(
                                                    employee.dateStart
                                                ).toLocaleDateString('en-US', {
                                                    timeZone: 'UTC',
                                                })}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography
                                                style={NewColor}
                                                component="p"
                                            >
                                                <strong>Status:</strong>
                                                <br />
                                                {employee._status.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </CardContent>
                            <CardActions disableActionSpacing={true}>
                                <Tooltip title="Edit" aria-label="Edit">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        editing="true"
                                        className={classes.button}
                                        style={{
                                            padding: '3px',
                                            borderRadius: '20px',
                                        }}
                                        onClick={(e, key) =>
                                            this.handleEditClick(e, id)
                                        }
                                    >
                                        <EditIcon
                                            className={`${classes.iconRight} ${
                                                classes.editIcon
                                            }`}
                                        />
                                    </Button>
                                </Tooltip>
                                {this.renderButton(
                                    employee.cwID,
                                    employee.neID,
                                    id
                                )}
                                <Tooltip title="Delete" aria-label="Delete">
                                    <Button
                                        style={{
                                            padding: '3px',
                                            borderRadius: '20px',
                                        }}
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        onClick={(event, key) => {
                                            if (
                                                window.confirm(
                                                    'Delete the item?'
                                                )
                                            ) {
                                                this.onEmployeeDelete(
                                                    event,
                                                    id
                                                );
                                            }
                                        }}
                                    >
                                        <DeleteForeverIcon
                                            className={`${classes.iconRight} ${
                                                classes.deleteIcon
                                            }`}
                                        />
                                    </Button>
                                </Tooltip>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })
        );
    }

    render() {
        if (this.state.toDashboard === true && this.state.employee) {
            return (
                <Redirect
                    to={{
                        pathname: '/new',
                        state: {
                            employee: this.state.employeeID,
                            editing: this.state.editing,
                            ticket: this.state.ticket,
                        },
                    }}
                />
            );
        }
        return (
            <div>
                <Grid container justify="center">
                    <div>
                        <FormGroup
                            row
                            style={{ margin: '20px', color: 'white' }}
                        >
                            <FormControlLabel
                                style={{ color: 'white' }}
                                control={
                                    <Checkbox
                                        checked={this.state.showProgress}
                                        onChange={this.handleChange(
                                            'showProgress'
                                        )}
                                        value="showProgress"
                                        color="primary"
                                    />
                                }
                                label="In progress"
                            />
                            <FormControlLabel
                                style={{ color: 'white' }}
                                control={
                                    <Checkbox
                                        checked={this.state.showHold}
                                        onChange={this.handleChange('showHold')}
                                        value="showHold"
                                        color="primary"
                                    />
                                }
                                label="On hold"
                            />
                            <FormControlLabel
                                style={{ color: 'white' }}
                                control={
                                    <Checkbox
                                        checked={this.state.showRoadblock}
                                        onChange={this.handleChange(
                                            'showRoadblock'
                                        )}
                                        value="showRoadblock"
                                        color="primary"
                                    />
                                }
                                label="Roadblock"
                            />
                            <FormControlLabel
                                style={{ color: 'white' }}
                                control={
                                    <Checkbox
                                        checked={this.state.showComplete}
                                        onChange={this.handleChange(
                                            'showComplete'
                                        )}
                                        value="showComplete"
                                        color="primary"
                                    />
                                }
                                label="Complete"
                            />
                        </FormGroup>
                    </div>
                </Grid>
                <div>{this.renderEmployees()}</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employees,
        employeeID: state.employeeID,
        filterState: state.filterState,
    };
};

EmployeeList = connect(
    mapStateToProps,
    {
        fetchEmployees,
        deleteEmployee,
        getHoldState,
        getCompleteState,
        getProgressState,
        getRoadblockState,
    }
)(EmployeeList);

export default withStyles(styles)(EmployeeList);
