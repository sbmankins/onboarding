import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const Dashboard = () => {
  return(
    <Paper style={{width:'80%', margin:'0 auto', padding:'10px', background:'#edeeef'}} elevation={1}>
      <div style={{textAlign: 'center'}}>
        <Typography variant="headline">Dashboard Will Go Here</Typography>
      </div>
    </Paper>
  );
}

export default Dashboard;
