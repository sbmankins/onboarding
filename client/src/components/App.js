import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {connect} from 'react-redux';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import EmployeeNew from './forms/EmployeeNew';
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
