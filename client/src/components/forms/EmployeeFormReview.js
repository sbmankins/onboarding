import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import employeeFormFields from './employeeFormFields';
import _ from 'lodash';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

class EmployeeFormReview extends Component {
    state = { editing: false, employeeID: '' };

    componentDidMount() {
        if (this.props.history.location.state.editing !== undefined) {
            this.setState({
                editing: this.props.location.state.editing,
            });
        } else {
            this.setState({ editing: false });
        }
        if (this.props.history.location.state.employeeID !== undefined) {
            this.setState({
                employeeID: this.props.location.state.employeeID,
            });
        } else {
            this.setState({ editing: false });
        }
    }
    renderButton() {
        const {
            formValues,
            history,
            submitEmployee,
            editEmployee,
            location,
        } = this.props;
        if (this.state.editing === true) {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    style={{
                        margin: '30px 20px 10px 10px',
                        width: '100px',
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
            return (
                <div key={name} style={{ marginBottom: '10px' }}>
                    <Typography style={{ fontWeight: 'bold' }}>
                        {label}
                    </Typography>
                    <div>
                        <Typography variant="body1">
                            {formValues[name]}
                        </Typography>
                    </div>
                </div>
            );
        });
    }

    render() {
        const { onCancel, history } = this.props;

        return (
            <Paper
                style={{
                    width: '50%',
                    margin: '0 auto',
                    padding: '10px',
                    background: '#edeeef',
                }}
                elevation={1}
            >
                <Paper
                    style={{
                        background: '#dbe2ef',
                        padding: '20px',
                        marginBottom: '20px',
                    }}
                >
                    <Typography
                        style={{ textAlign: 'center', color: '#626f78' }}
                        variant="title"
                    >
                        Please confirm entries
                    </Typography>
                </Paper>
                <div style={{ margin: '20px 20px' }}>
                    {this.reviewFields()}
                    <div style={{ marginBottom: '10px' }}>
                        <Typography style={{ fontWeight: 'bold' }}>
                            Admin
                        </Typography>
                        <div>
                            <Typography variant="body1">
                                {history.location.state.adminName}
                            </Typography>
                        </div>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <Typography style={{ fontWeight: 'bold' }}>
                            Manager
                        </Typography>
                        <div>
                            <Typography variant="body1">
                                {history.location.state.managerName}
                            </Typography>
                        </div>
                    </div>
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

                    {this.renderButton()}
                </div>
            </Paper>
        );
    }
}

function mapStateToProps(state) {
    return { formValues: state.form.employeeForm.values };
}
export default connect(
    mapStateToProps,
    actions
)(withRouter(EmployeeFormReview));
