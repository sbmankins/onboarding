import { reduxForm } from 'redux-form';
import React, { Component } from 'react';

import TicketFormReview from './TicketFormReview';
import axios from 'axios';
import { connect } from 'react-redux';
import TicketForm from './TicketForm';

class TicketNew extends Component {
    state = {
        showFormReview: false,
        employee: {},
        editing: false,
        initData: {},
        dropDowns: [],
        page: 1,
    };

    componentDidMount() {
        console.log(this.props);
        //     if (
        //         this.props.history.location.state !== undefined &&
        //         this.props.history.location.state.employee !== undefined
        //     ) {
        //         const id = this.props.history.location.state.employee;
        //         axios
        //             .get(`/api/${id}`)
        //             .then(response => {
        //                 this.setState(
        //                     {
        //                         employee: response.data,
        //                     },
        //                     () => {
        //                         this.handleInitialize();
        //                     }
        //                 );
        //             })
        //             .catch(error => console.log(error.response));
        //     }
        // }

        // handleInitialize() {
        //     if (this.state.employee) {
        //         this.setState({ editing: true });
        //
        //         const initData = {
        //             firstName: this.state.employee
        //                 ? this.state.employee.firstName
        //                 : undefined,
        //             lastName: this.state.employee
        //                 ? this.state.employee.lastName
        //                 : undefined,
        //             dateStart: this.state.employee
        //                 ? this.state.employee.dateStart
        //                 : undefined,
        //             buddy: this.state.employee
        //                 ? this.state.employee.buddy
        //                 : undefined,
        //             seat: this.state.employee
        //                 ? this.state.employee.seat
        //                 : undefined,
        //             cwID: this.state.employee
        //                 ? this.state.employee.cwID
        //                 : undefined,
        //             comments: this.state.employee
        //                 ? this.state.employee.comments
        //                 : undefined,
        //             _manager: this.state.employee._manager
        //                 ? this.state.employee._manager._id
        //                 : undefined,
        //             _admin: this.state.employee._admin
        //                 ? this.state.employee._admin._id
        //                 : undefined,
        //             _status: this.state.employee._status
        //                 ? this.state.employee._status._id
        //                 : undefined,
        //             _team: this.state.employee._team
        //                 ? this.state.employee._team._id
        //                 : undefined,
        //             _role: this.state.employee._role
        //                 ? this.state.employee._role._id
        //                 : undefined,
        //             _vendor: this.state.employee._vendor
        //                 ? this.state.employee._vendor._id
        //                 : undefined,
        //             _type: this.state.employee._type
        //                 ? this.state.employee._type._id
        //                 : undefined,
        //             _hirestatus: this.state.employee._hirestatus
        //                 ? this.state.employee._hirestatus._id
        //                 : undefined,
        //             _region: this.state.employee._region
        //                 ? this.state.employee._region._id
        //                 : undefined,
        //             _campus: this.state.employee._campus
        //                 ? this.state.employee._campus._id
        //                 : undefined,
        //             _leader: this.state.employee._leader
        //                 ? this.state.employee._leader._id
        //                 : undefined,
        //             _platform: this.state.employee._platform
        //                 ? this.state.employee._platform._id
        //                 : undefined,
        //             _computer: this.state.employee._computer
        //                 ? this.state.employee._computer._id
        //                 : undefined,
        //         };
        //
        //         this.setState({ initData: initData });
        //
        //         this.props.initialize(initData);
        //     } else {
        //         this.setState({ editing: false });
        //     }
    }

    //state = { showFormReview: false};
    renderTicketContent() {
        if (this.state.showFormReview) {
            return (
                <TicketFormReview
                    onCancel={() =>
                        this.setState({
                            showFormReview: false,
                        })
                    }
                />
            );
        } else {
            return (
                <TicketForm
                    onTicketSubmit={() =>
                        this.setState({
                            showFormReview: true,
                        })
                    }
                />
            );
        }
    }

    render() {
        return <div>{this.renderTicketContent()}</div>;
    }
}

TicketNew = reduxForm({
    form: 'ticketForm',
})(TicketNew);
export default connect()(TicketNew);
