import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import employeeFormFields from './employeeFormFields';
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
        hireStatusOptions: [],
        hireStatusName: '',
        typeOptions: [],
        typeName: '',
        managerOptions: [],
        managerName: '',
        vendorOptions: [],
        vendorName: '',
        adminOptions: [],
        adminName: '',
        teamOptions: [],
        teamName: '',
        roleOptions: [],
        roleName: '',
        regionOptions: [],
        regionName: '',
    };

    componentDidMount() {
        this.populateOptions();
        console.log(this.props);
    }

    async populateOptions() {
        const result = await axios.get('/api/form1selects');
        await console.log(result);

        await this.setState(
            {
                adminOptions: result.data.admins,
                managerOptions: result.data.managers,
                statusOptions: result.data.statuses,
                teamOptions: result.data.teams,
                roleOptions: result.data.roles,
                vendorOptions: result.data.vendors,
                typeOptions: result.data.types,
                hireStatusOptions: result.data.hirestatuses,
                regionOptions: result.data.regions,
            },
            () => {
                const adminName = this.state.adminOptions.find(
                    o => o._id === this.props.formValues._admin
                ).name;
                this.setState({ adminName: adminName });

                const teamName = this.state.teamOptions.find(
                    o => o._id === this.props.formValues._team
                ).name;
                this.setState({ teamName: teamName });

                const managerName = this.state.managerOptions.find(
                    o => o._id === this.props.formValues._manager
                ).name;
                this.setState({ managerName: managerName });

                const statusName = this.state.statusOptions.find(
                    o => o._id === this.props.formValues._status
                ).name;
                this.setState({ statusName: statusName });

                const roleName = this.state.roleOptions.find(
                    o => o._id === this.props.formValues._role
                ).name;
                this.setState({ roleName: roleName });

                const typeName = this.state.typeOptions.find(
                    o => o._id === this.props.formValues._type
                ).name;
                this.setState({ typeName: typeName });

                const hireStatusName = this.state.hireStatusOptions.find(
                    o => o._id === this.props.formValues._hirestatus
                ).name;
                this.setState({ hireStatusName: hireStatusName });

                const regionName = this.state.regionOptions.find(
                    o => o._id === this.props.formValues._region
                ).name;
                this.setState({ regionName: regionName });

                if (this.props.formValues._vendor !== undefined) {
                    const vendorName = this.state.vendorOptions.find(
                        o => o._id === this.props.formValues._vendor
                    ).name;
                    this.setState({ vendorName: vendorName });
                } else {
                    this.setState({ vendorName: 'N/A' });
                }
            }
        );
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
                                    Vendor
                                </Typography>
                                <div>
                                    <Typography variant="body1">
                                        {this.state.vendorName}
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <div style={{ marginBottom: '10px' }}>
                                <Typography style={{ fontWeight: 'bold' }}>
                                    Hire Type
                                </Typography>
                                <div>
                                    <Typography variant="body1">
                                        {this.state.typeName}
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <div style={{ marginBottom: '10px' }}>
                                <Typography style={{ fontWeight: 'bold' }}>
                                    Hire Status
                                </Typography>
                                <div>
                                    <Typography variant="body1">
                                        {this.state.hireStatusName}
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <div style={{ marginBottom: '10px' }}>
                                <Typography style={{ fontWeight: 'bold' }}>
                                    Role
                                </Typography>
                                <div>
                                    <Typography variant="body1">
                                        {this.state.roleName}
                                    </Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item>
                            <div style={{ marginBottom: '10px' }}>
                                <Typography style={{ fontWeight: 'bold' }}>
                                    Region
                                </Typography>
                                <div>
                                    <Typography variant="body1">
                                        {this.state.regionName}
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
                                    Team
                                </Typography>
                                <div>
                                    <Typography variant="body1">
                                        {this.state.teamName}
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
