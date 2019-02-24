import MaterialTable from 'material-table';
import React, { Component } from 'react';
import { fetchEmployees, deleteEmployee } from '../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class DashboardTable extends Component {
    state = {
        employees: {},
        employeeID: '',
        editing: false,
        toDashboard: false,
    };
    componentDidMount() {
        this.props.fetchEmployees();
        console.log(this.props);

        //console.log(this.props);
    }

    handleEditClick = (event, rowData) => {
        console.log(rowData);
        event.preventDefault();
        this.setState({
            employeeID: rowData,
            toDashboard: true,
            editing: true,
        });
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
                        },
                    }}
                />
            );
        }
        return (
            <MaterialTable
                columns={[
                    {
                        title: 'First Name',
                        field: 'firstName',
                    },
                    {
                        title: 'LastName',
                        field: 'lastName',
                        sorting: true,
                        defaultSort: 'asc',
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
                        title: 'StartDate',
                        field: 'dateStart',
                        type: 'date',
                        sorting: true,
                    },

                    {
                        title: 'Status',
                        field: 'status',

                        sorting: true,
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
                        icon: 'delete_forever',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => {
                            if (window.confirm('Delete the item?')) {
                                this.onEmployeeDelete(event, rowData.id);
                            }
                        },
                    },
                    //},
                ]}
                data={this.props.employees.map(employee => {
                    return {
                        id: employee._id,
                        lastName: employee.lastName,
                        firstName: employee.firstName,
                        dateStart: new Date(
                            employee.dateStart
                        ).toLocaleDateString('en-US', {
                            timeZone: 'UTC',
                        }),
                        manager: employee._manager.name,
                        admin: employee._admin.name,
                        status: employee._status.name,
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
        toDashboard: state.toDashboard,
    };
}

DashboardTable = connect(
    mapStateToProps,
    { fetchEmployees, deleteEmployee }
)(DashboardTable);
export default DashboardTable;