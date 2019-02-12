import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import EmployeeList from './forms/EmployeeList'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'

class Dashboard extends Component {
    state = { employees: [] }

    render() {
        return (
            <Paper
                style={{
                    width: '90%',
                    margin: '0 auto',
                    padding: '10px',
                    background: '#edeeef',
                    textAlign: 'center',
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
                        Dashboard
                    </Typography>
                </Paper>
                <div style={{ flexGrow: 1 }}>
                    <Grid container justify="space-evenly" spacing={24}>
                        <EmployeeList />
                    </Grid>
                </div>
            </Paper>
        )
    }
}
export default connect()(Dashboard)
