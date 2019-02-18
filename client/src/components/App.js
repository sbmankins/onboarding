import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'typeface-roboto';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import EmployeeNew from './forms/EmployeeNew';
import DashboardTable from './DashboardTable';
//const EmployeeDetail = () => <h2>EmployeeDetail</h2>

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => <Dashboard {...props} />}
                    />
                    <Route
                        path="/new"
                        render={props => <EmployeeNew {...props} />}
                    />
                    <Route
                        path="/listview"
                        render={props => <DashboardTable {...props} />}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
