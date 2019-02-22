import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import employeeFormFields2 from './employeeFormFields2';
import SearchSelect from './SearchSelect';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import employeeFormFieldValid from './employeeFormFieldValid';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

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
    },

    formContainer: {
        width: '90%',
        margin: '0px 20px',
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

class EmployeeForm2 extends Component {
    state = {
        // adminOptions: [],
        // admin: '',
        // adminName: '',
        // managerName: '',
        // managerOptions: [],
        employeeID: '',
        // statusOptions: [],
        // statusName: '',
        editing: '',
    };
    componentDidMount() {
        if (this.props.location.state !== undefined) {
            this.setState({ employeeID: this.props.location.state.employeeID });
        }

        if (this.props._reduxForm.history.location.state !== undefined) {
            this.setState({
                editing: this.props._reduxForm.history.location.state.editing,
            });
        }
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
        return _.map(
            employeeFormFields2,
            ({ label, name, component, type }) => {
                return (
                    <Field
                        key={name}
                        component={component}
                        type={type}
                        label={label}
                        name={name}
                    />
                );
            }
        );
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
                <form
                    onSubmit={this.props.handleSubmit(
                        this.props.handleSubmit(this.props.onEmployeeSubmit)
                    )}
                >
                    <Grid
                        container
                        spacing={16}
                        direction="row"
                        justify="center"
                    >
                        <Paper className={classes.formContainer}>
                            Hello from page 2
                            <Grid container>{this.renderFields()}</Grid>
                        </Paper>
                    </Grid>
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
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{
                            margin: '30px 20px 10px 10px',
                            width: '100px',
                        }}
                        onClick={onCancel}
                    >
                        Back
                    </Button>
                </form>
            </Paper>
        );
    }
    //  }
    //
    // function validate(values) {
    //     const errors = {};
    //
    //     _.each(employeeFormFieldValid, ({ name }) => {
    //         if (!values[name]) {
    //             errors[name] = 'You must provide a value';
    //         }
    //    });
    //
    //     return errors;
}

EmployeeForm2 = reduxForm({
    //  validate,
    form: 'employeeForm',
    destroyOnUnmount: false,
    enableReinitialize: true,
    forceUnregisterOnUnmount: true,
    //keepDirtyOnReinitialize: true,
})(EmployeeForm2);

EmployeeForm2 = withRouter(EmployeeForm2);

export default withStyles(styles)(EmployeeForm2);
