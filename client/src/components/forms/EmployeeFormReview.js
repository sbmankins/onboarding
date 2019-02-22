import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import employeeFormFields from './employeeFormFields';
import employeeFormFields2 from './employeeFormFields2';
import _ from 'lodash';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

class EmployeeFormReview extends Component {
    state = {
        // editing: false,
        statusOptions: [],
        statusName: '',
        managerOptions: [],
        managerName: '',
        adminOptions: [],
        adminName: '',
    };

    componentDidMount() {
        axios
            .get('/api/admins')
            .then(response => {
                this.setState(
                    {
                        adminOptions: response.data,
                    },
                    () => {
                        const adminName = this.state.adminOptions.find(
                            o => o._id === this.props.formValues._admin
                        ).name;
                        this.setState({ adminName: adminName });
                    }
                );
            })
            .catch(error => console.log(error.response));

        axios
            .get('/api/managers')
            .then(response => {
                this.setState(
                    {
                        managerOptions: response.data,
                    },
                    () => {
                        const managerName = this.state.managerOptions.find(
                            o => o._id === this.props.formValues._manager
                        ).name;
                        this.setState({ managerName: managerName });
                    }
                );
            })
            .catch(error => console.log(error.response));

        axios
            .get('/api/statuses')
            .then(response => {
                this.setState(
                    {
                        statusOptions: response.data,
                    },
                    () => {
                        const statusName = this.state.statusOptions.find(
                            o => o._id === this.props.formValues._status
                        ).name;
                        this.setState({ statusName: statusName });
                    }
                );
            })
            .catch(error => console.log(error.response));
    }
    renderButton() {
        const {
            formValues,
            history,
            submitEmployee,
            editEmployee,
            location,
        } = this.props;
        if (
            this.props.history.location.state.editing !== undefined &&
            this.props.history.location.state.editing === true
        ) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        margin: '30px 20px 10px 10px',
                        width: '100px',
                        borderRadius: '20px',
                    }}
                    onClick={() => {
                        editEmployee(
                            location.state.employeeID,
                            formValues,
                            history
                        );
                    }}
                >
                    Submit
                </Button>
            );
        } else {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        margin: '30px 20px 10px 10px',
                        width: '100px',
                        borderRadius: '20px',
                    }}
                    onClick={() => submitEmployee(formValues, history)}
                >
                    Submit
                </Button>
            );
        }
    }

    reviewFields() {
        const { formValues } = this.props;
        return _.map(employeeFormFields, ({ name, label }) => {
            if (name !== 'dateStart') {
                return (
                    <Grid item key={name}>
                        <div style={{ marginBottom: '10px' }}>
                            <Typography style={{ fontWeight: 'bold' }}>
                                {label}
                            </Typography>
                            <div>
                                <Typography variant="body1">
                                    {formValues[name]}
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                );
            }
        });
    }
    reviewFields2() {
        const { formValues } = this.props;
        return _.map(employeeFormFields2, ({ name, label }) => {
            if (name !== 'dateStart') {
                return (
                    <Grid item key={name}>
                        <div style={{ marginBottom: '10px' }}>
                            <Typography style={{ fontWeight: 'bold' }}>
                                {label}
                            </Typography>
                            <div>
                                <Typography variant="body1">
                                    {formValues[name]}
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                );
            }
        });
    }
    render() {
        const { formValues } = this.props;
        const { onCancel } = this.props;

        return (
            <Paper
                style={{
                    width: '50%',
                    margin: '0 auto',
                    padding: '10px',
                    background: '#edeeef',
                    flexGrow: 1,
                    borderRadius: '20px',
                }}
                elevation={1}
            >
                <Paper
                    style={{
                        background: '#dbe2ef',
                        padding: '20px',
                        marginBottom: '20px',
                        borderRadius: '20px',
                    }}
                    elevation={1}
                >
                    <Typography
                        style={{ textAlign: 'center', color: '#626f78' }}
                        variant="title"
                    >
                        Please confirm entries
                    </Typography>
                </Paper>
                <Grid container direction="row" justify="space-between">
                    <div style={{ margin: '20px 20px' }}>
                        {this.reviewFields()}
                        {this.reviewFields2()}
                        <Grid item>
                            <div style={{ marginBottom: '10px' }}>
                                <Typography style={{ fontWeight: 'bold' }}>
                                    Start Date
                                </Typography>
                                <div>
                                    <Typography variant="body1">
                                        {new Date(
                                            formValues.dateStart
                                        ).toLocaleDateString('en-US', {
                                            timeZone: 'UTC',
                                        })}
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <div style={{ marginBottom: '10px' }}>
                                <Typography style={{ fontWeight: 'bold' }}>
                                    Admin
                                </Typography>
                                <div>
                                    <Typography variant="body1">
                                        {this.state.adminName}
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <div style={{ marginBottom: '10px' }}>
                                <Typography style={{ fontWeight: 'bold' }}>
                                    Manager
                                </Typography>
                                <div>
                                    <Typography variant="body1">
                                        {this.state.managerName}
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <div style={{ marginBottom: '10px' }}>
                                <Typography style={{ fontWeight: 'bold' }}>
                                    Status
                                </Typography>
                                <div>
                                    <Typography variant="body1">
                                        {this.state.statusName}
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{
                                margin: '30px 20px 10px 10px',
                                width: '100px',
                                borderRadius: '20px',
                            }}
                            onClick={onCancel}
                        >
                            Back
                        </Button>

                        {this.renderButton()}
                    </div>
                </Grid>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    return {
        formValues: state.form.employeeForm.values,
        adminName: state.adminName,
        employeeID: state.employeeID,
        editing: state.editing,
    };
}
export default connect(
    mapStateToProps,
    actions
)(withRouter(EmployeeFormReview));
