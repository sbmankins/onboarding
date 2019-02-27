import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../../actions';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { daysBetween } from './daysBetween';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

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
    };

    componentDidMount() {
        this.setState({ employees: this.props.fetchEmployees() });

        this.setState({ editing: false });
    }

    onEmployeeDelete = (event, id) => {
        event.preventDefault();
        this.props.deleteEmployee(id);
        this.setState({ employees: this.props.fetchEmployees() });
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

    renderEmployees() {
        const { classes } = this.props;
        return (
            this.props.employees &&
            this.props.employees.map(employee => {
                const id = employee._id;

                let start = new Date();
                start = employee.dateStart;

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
        return <div>{this.renderEmployees()}</div>;
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employees,
        employee: state.employee,
        employeeID: state.employeeID,
    };
};

EmployeeList = connect(
    mapStateToProps,
    { fetchEmployees, deleteEmployee }
)(EmployeeList);

export default withStyles(styles)(EmployeeList);
