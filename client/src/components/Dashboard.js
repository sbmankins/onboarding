import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import EmployeeList from './forms/EmployeeList'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    outerContainer: {
        width: '90%',
        margin: '0 auto',
        padding: '10px',
        background: '#edeeef',
        textAlign: 'center',
    },

    headerContainer: {
        background: '#dbe2ef',
        padding: '20px',
        marginBottom: '20px',
    },

    dashTitle: {
        textAlign: 'center',
        color: '#626f78',
    },

    cardContainer: {
        flexGrow: 1,
    },
})

class Dashboard extends Component {
    state = { employee: {} }

    deleteEmployee(employee) {
        let index = this.state.employee
            .map(element => element.employee)
            .indexOf(employee)
        this.state.employee.splice(index, 1)
    }

    render() {
        const { classes } = this.props
        return (
            <Paper className={classes.outerContainer} elevation={1}>
                <Paper className={classes.headerContainer}>
                    <Typography className={classes.dashTitle} variant="title">
                        Dashboard
                    </Typography>
                </Paper>
                <div className={classes.cardContainer}>
                    <Grid container justify="space-evenly" spacing={24}>
                        <EmployeeList
                            deleteEmployee={this.deleteEmployee.bind(this)}
                        />
                    </Grid>
                </div>
            </Paper>
        )
    }
}
export default connect()(withStyles(styles)(Dashboard))
