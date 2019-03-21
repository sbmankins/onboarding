import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import validate from './validate';
import DateField from './DateField';
import employeeFormFields from './employeeFormFields';
import SearchSelect from './SearchSelect';

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
        margin: '10px',
    },
});

class EmployeeForm extends Component {
    state = {
        statusOptions: [],
        employeeID: '',
        editing: '',
        ticket: false,
    };

    componentDidMount() {
        if (this.props.history.location.state === undefined) {
            this.populateDropdown();
        } else if (this.props.history.location.state.ticket === false) {
            this.populateDropdown();
        }

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

        await this.setState({
            statusOptions: result.data.statuses,
        });
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
                <Grid container justify="space-around" spacing={24}>
                    <form
                        onSubmit={this.props.handleSubmit(
                            this.props.handleSubmit(this.props.onEmployeeSubmit)
                        )}
                    >
                        <Paper className={classes.formContainer}>
                            <Grid container spacing={24} justify="flex-start">
                                <Grid
                                    container
                                    style={{ margin: '20px 0 20px 20px' }}
                                >
                                    <Grid item xs={12}>
                                        <Typography variant="title">
                                            Basic Information
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {this.renderFields()}
                                <DateField
                                    name={'dateStart'}
                                    placeholder={'Start Date'}
                                    label={'Start Date'}
                                    required={true}
                                />
                                <Grid item>
                                    <FormGroup className={classes.formMargin}>
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
