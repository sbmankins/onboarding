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
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

import MultiLineFormField from './MultiLineFormField';
import validate from './validate';

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

    formMargin: {
        margin: '10px ',
    },
});

class EmployeeForm2 extends Component {
    state = {
        adminOptions: [],
        teamOptions: [],
        roleOptions: [],
        managerOptions: [],
        regionOptions: [],
        campusOptions: [],
        leaderOptions: [],
        platformOptions: [],
        computerOptions: [],
        employeeID: '',
        editing: '',
        ticket: false,
    };

    componentDidMount() {
        this.populateDropdown();

        if (this.props.location.state ) {
            this.setState({ employeeID: this.props.location.state.employeeID });
        }

        if (this.props._reduxForm.history.location.state ) {
            this.setState({
                editing: this.props._reduxForm.history.location.state.editing,
            });
        }
    }

    async populateDropdown() {
        try {
            const result = await axios.get('/api/form1selects');
            await this.setState({
                adminOptions: result.data.admins,
                managerOptions: result.data.managers,
                teamOptions: result.data.teams,
                roleOptions: result.data.roles,
                regionOptions: result.data.regions,
                campusOptions: result.data.campuses,
                leaderOptions: result.data.leaders,
                platformOptions: result.data.platforms,
                computerOptions: result.data.computers,
            });
        } catch (error) {
            console.error(error);
        }
    }

    handleSubmit(event) {
        this.props.history.push({
            pathname: '/new',
            state: {
                editing: this.state.editing,
                employeeID: this.state.employeeID,
                ticket: false,
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
                                <Grid
                                    container
                                    style={{ margin: '20px 0 20px 10px' }}
                                >
                                    <Grid item xs={12}>
                                        <Typography variant="title">
                                            Job Information
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item>
                                        <FormGroup
                                            className={classes.formMargin}
                                        >
                                            <FormLabel>
                                                <Typography variant="body1">
                                                    Role
                                                </Typography>
                                            </FormLabel>

                                            <Field
                                                name="_role"
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
                                        <FormGroup
                                            className={classes.formMargin}
                                        >
                                            <FormLabel>
                                                <Typography variant="body1">
                                                    Leader/Contributor
                                                </Typography>
                                            </FormLabel>

                                            <Field
                                                name="_leader"
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
                                        <FormGroup
                                            className={classes.formMargin}
                                        >
                                            <FormLabel>
                                                <Typography variant="body1">
                                                    Computer
                                                </Typography>
                                            </FormLabel>

                                            <Field
                                                name="_computer"
                                                component={SearchSelect}
                                                options={this.state.computerOptions.map(
                                                    ({ name, _id }) => {
                                                        return {
                                                            label: name,
                                                            value: _id,
                                                        };
                                                    }
                                                )}
                                                clearable={true}
                                                placeholder="Select a computer"
                                            />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    style={{ margin: '20px 0 20px 10px' }}
                                >
                                    <Grid item xs={12}>
                                        <Typography variant="title">
                                            Location Details
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item>
                                        <FormGroup
                                            className={classes.formMargin}
                                        >
                                            <FormLabel>
                                                <Typography variant="body1">
                                                    Region
                                                </Typography>
                                            </FormLabel>

                                            <Field
                                                name="_region"
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
                                        <FormGroup
                                            className={classes.formMargin}
                                        >
                                            <FormLabel>
                                                <Typography variant="body1">
                                                    Campus
                                                </Typography>
                                            </FormLabel>

                                            <Field
                                                name="_campus"
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
                                </Grid>
                                <Grid
                                    container
                                    style={{ margin: '20px 0 20px 10px' }}
                                >
                                    <Grid item xs={12}>
                                        <Typography variant="title">
                                            Organizational Details
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item>
                                        <FormGroup
                                            className={classes.formMargin}
                                        >
                                            <FormLabel>
                                                <Typography variant="body1">
                                                    Manager
                                                </Typography>
                                            </FormLabel>

                                            <Field
                                                name="_manager"
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
                                        <FormGroup
                                            className={classes.formMargin}
                                        >
                                            <FormLabel>
                                                <Typography variant="body1">
                                                    Platform
                                                </Typography>
                                            </FormLabel>

                                            <Field
                                                name="_platform"
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
                                        <FormGroup
                                            className={classes.formMargin}
                                        >
                                            <FormLabel>
                                                <Typography variant="body1">
                                                    Team
                                                </Typography>
                                            </FormLabel>

                                            <Field
                                                name="_team"
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
                                        <FormGroup
                                            className={classes.formMargin}
                                        >
                                            <FormLabel>
                                                <Typography variant="body1">
                                                    Admin
                                                </Typography>
                                            </FormLabel>

                                            <Field
                                                name="_admin"
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
