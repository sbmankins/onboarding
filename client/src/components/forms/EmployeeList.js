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
});

const Normaltext = {
    color: 'black',
};
const Warning = {
    backgroundColor: '#faf096',
    margin: '20px',
};

const Dangertext = {
    color: 'white',
};

const Danger = {
    backgroundColor: '#c82121',
    margin: '20px',
};

const Good = {
    backgroundColor: '#acdeaa',
    margin: '20px',
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
        this.setState({ employeeID: id, toDashboard: true, editing: true });
    };

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
                                    style={{ margin: '5px 0 5px 0' }}
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
                                        style={{
                                            margin: '5px 0 5px 0',
                                        }}
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
                                            borderRadius: '10px',
                                        }}
                                        onClick={(e, key) =>
                                            this.handleEditClick(e, id)
                                        }
                                    >
                                        <EditIcon
                                            style={{
                                                color: 'white',
                                                fontSize: '1.6rem',
                                            }}
                                            className={classes.iconRight}
                                        />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Delete" aria-label="Delete">
                                    <Button
                                        style={{ borderRadius: '10px' }}
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
                                            style={{
                                                color: 'white',
                                                fontSize: '1.3rem',
                                            }}
                                            className={classes.iconRight}
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
    };
};

EmployeeList = connect(
    mapStateToProps,
    { fetchEmployees, deleteEmployee }
)(EmployeeList);

export default withStyles(styles)(EmployeeList);
