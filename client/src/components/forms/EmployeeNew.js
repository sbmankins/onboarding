import { reduxForm } from 'redux-form';
import React, { Component } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeFormReview from './EmployeeFormReview';
import axios from 'axios';
import { connect } from 'react-redux';

class EmployeeNew extends Component {
    state = { showFormReview: false, employee: {}, editing: false };

    componentDidMount() {
        console.log(this.props);
        console.log(this.state);
        if (this.props.history.location.state !== undefined) {
            const id = this.props.history.location.state.employee;
            axios
                .get(`/api/${id}`)
                .then(response => {
                    this.setState(
                        {
                            employee: response.data,
                        },
                        () => this.handleInitialize()
                    );
                })
                .catch(error => console.log(error.response));
        }
    }

    handleInitialize() {
        if (this.state.employee) {
            this.setState({ editing: true });

            const initData = {
                firstName: this.state.employee.firstName,
                lastName: this.state.employee.lastName,
                manager: this.state.employee.manager,
                _admin: this.state.employee._admin,
                dateStart: this.state.employee.dateStart,
                buddy: this.state.employee.buddy,
            };

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
