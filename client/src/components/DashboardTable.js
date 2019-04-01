import MaterialTable from 'material-table';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchEmployees, deleteEmployee } from '../actions';

//Dashboard table component
class DashboardTable extends Component {
    state = {
        employees: {},
        employeeID: '',
        editing: false,
        ticket: false,
        toDashboard: false,
    };
    componentDidMount() {
        this.props.fetchEmployees();
    }

    handleEditClick = (event, rowData) => {
        event.preventDefault();
        this.setState({
            employeeID: rowData,
            toDashboard: true,
            editing: true,
        });
    };

    handleTicketClick = (event, id, cwID, neID) => {
        event.preventDefault();
        if (cwID && neID) {
            this.setState({
                employeeID: id,
                toDashboard: true,
                editing: true,
                ticket: true,
            });
        } else if (!cwID && neID) {
            window.alert('Employee does not have a CWID');
        } else if (!neID && cwID) {
            window.alert('Employee does not have an EID/NEID');
        } else if (!neID && !cwID) {
            window.alert('Employee does not have an EID/NEID or CWID');
        }
    };

    onEmployeeDelete = (event, id) => {
        event.preventDefault();
        this.props.deleteEmployee(id);
        this.setState({ employees: this.props.fetchEmployees() });
    };

    render() {
        if (this.state.toDashboard === true && this.state.employeeID) {
            return (
                <Redirect
                    to={{
                        pathname: '/new',
                        state: {
                            employee: this.state.employeeID,
                            editing: this.state.editing,
                            ticket: this.state.ticket,
                        },
                    }}
                />
            );
        }
        return (
            <MaterialTable
                style={{ minWidth: 700 }}
                columns={[
                    {
                        title: 'Entered',
                        field: 'dateCreated',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'NEID',
                        field: 'neID',
                        sorting: false,
                        hidden: true,
                    },
                    {
                        title: 'CWID',
                        field: 'cwID',
                        sorting: false,
                        hidden: true,
                    },
                    {
                        title: 'First Name',
                        field: 'firstName',
                    },
                    {
                        title: 'Last Name',
                        field: 'lastName',
                        sorting: true,
                        defaultSort: 'asc',
                    },
                    {
                        title: 'Role',
                        field: 'role',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'Leader/Contributor',
                        field: 'leader',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'Platform',
                        field: 'platform',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'Team',
                        field: 'team',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'Manager',
                        field: 'manager',
                        sorting: true,
                    },
                    {
                        title: 'Admin',
                        field: 'admin',
                        sorting: true,
                    },
                    {
                        title: 'Start Date',
                        field: 'dateStart',
                        type: 'date',
                        sorting: true,
                    },

                    {
                        title: 'Status',
                        field: 'status',
                        sorting: true,
                    },

                    {
                        title: 'Vendor',
                        field: 'vendor',
                        sorting: false,
                        hidden: true,
                    },

                    {
                        title: 'Type',
                        field: 'type',
                        sorting: true,
                        hidden: true,
                    },

                    {
                        title: 'Hire Status',
                        field: 'hireStatus',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'Region',
                        field: 'region',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'Campus',
                        field: 'campus',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'Seat',
                        field: 'seat',
                        sorting: false,
                        hidden: true,
                    },
                    {
                        title: 'Computer',
                        field: 'computer',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'Mac Ticket',
                        field: 'macTicket',
                        sorting: false,
                        hidden: true,
                    },
                    {
                        title: 'Mac Ticket Date',
                        field: 'macTicketDate',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'Laptop Delivery',
                        field: 'laptopDelivered',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'NewHire/ReHire',
                        field: 'newHireReHire',
                        sorting: false,
                        hidden: true,
                    },
                    {
                        title: 'NewHire/ReHire Date',
                        field: 'newHireReHireDate',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'Onboarding Buddy',
                        field: 'buddy',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'Buddy Mail Date',
                        field: 'buddyMail',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'Welcome Mail Date',
                        field: 'welcomeMail',
                        sorting: true,
                        hidden: true,
                    },
                    {
                        title: 'DL/PD Org Date',
                        field: 'dlPdOrg',
                        sorting: true,
                        hidden: true,
                    },

                    {
                        title: 'Comments',
                        field: 'comments',
                        sorting: false,
                        hidden: true,
                    },
                ]}
                actions={[
                    {
                        icon: 'create',
                        tooltip: 'Edit',
                        onClick: (event, rowData) => {
                            this.handleEditClick(event, rowData.id);
                        },
                    },
                    {
                        icon: 'local_activity',
                        tooltip: 'Ticket',
                        onClick: (event, rowData) => {
                            this.handleTicketClick(
                                event,
                                rowData.id,
                                rowData.cwID,
                                rowData.neID
                            );
                        },
                    },
                    {
                        icon: 'delete_forever',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => {
                            if (window.confirm('Delete the item?')) {
                                this.onEmployeeDelete(event, rowData.id);
                            }
                        },
                    },
                ]}
                data={this.props.employees.map(employee => {
                    let vendor;
                    let campus;
                    let leader;
                    let dlPdOrg;
                    let welcomeMail;
                    let buddyMail;
                    let newHireReHireDate;
                    let laptopDelivered;
                    let macTicketDate;

                    const options = {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    };

                    if (employee._vendor) {
                        vendor = employee._vendor.name;
                    } else {
                        vendor = '';
                    }
                    if (employee._campus) {
                        campus = employee._campus.name;
                    } else {
                        campus = '';
                    }
                    if (employee._leader) {
                        leader = employee._leader.name;
                    } else {
                        leader = '';
                    }
                    if (employee.dlPdOrg) {
                        dlPdOrg = new Date(employee.dlPdOrg).toLocaleDateString(
                            'en-US',
                            options,
                            {
                                timeZone: 'UTC',
                            }
                        );
                    } else {
                        dlPdOrg = '';
                    }
                    if (employee.welcomeMail) {
                        welcomeMail = new Date(
                            employee.welcomeMail
                        ).toLocaleDateString('en-US', options, {
                            timeZone: 'UTC',
                        });
                    } else {
                        welcomeMail = '';
                    }
                    if (employee.buddyMail) {
                        buddyMail = new Date(
                            employee.buddyMail
                        ).toLocaleDateString('en-US', options, {
                            timeZone: 'UTC',
                        });
                    } else {
                        buddyMail = '';
                    }
                    if (employee.newHireReHireDate) {
                        newHireReHireDate = new Date(
                            employee.newHireReHireDate
                        ).toLocaleDateString('en-US', options, {
                            timeZone: 'UTC',
                        });
                    } else {
                        newHireReHireDate = '';
                    }
                    if (employee.laptopDelivered) {
                        laptopDelivered = new Date(
                            employee.laptopDelivered
                        ).toLocaleDateString('en-US', options, {
                            timeZone: 'UTC',
                        });
                    } else {
                        laptopDelivered = '';
                    }
                    if (employee.macTicketDate) {
                        macTicketDate = new Date(
                            employee.macTicketDate
                        ).toLocaleDateString('en-US', options, {
                            timeZone: 'UTC',
                        });
                    } else {
                        macTicketDate = '';
                    }
                    return {
                        dateCreated: new Date(
                            employee.dateCreated
                        ).toLocaleDateString('en-US', options, {
                            timeZone: 'UTC',
                        }),
                        id: employee._id,
                        lastName: employee.lastName,
                        firstName: employee.firstName,
                        dateStart: new Date(
                            employee.dateStart
                        ).toLocaleDateString('en-US', options, {
                            timeZone: 'UTC',
                        }),
                        manager: employee._manager.name,
                        admin: employee._admin.name,
                        cwID: employee.cwID,
                        neID: employee.neID,
                        status: employee._status.name,
                        role: employee._role.name,
                        leader: leader,
                        platform: employee._platform.name,
                        team: employee._team.name,
                        comments: employee.comments,
                        vendor: vendor,
                        type: employee._type.name,
                        hireStatus: employee._hirestatus.name,
                        region: employee._region.name,
                        campus: campus,
                        seat: employee.seat,
                        computer: employee._computer.name,
                        macTicket: employee.macTicket,
                        macTicketDate: macTicketDate,
                        laptopDelivered: laptopDelivered,
                        newHireReHire: employee.newHireReHire,
                        newHireReHireDate: newHireReHireDate,
                        buddy: employee.buddy,
                        buddyMail: buddyMail,
                        welcomeMail: welcomeMail,
                        dlPdOrg: dlPdOrg,
                    };
                })}
                title="Onboarding"
                options={{
                    paging: true,
                    toolbar: true,
                    columnsButton: true,
                    exportButton: true,
                }}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        employees: state.employees,
        employee: state.employeeID,
        editing: state.editing,
        ticket: state.ticket,
        toDashboard: state.toDashboard,
    };
}

DashboardTable = connect(
    mapStateToProps,
    { fetchEmployees, deleteEmployee }
)(DashboardTable);
export default DashboardTable;
