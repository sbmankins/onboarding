import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import employeeFormFields from './employeeFormFields';
import SearchSelect from './SearchSelect';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import employeeFormFieldValid from './employeeFormFieldValid';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
        marginBottom: '20px',
        borderRadius: '20px',
        margin: '0 auto',
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

class EmployeeForm extends Component {
    state = {
        vendorOptions: [],

        typeOptions: [],
        hireStatusOptions: [],
        // teamName:[],
        //admin: '',
        // adminName: '',
        // managerName: '',

        employeeID: '',

        // statusName: '',
        editing: '',
    };

    componentDidMount() {
        this.populateDropdown();

        if (
            this.props.location.state !== undefined &&
            this.props.location.state.employee !== undefined
        ) {
            this.setState({
                employeeID: this.props.location.state.employee,
            });
        }

        if (
            this.props._reduxForm.history.location.state !== undefined &&
            this.props._reduxForm.history.location.state.editing !== undefined
        ) {
            this.setState({
                editing: this.props._reduxForm.history.location.state.editing,
            });
        }
    }

    async populateDropdown() {
        const result = await axios.get('/api/form1selects');
        await console.log(result);

        await this.setState({
            vendorOptions: result.data.vendors,
            typeOptions: result.data.types,
            hireStatusOptions: result.data.hirestatuses,
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

    renderFields() {
        return _.map(employeeFormFields, ({ label, name, component, type }) => {
            return (
                <Field
                    key={name}
                    component={component}
                    type={type}
                    label={label}
                    name={name}
                />
            );
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.outerContainer} elevation={1}>
                <Paper className={classes.headingContainer} elevation={1}>
                    <Typography className={classes.titleText} variant="title">
                        Employee Detail
                    </Typography>
                </Paper>
                <Grid container justify="center">
                    <form
                        onSubmit={this.props.handleSubmit(
                            this.props.handleSubmit(this.props.onEmployeeSubmit)
                        )}
                    >
                        <Paper className={classes.formContainer}>
                            <Grid container spacing={8}>
                                {this.renderFields()}
                                <Grid item>
                                    <FormGroup style={{ margin: '10px ' }}>
                                        <FormLabel>
                                            <Typography variant="body1">
                                                Vendor
                                            </Typography>
                                        </FormLabel>

                                        <Field
                                            name="_vendor"
                                            simpleValue={false}
                                            component={SearchSelect}
                                            options={this.state.vendorOptions.map(
                                                ({ name, _id }) => {
                                                    return {
                                                        label: name,
                                                        value: _id,
                                                    };
                                                }
                                            )}
                                            clearable={true}
                                            placeholder="Select a vendor"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup style={{ margin: '10px ' }}>
                                        <FormLabel>
                                            <Typography variant="body1">
                                                Hire Type
                                            </Typography>
                                        </FormLabel>

                                        <Field
                                            name="_type"
                                            simpleValue={false}
                                            component={SearchSelect}
                                            options={this.state.typeOptions.map(
                                                ({ name, _id }) => {
                                                    return {
                                                        label: name,
                                                        value: _id,
                                                    };
                                                }
                                            )}
                                            clearable={true}
                                            placeholder="Select a hire type"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item>
                                    <FormGroup style={{ margin: '10px ' }}>
                                        <FormLabel>
                                            <Typography variant="body1">
                                                Hire Status
                                            </Typography>
                                        </FormLabel>

                                        <Field
                                            name="_hirestatus"
                                            simpleValue={false}
                                            component={SearchSelect}
                                            options={this.state.hireStatusOptions.map(
                                                ({ name, _id }) => {
                                                    return {
                                                        label: name,
                                                        value: _id,
                                                    };
                                                }
                                            )}
                                            clearable={true}
                                            placeholder="Select a hire type"
                                        />
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </Paper>

                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.formButton}
                        >
                            <Link to="/" className={classes.buttonLink}>
                                Cancel
                            </Link>
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.formButton}
                            type="submit"
                            onClick={e => this.handleSubmit(e)}
                        >
                            Next
                        </Button>
                    </form>
                </Grid>
            </Paper>
        );
    }
}

function validate(values) {
    const errors = {};

    _.each(employeeFormFieldValid, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    return errors;
}

EmployeeForm = reduxForm({
    validate,
    form: 'employeeForm',
    destroyOnUnmount: false,
    enableReinitialize: true,
    forceUnregisterOnUnmount: true,
    //keepDirtyOnReinitialize: true,
})(EmployeeForm);

EmployeeForm = withRouter(EmployeeForm);

export default withStyles(styles)(EmployeeForm);
