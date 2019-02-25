import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ticketFormFields from './ticketFormFields';
//import SearchSelect from './SearchSelect';
//import FormGroup from '@material-ui/core/FormGroup';
//import FormLabel from '@material-ui/core/FormLabel';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
//import axios from 'axios';
//import validate from './validate';

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
});
class TicketForm extends Component {
    state = {
        // vendorOptions: [],
        // typeOptions: [],
        // hireStatusOptions: [],
        employeeID: '',
        editing: '',
        ticket: '',
    };

    componentDidMount() {
        //this.populateDropdown();
        console.log(this.props);

        if (
            this.props.location.state !== undefined &&
            this.props.location.state.employee !== undefined
        ) {
            this.setState(
                {
                    employeeID: this.props.location.state.employee,
                    ticket: this.props.location.state.ticket,
                },
                () => {
                    console.log(this.state);
                }
            );
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

    //async populateDropdown() {
    // const result = await axios.get('/api/form1selects');
    //
    // await this.setState({
    //     vendorOptions: result.data.vendors,
    //     typeOptions: result.data.types,
    //     hireStatusOptions: result.data.hirestatuses,
    // });
    //  }

    handleSubmit(event) {
        this.props.history.push({
            pathname: '/new',
            state: {
                editing: this.state.editing,
                employeeID: this.state.employeeID,
                ticket: this.state.ticket,
            },
        });
    }

    renderTicketFields() {
        return _.map(ticketFormFields, ({ label, name, component, type }) => {
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
                        Ticket Detail For
                    </Typography>
                </Paper>
                <Grid container justify="space-around" spacing={24}>
                    <form
                        onSubmit={this.props.handleSubmit(
                            this.props.handleSubmit(this.props.onTicketSubmit)
                        )}
                    >
                        <Paper className={classes.formContainer}>
                            <Grid container spacing={24} justify="flex-start">
                                {this.renderTicketFields()}
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

TicketForm = reduxForm({
    //validate,
    form: 'employeeForm',
    destroyOnUnmount: false,
    enableReinitialize: true,
    forceUnregisterOnUnmount: true,
    //keepDirtyOnReinitialize: true,
})(TicketForm);

TicketForm = withRouter(TicketForm);

export default withStyles(styles)(TicketForm);
