//import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SearchSelect from './SearchSelect';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import validate from './validate';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MultiLineFormField from './MultiLineFormField';

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

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },

    buttonLink: {
        textDecoration: 'none',
        color: 'white',
        display: 'block',
        height: '100%',
    },

    formButton: {
        margin: '30px 30px 0 10px',
        width: '100px',
        borderRadius: '20px',
    },
});

class EmployeeForm2 extends Component {
    state = {
        adminOptions: [],
        teamOptions: [],
        roleOptions: [],
        statusOptions: [],
        managerOptions: [],
        regionOptions: [],
        campusOptions: [],
        leaderOptions: [],
        platformOptions: [],
        employeeID: '',
        editing: '',
    };

    componentDidMount() {
        this.populateDropdown();

        if (this.props.location.state !== undefined) {
            this.setState({ employeeID: this.props.location.state.employeeID });
        }

        if (this.props._reduxForm.history.location.state !== undefined) {
            this.setState({
                editing: this.props._reduxForm.history.location.state.editing,
            });
        }
    }

    async populateDropdown() {
        const result = await axios.get('/api/form1selects');
        await console.log(result);

        await this.setState({
            adminOptions: result.data.admins,
            managerOptions: result.data.managers,
            statusOptions: result.data.statuses,
            teamOptions: result.data.teams,
            roleOptions: result.data.roles,
            regionOptions: result.data.regions,
            campusOptions: result.data.campuses,
            leaderOptions: result.data.leaders,
            platformOptions: result.data.platforms,
        });
    }

    handleSubmit(event) {
        this.props.history.push({
            pathname: '/new',
            state: {
                editing: this.state.editing,
                employeeID: this.state.employeeID,
            },
        });
    }

    render() {
        const { classes, onCancel } = this.props;
        return (
            <Paper className={classes.outerContainer} elevation={1}>
                <Paper className={classes.headingContainer} elevation={1}>
                    <Typography className={classes.titleText} variant="title">
                        Employee Detail
                    </Typography>
                </Paper>
                <Grid container justify="space-around" spacing={24}>
                    <form
                        onSubmit={this.props.handleSubmit(
                            this.props.handleSubmit(this.props.onEmployeeSubmit)
                        )}
                    >
                        <Paper className={classes.formContainer}>
                            <Grid container>
                                <div />

                                <Grid item>
                                    <FormGroup style={{ margin: '10px ' }}>
                                        <FormLabel>
                                            <Typography variant="body1">
                                                Role
                                            </Typography>
                                        </FormLabel>

                                        <Field
                                            name="_role"
                                            simpleValue={false}
                                            component={SearchSelect}
                                            options={this.state.roleOptions.map(
                                                ({ name, _id }) => {
                                                    return {
                                                        label: name,
                                                        value: _id,
                                                    };
                                                }
                                            )}
                                            clearable={true}
                                            placeholder="Select a role"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup style={{ margin: '10px ' }}>
                                        <FormLabel>
                                            <Typography variant="body1">
                                                Leader/Contributor
                                            </Typography>
                                        </FormLabel>

                                        <Field
                                            name="_leader"
                                            simpleValue={false}
                                            component={SearchSelect}
                                            options={this.state.leaderOptions.map(
                                                ({ name, _id }) => {
                                                    return {
                                                        label: name,
                                                        value: _id,
                                                    };
                                                }
                                            )}
                                            clearable={true}
                                            placeholder="Select a role"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup style={{ margin: '10px ' }}>
                                        <FormLabel>
                                            <Typography variant="body1">
                                                Platform
                                            </Typography>
                                        </FormLabel>

                                        <Field
                                            name="_platform"
                                            simpleValue={false}
                                            component={SearchSelect}
                                            options={this.state.platformOptions.map(
                                                ({ name, _id }) => {
                                                    return {
                                                        label: name,
                                                        value: _id,
                                                    };
                                                }
                                            )}
                                            clearable={true}
                                            placeholder="Select a platform"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup style={{ margin: '10px ' }}>
                                        <FormLabel>
                                            <Typography variant="body1">
                                                Region
                                            </Typography>
                                        </FormLabel>

                                        <Field
                                            name="_region"
                                            simpleValue={false}
                                            component={SearchSelect}
                                            options={this.state.regionOptions.map(
                                                ({ name, _id }) => {
                                                    return {
                                                        label: name,
                                                        value: _id,
                                                    };
                                                }
                                            )}
                                            clearable={true}
                                            placeholder="Select a region"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup style={{ margin: '10px ' }}>
                                        <FormLabel>
                                            <Typography variant="body1">
                                                Campus
                                            </Typography>
                                        </FormLabel>

                                        <Field
                                            name="_campus"
                                            simpleValue={false}
                                            component={SearchSelect}
                                            options={this.state.campusOptions.map(
                                                ({ name, _id }) => {
                                                    return {
                                                        label: name,
                                                        value: _id,
                                                    };
                                                }
                                            )}
                                            clearable={true}
                                            placeholder="Select a campus"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup style={{ margin: '10px' }}>
                                        <FormLabel>
                                            <Typography variant="body1">
                                                Admin
                                            </Typography>
                                        </FormLabel>

                                        <Field
                                            name="_admin"
                                            simpleValue={false}
                                            component={SearchSelect}
                                            options={this.state.adminOptions.map(
                                                ({ name, _id }) => {
                                                    return {
                                                        label: name,
                                                        value: _id,
                                                    };
                                                }
                                            )}
                                            clearable={true}
                                            placeholder="Select a person"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup style={{ margin: '10px ' }}>
                                        <FormLabel>
                                            <Typography variant="body1">
                                                Manager
                                            </Typography>
                                        </FormLabel>

                                        <Field
                                            name="_manager"
                                            simpleValue={false}
                                            component={SearchSelect}
                                            options={this.state.managerOptions.map(
                                                ({ name, _id }) => {
                                                    return {
                                                        label: name,
                                                        value: _id,
                                                    };
                                                }
                                            )}
                                            clearable={true}
                                            placeholder="Select a person"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup style={{ margin: '10px ' }}>
                                        <FormLabel>
                                            <Typography variant="body1">
                                                Team
                                            </Typography>
                                        </FormLabel>

                                        <Field
                                            name="_team"
                                            simpleValue={false}
                                            component={SearchSelect}
                                            options={this.state.teamOptions.map(
                                                ({ name, _id }) => {
                                                    return {
                                                        label: name,
                                                        value: _id,
                                                    };
                                                }
                                            )}
                                            clearable={true}
                                            placeholder="Select a team"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup style={{ margin: '10px ' }}>
                                        <FormLabel>
                                            <Typography variant="body1">
                                                Status
                                            </Typography>
                                        </FormLabel>

                                        <Field
                                            name="_status"
                                            simpleValue={false}
                                            component={SearchSelect}
                                            options={this.state.statusOptions.map(
                                                ({ name, _id }) => {
                                                    return {
                                                        label: name,
                                                        value: _id,
                                                    };
                                                }
                                            )}
                                            clearable={true}
                                            placeholder="Select a status"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        component={MultiLineFormField}
                                        type="text"
                                        label="Comments"
                                        name="comments"
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                        <Grid
                            container
                            direction="row"
                            spacing={8}
                            justify="flex-start"
                            style={{ margin: '0 0 20px 20px' }}
                        >
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.formButton}
                                >
                                    <Link to="/" className={classes.buttonLink}>
                                        Cancel
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    style={{
                                        backgroundColor: '#ff9a00',
                                        color: 'white',
                                    }}
                                    className={classes.formButton}
                                    onClick={onCancel}
                                >
                                    Back
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.formButton}
                                    type="submit"
                                    onClick={e => this.handleSubmit(e)}
                                >
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Paper>
        );
    }
}

EmployeeForm2 = reduxForm({
    validate,
    form: 'employeeForm',
    destroyOnUnmount: false,
    enableReinitialize: true,
    forceUnregisterOnUnmount: true,
    //keepDirtyOnReinitialize: true,
})(EmployeeForm2);

EmployeeForm2 = withRouter(EmployeeForm2);

export default withStyles(styles)(EmployeeForm2);
