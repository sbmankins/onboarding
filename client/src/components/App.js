import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import NavBar from './NavBar';
const Dashboard = () => <h2>Dashboard</h2>
const EmployeeNew = () => <h2>EmployeeNew</h2>
const EmployeeDetail = () => <h2>EmployeeDetail</h2>

const App = () => {
  return (

    <div>
      <BrowserRouter>
          <div>
            <NavBar />
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/new" component={EmployeeNew} />
            <Route path="/detail" component={EmployeeDetail} />
          </div>
        </BrowserRouter>
    </div>
  );
};

export default App;
