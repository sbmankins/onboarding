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
import { withStyles } from '@material-ui/core/styles';
import ticketFormFields from './ticketFormFields';

const styles = theme => ({
    outerContainer: {
        width: '80%',
        margin: '0 auto',
        padding: '10px',
        background: '#edeeef',
        flexGrow: 1,
        borderRadius: '20px',
    },

    headingContainer: {
        background: '#dbe2ef',
        padding: '20px',

        borderRadius: '20px',
        margin: '0 auto',
        marginBottom: '40px',
    },

    formContainer: {
        width: '90%',
        margin: '0 auto',
        padding: '10px',
        borderRadius: '20px',
    },

    titleText: {
        textAlign: 'center',
        color: '#626f78',
    },

    formButton: {
        margin: '30px 30px 0 10px',
        width: '100px',
        borderRadius: '20px',
    },
});

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
        campusOptions: [],
        campusName: '',
        leaderOptions: [],
        leaderName: '',
        platformOptions: [],
        platformName: [],
        computerOptions: [],
        computerName: '',
    };

    componentDidMount() {
        this.populateOptions();
        console.log(this.props);
    }

    async populateOptions() {
        const result = await axios.get('/api/form1selects');
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
                campusOptions: result.data.campuses,
                leaderOptions: result.data.leaders,
                platformOptions: result.data.platforms,
                computerOptions: result.data.computers,
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

                const campusName = this.state.campusOptions.find(
                    o => o._id === this.props.formValues._campus
                ).name;
                this.setState({ campusName: campusName });

                const platformName = this.state.platformOptions.find(
                    o => o._id === this.props.formValues._platform
                ).name;
                this.setState({ platformName: platformName });

                const computerName = this.state.computerOptions.find(
                    o => o._id === this.props.formValues._computer
                ).name;
                this.setState({ computerName: computerName });

                if (this.props.formValues._vendor !== undefined) {
                    const vendorName = this.state.vendorOptions.find(
                        o => o._id === this.props.formValues._vendor
                    ).name;
                    this.setState({ vendorName: vendorName });
                } else {
                    this.setState({ vendorName: 'N/A' });
                }
                if (this.props.formValues._leader !== undefined) {
                    const leaderName = this.state.leaderOptions.find(
                        o => o._id === this.props.formValues._leader
                    ).name;
                    this.setState({ leaderName: leaderName });
                } else {
                    this.setState({ leaderName: 'N/A' });
                }
            }
        );
    }

    renderButton() {
        const {
            formValues,
            classes,
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
                    className={classes.formButton}
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
                    className={classes.formButton}
                    onClick={() => submitEmployee(formValues, history)}
                >
                    Submit
                </Button>
            );
        }
    }

    reviewFields() {
        let fields;
        if (
            this.props.history.location.state.ticket === undefined ||
            this.props.history.location.state.ticket === false
        ) {
            fields = employeeFormFields;
        } else if (this.props.history.location.state.ticket === true) {
            fields = ticketFormFields;
        }
        const { formValues } = this.props;
        return _.map(fields, ({ name, label }) => {
            if (name !== 'dateStart') {
                return (
                    <Grid item xs={4} key={name}>
                        <div
                            style={{
                                display: 'inline-block',
                                marginBottom: '20px',
                            }}
                        >
                            <Typography
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
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
        const { classes } = this.props;
        const { formValues } = this.props;
        const { onCancel } = this.props;
        if (
            this.props.history.location.state.ticket === undefined ||
            this.props.history.location.state.ticket === false
        ) {
            return (
                <Paper className={classes.outerContainer} elevation={1}>
                    <Paper className={classes.headingContainer} elevation={1}>
                        <Typography
                            className={classes.titleText}
                            variant="title"
                        >
                            Please confirm entries
                        </Typography>
                    </Paper>

                    <Paper className={classes.formContainer}>
                        <Grid container justify="flex-start" spacing={24}>
                            {this.reviewFields()}

                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
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
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
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
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
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
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
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
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        Computer Name
                                    </Typography>
                                    <div>
                                        <Typography variant="body1">
                                            {this.state.computerName}
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
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
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        Leader/Contributor
                                    </Typography>
                                    <div>
                                        <Typography variant="body1">
                                            {this.state.leaderName}
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        Platform
                                    </Typography>
                                    <div>
                                        <Typography variant="body1">
                                            {this.state.platformName}
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
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
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        Campus
                                    </Typography>
                                    <div>
                                        <Typography variant="body1">
                                            {this.state.campusName}
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
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
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
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
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
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
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
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
                            <Grid item xs={4}>
                                <div
                                    style={{
                                        display: 'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        Comments
                                    </Typography>
                                    <div>
                                        <Typography variant="body1">
                                            {formValues.comments}
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.formButton}
                        onClick={onCancel}
                    >
                        Back
                    </Button>

                    {this.renderButton()}
                </Paper>
            );
        } else if (this.props.history.location.state.ticket === true) {
            return (
                <Paper className={classes.outerContainer} elevation={1}>
                    <Paper className={classes.headingContainer} elevation={1}>
                        <Typography
                            className={classes.titleText}
                            variant="title"
                        >
                            Please confirm entries
                        </Typography>
                    </Paper>

                    <Paper className={classes.formContainer}>
                        <Grid container justify="flex-start" spacing={24}>
                            {this.reviewFields()}
                        </Grid>
                    </Paper>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.formButton}
                        onClick={onCancel}
                    >
                        Back
                    </Button>

                    {this.renderButton()}
                </Paper>
            );
        }
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

EmployeeFormReview = connect(
    mapStateToProps,
    actions
)(withRouter(EmployeeFormReview));

export default withStyles(styles)(EmployeeFormReview);
