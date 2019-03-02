import { reduxForm } from 'redux-form';
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import EmployeeForm2 from './EmployeeForm2';
import TicketForm from './TicketForm';
import EmployeeForm from './EmployeeForm';
import EmployeeFormReview from './EmployeeFormReview';

class EmployeeNew extends Component {
    state = {
        showFormReview: false,
        employee: {},
        editing: false,
        ticket: false,
        initData: {},
        dropDowns: [],
        page: 1,
    };

    componentDidMount() {
        if (
            this.props.history.location.state !== undefined &&
            this.props.history.location.state.ticket !== undefined
        ) {
            this.setState({ ticket: this.props.history.location.state.ticket });
        }
        if (
            this.props.history.location.state !== undefined &&
            this.props.history.location.state.employee !== undefined
        ) {
            const id = this.props.history.location.state.employee;
            axios
                .get(`/api/${id}`)
                .then(response => {
                    this.setState(
                        {
                            employee: response.data,
                        },
                        () => {
                            this.handleInitialize();
                        }
                    );
                })
                .catch(error => console.log(error.response));
        }
    }

    //Get initial data to populate form if editing
    handleInitialize() {
        if (this.state.employee) {
            this.setState({ editing: true });

            const initData = {
                firstName: this.state.employee
                    ? this.state.employee.firstName
                    : undefined,
                lastName: this.state.employee
                    ? this.state.employee.lastName
                    : undefined,
                dateStart: this.state.employee
                    ? this.state.employee.dateStart
                    : undefined,
                buddy: this.state.employee
                    ? this.state.employee.buddy
                    : undefined,
                seat: this.state.employee
                    ? this.state.employee.seat
                    : undefined,
                cwID: this.state.employee
                    ? this.state.employee.cwID
                    : undefined,
                comments: this.state.employee
                    ? this.state.employee.comments
                    : undefined,
                neID: this.state.employee
                    ? this.state.employee.neID
                    : undefined,
                newHireReHire: this.state.employee
                    ? this.state.employee.newHireReHire
                    : undefined,
                newHireReHireDate: this.state.employee
                    ? this.state.employee.newHireReHireDate
                    : undefined,
                macTicket: this.state.employee
                    ? this.state.employee.macTicket
                    : undefined,
                macTicketDate: this.state.employee
                    ? this.state.employee.macTicketDate
                    : undefined,
                buddyMail: this.state.employee
                    ? this.state.employee.buddyMail
                    : undefined,
                welcomeMail: this.state.employee
                    ? this.state.employee.welcomeMail
                    : undefined,
                laptopDelivered: this.state.employee
                    ? this.state.employee.laptopDelivered
                    : undefined,
                dlPdOrg: this.state.employee
                    ? this.state.employee.dlPdOrg
                    : undefined,
                _manager: this.state.employee._manager
                    ? this.state.employee._manager._id
                    : undefined,
                _admin: this.state.employee._admin
                    ? this.state.employee._admin._id
                    : undefined,
                _status: this.state.employee._status
                    ? this.state.employee._status._id
                    : undefined,
                _team: this.state.employee._team
                    ? this.state.employee._team._id
                    : undefined,
                _role: this.state.employee._role
                    ? this.state.employee._role._id
                    : undefined,
                _vendor: this.state.employee._vendor
                    ? this.state.employee._vendor._id
                    : undefined,
                _type: this.state.employee._type
                    ? this.state.employee._type._id
                    : undefined,
                _hirestatus: this.state.employee._hirestatus
                    ? this.state.employee._hirestatus._id
                    : undefined,
                _region: this.state.employee._region
                    ? this.state.employee._region._id
                    : undefined,
                _campus: this.state.employee._campus
                    ? this.state.employee._campus._id
                    : undefined,
                _leader: this.state.employee._leader
                    ? this.state.employee._leader._id
                    : undefined,
                _platform: this.state.employee._platform
                    ? this.state.employee._platform._id
                    : undefined,
                _computer: this.state.employee._computer
                    ? this.state.employee._computer._id
                    : undefined,
            };

            this.setState({ initData: initData });

            this.props.initialize(initData);
        } else {
            this.setState({ editing: false });
        }
    }

    renderContent() {
        if (this.state.showFormReview && this.state.page === 3) {
            //Show Revew Form
            return (
                <EmployeeFormReview
                    onCancel={() =>
                        this.setState({
                            showFormReview: false,
                            page: this.state.page - 1,
                        })
                    }
                />
            );
        } else if (this.state.page === 2 && this.state.ticket === false) {
            return (
                //Show employee form pg 2
                <EmployeeForm2
                    onEmployeeSubmit={() =>
                        this.setState({
                            showFormReview: true,
                            page: this.state.page + 1,
                        })
                    }
                    onCancel={() =>
                        this.setState({
                            showFormReview: false,
                            page: this.state.page - 1,
                        })
                    }
                />
            );
            //show employee form pg 1
        } else if (this.state.page === 1 && this.state.ticket === false) {
            return (
                <EmployeeForm
                    onEmployeeSubmit={() =>
                        this.setState({
                            showFormReview: false,
                            page: this.state.page + 1,
                        })
                    }
                    onInitialValues={() => {
                        this.handleInitialize();
                    }}
                />
            );
            //show ticket form
        } else if (this.state.ticket === true) {
            return (
                <TicketForm
                    onTicketSubmit={() =>
                        this.setState({
                            showFormReview: true,
                            page: 3,
                        })
                    }
                    onInitialValues={() => {
                        this.handleInitialize();
                    }}
                    onCancel={() =>
                        this.setState({
                            showFormReview: false,
                        })
                    }
                />
            );
        }
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

EmployeeNew = reduxForm({
    form: 'employeeForm',
})(EmployeeNew);
export default connect()(EmployeeNew);
