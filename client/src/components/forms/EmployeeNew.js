import { reduxForm } from 'redux-form';
import React, { Component } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeFormReview from './EmployeeFormReview';
import axios from 'axios';
import { connect } from 'react-redux';

class EmployeeNew extends Component {
    state = {
        showFormReview: false,
        employee: {},
        editing: false,
        initData: {},
    };

    componentDidMount() {
        if (this.props.history.location.state !== undefined) {
            const id = this.props.history.location.state.employee;
            axios
                .get(`/api/${id}`)
                .then(response => {
                    this.setState(
                        {
                            employee: response.data,
                        },
                        () => {
                            console.log(response.data);
                            this.handleInitialize();
                        }
                    );
                })
                .catch(error => console.log(error.response));
        }
    }

    handleInitialize() {
        if (this.state.employee) {
            this.setState({ editing: true });
            console.log(this.state.employee);
            const initData = {
                firstName: this.state.employee.firstName,
                lastName: this.state.employee.lastName,
                _manager: this.state.employee._manager._id,
                _admin: this.state.employee._admin._id,
                _status: this.state.employee._status._id,
                dateStart: this.state.employee.dateStart,
                buddy: this.state.employee.buddy,
            };

            this.setState({ initData: initData });

            this.props.initialize(initData);
        } else {
            this.setState({ editing: false });
        }
    }

    state = { showFormReview: false };
    renderContent() {
        if (this.state.showFormReview) {
            return (
                <EmployeeFormReview
                    onCancel={() => this.setState({ showFormReview: false })}
                />
            );
        }
        return (
            <EmployeeForm
                // adminName={this.state.adminName}

                onEmployeeSubmit={() => this.setState({ showFormReview: true })}
                onInitialValues={() => this.handleInitialize()}
            />
        );
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

EmployeeNew = reduxForm({
    form: 'employeeForm',
})(EmployeeNew);
export default connect()(EmployeeNew);
