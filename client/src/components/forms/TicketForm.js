import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FormField from './FormField';
import DateField from './DateField';

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

    ticketButton: {
        maxWidth: '200px',
        margin: '30px 30px 0 10px',
        borderRadius: '20px',
    },
});
class TicketForm extends Component {
    state = {
        employeeID: '',
        editing: '',
        ticket: true,
        newHireReHire: true,
        macTicket: false,
        confirmations: false,
    };

    componentDidMount() {
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
    //Determine which form to show
    handleTicketClick(event) {
        const id = event.currentTarget.id;
        if (id === 'newHireReHire') {
            this.setState({
                newHireReHire: true,
                macTicket: false,
                confirmations: false,
            });
        } else if (id === 'macTicket') {
            this.setState({
                newHireReHire: false,
                macTicket: true,
                confirmations: false,
            });
        } else if (id === 'confirmations') {
            this.setState({
                newHireReHire: false,
                macTicket: false,
                confirmations: true,
            });
        }
    }
    // Show selected form
    renderTicketContent() {
        const { classes } = this.props;
        if (
            this.state.newHireReHire === true &&
            this.state.macTicket === false &&
            this.state.confirmations === false
        ) {
            return (
                <Paper className={classes.formContainer}>
                    <Grid container spacing={24} justify="flex-start">
                        <Field
                            component={FormField}
                            type={'text'}
                            label={'New Hire/Rehire Ticket'}
                            name={'newHireReHire'}
                        />

                        <DateField
                            name={'newHireReHireDate'}
                            placeholder={'Ticket Date'}
                            label={'New Hire/Rehire Date'}
                            required={true}
                        />
                    </Grid>
                </Paper>
            );
        } else if (
            this.state.newHireReHire === false &&
            this.state.macTicket === true &&
            this.state.confirmations === false
        ) {
            return (
                <Paper className={classes.formContainer}>
                    <Grid container spacing={24} justify="flex-start">
                        <Field
                            component={FormField}
                            type={'text'}
                            label={'MAC Ticket'}
                            name={'macTicket'}
                        />

                        <DateField
                            name={'macTicketDate'}
                            placeholder={'Ticket Date'}
                            label={'MAC Ticket Date'}
                            required={true}
                        />
                    </Grid>
                </Paper>
            );
        } else if (
            this.state.newHireReHire === false &&
            this.state.macTicket === false &&
            this.state.confirmations === true
        ) {
            return (
                <Paper className={classes.formContainer}>
                    <Grid container spacing={24} justify="flex-start">
                        <DateField
                            name={'laptopDelivered'}
                            placeholder={'Laptop Delivery'}
                            label={'Laptop Delivery Date'}
                            required={false}
                        />
                        <DateField
                            name={'buddyMail'}
                            placeholder={'Buddy Mail'}
                            label={'Buddy E-mail Date'}
                            required={false}
                        />
                        <DateField
                            name={'welcomeMail'}
                            placeholder={'Welcome Mail'}
                            label={'Welcome E-mail Date'}
                            required={false}
                        />
                        <DateField
                            name={'dlPdOrg'}
                            placeholder={"DL's/PD Org"}
                            label={"Added DL's/PD Org Date"}
                            required={false}
                        />
                    </Grid>
                </Paper>
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.outerContainer} elevation={1}>
                <Paper className={classes.headingContainer} elevation={1}>
                    <Grid
                        container
                        direction="row"
                        justify="space-evenly"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <Typography
                                className={classes.titleText}
                                variant="title"
                            >
                                Ticket/Confirmations Detail
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-end"
                        >
                            <Grid item>
                                <Button
                                    id="newHireReHire"
                                    onClick={event => {
                                        this.handleTicketClick(event);
                                    }}
                                    variant="contained"
                                    color="primary"
                                    className={classes.ticketButton}
                                >
                                    New Hire/ Rehire
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    id="macTicket"
                                    onClick={event => {
                                        this.handleTicketClick(event);
                                    }}
                                    className={classes.ticketButton}
                                    color="primary"
                                    variant="contained"
                                >
                                    MAC
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    id="confirmations"
                                    onClick={event => {
                                        this.handleTicketClick(event);
                                    }}
                                    color="primary"
                                    className={classes.ticketButton}
                                    variant="contained"
                                >
                                    Confirmations
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Grid container justify="space-around" spacing={24}>
                    <form
                        onSubmit={this.props.handleSubmit(
                            this.props.handleSubmit(this.props.onTicketSubmit)
                        )}
                    >
                        {this.renderTicketContent()}
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
                                    Finished
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
    form: 'employeeForm',
    destroyOnUnmount: false,
    enableReinitialize: true,
    forceUnregisterOnUnmount: true,
    //keepDirtyOnReinitialize: true,
})(TicketForm);

TicketForm = withRouter(TicketForm);

export default withStyles(styles)(TicketForm);
