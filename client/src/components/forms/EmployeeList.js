import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEmployees } from '../../actions'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchEmployees()
    }

    renderEmployees() {
        return this.props.employees.map(employee => {
            return (
                <Grid
                    item
                    style={{
                        display: 'inline-block',
                    }}
                    xs={6}
                    key={employee._id}
                >
                    <Card
                        style={{
                            height: '200px',
                            width: '285px',
                            margin: '20px',
                        }}
                    >
                        <CardContent>
                            <Typography variant="title" component="h6">
                                Name: {employee.firstName} {employee.lastName}
                            </Typography>
                            <Typography>adjective</Typography>
                            <Typography component="p">
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button>Learn More</Button>
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

function mapStateToProps({ employees }) {
    return { employees }
}

export default connect(
    mapStateToProps,
    { fetchEmployees }
)(SurveyList)
