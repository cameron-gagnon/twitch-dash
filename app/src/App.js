import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import DashboardGrid from 'js/dashboard/dashboardGrid.jsx';
import Login from 'js/components/login.jsx';

import 'styles/css/App.css';

function App() {

  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" render={props => <DashboardGrid {...props}/> }/>
        <Route exact={true} path="/login" render={ props => <Login {...props} /> }/>
      </Switch>
    </Router>
  );
}

export default App;