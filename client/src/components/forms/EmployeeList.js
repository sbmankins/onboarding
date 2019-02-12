import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEmployees, deleteEmployee } from '../../actions'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { daysBetween } from './daysBetween'

//import { Link } from 'react-router-dom'

const Normaltext = {
    color: 'black',
}
const Warning = {
    backgroundColor: '#faf096',
    height: '200px',
    width: '250px',
    margin: '20px',
}

const Dangertext = {
    color: 'white',
}

const Danger = {
    backgroundColor: '#c82121',
    height: '200px',
    width: '250px',
    margin: '20px',
}

const Good = {
    backgroundColor: '#acdeaa',
    height: '200px',
    width: '250px',
    margin: '20px',
}

let DividerColor = false

let New = {}
let NewColor = {}

class EmployeeList extends Component {
    componentDidMount() {
        this.props.fetchEmployees()
    }

    renderEmployees() {
        return this.props.employees.map(employee => {
            let start = new Date()
            start = employee.dateStart
            console.log('dateStart' + employee.dateStart)

            const between = daysBetween(start)
            console.log(employee.dateStart)

            if (between >= 7) {
                New = Good
                NewColor = Normaltext
                DividerColor = false
                console.log(between)
            } else if (between > 0 && between <= 7) {
                New = Warning
                NewColor = Normaltext
                DividerColor = false
                console.log(between)
            } else {
                New = Danger
                NewColor = Dangertext
                DividerColor = true
                console.log(between)
            }
            return (
                <Grid
                    item
                    style={{
                        display: 'inline-block',
                    }}
                    xs={12}
                    key={employee._id}
                >
                    <Card style={New}>
                        <CardContent>
                            <Typography
                                style={NewColor}
                                variant="title"
                                component="h6"
                            >
                                {employee.firstName} {employee.lastName}
                            </Typography>
                            <Divider
                                style={{ margin: '5px 0 5px 0' }}
                                variant="middle"
                                light={DividerColor}
                            />
                            <div style={{ textAlign: 'Left' }}>
                                <Typography style={NewColor} component="p">
                                    <strong>Manager:</strong> {employee.manager}
                                </Typography>
                                <Typography style={NewColor} component="p">
                                    <strong>Admin:</strong> {employee.admin}
                                </Typography>
                                <Divider
                                    style={{
                                        margin: '5px 0 5px 0',
                                    }}
                                    variant="middle"
                                    light={DividerColor}
                                />
                                <Grid container spacing={24}>
                                    <Grid item xs={6}>
                                        <Typography
                                            style={NewColor}
                                            component="p"
                                        >
                                            <strong>Start Date:</strong>{' '}
                                            {new Date(
                                                employee.dateStart
                                            ).toLocaleDateString('en-US', {
                                                timeZone: 'UTC',
                                            })}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography
                                            style={NewColor}
                                            component="p"
                                        >
                                            <strong>Status:</strong> To DO
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button style={NewColor}>Edit</Button>
                            <Button
                                style={NewColor}
                                onClick={() => {
                                    this.props.deleteEmployee(employee._id)
                                    this.setState({ state: this.state })
                                    console.log(employee._id)
                                }}
                            >
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            )
        })
    }

    render() {
        return <div>{this.renderEmployees()}</div>
    }
}

function mapStateToProps(state) {
    return { employees: state.employees }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         //note that this code assumes deleteSurvery is a thunk
//         handleDeleteEmployee: id => dispatch(deleteEmployee(id)),
//     }
// }

export default connect(
    mapStateToProps,
    { fetchEmployees, deleteEmployee }
)(EmployeeList)
