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
    state = { editing: false, id: '' };

    componentDidMount() {
        if (this.props.location.state.editing !== undefined) {
            this.setState({ editing: this.props.location.state.editing });
        } else {
            this.setState({ editing: false });
        }

        if (this.props.location.state.employee !== undefined) {
            this.setState({ employee: this.props.location.state.employee });
        } else {
            this.setState({ employee: '' });
        }
    }
    renderButton() {
        const id = this.state.employee;
        const {
            formValues,
            history,
            submitEmployee,
            editEmployee,
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
                        editEmployee(id, formValues, history);
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
