//import react
import React from 'react';

//import react router dom
import { Switch, Route } from "react-router-dom";

//import component Register
import Register from './pages/Register';

//import component Login
import Login from './pages/Login';

import Create from './pages/Create';

//import component Register
import Dashboard from './pages/Dashboard';

import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        {/* <Route exact path="/dashboard" component={Dashboard} /> */}
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/create" component={Create} />
      </Switch>
    </div>
  );
}

export default App;