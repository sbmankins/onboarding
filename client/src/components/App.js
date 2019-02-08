import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import 'typeface-roboto';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import EmployeeNew from './forms/EmployeeNew';
//const EmployeeDetail = () => <h2>EmployeeDetail</h2>


const App = () => {
  return (

<BrowserRouter>
          <div>
            <NavBar />
            <Route exact path='/'render={(props) => <Dashboard {...props}  />}/>
            <Route path='/new'render={(props) => <EmployeeNew {...props}  />}/>
          </div>
        </BrowserRouter>

  );
};

export default App;
