import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signin from '../pages/Signin';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signin} />
      </Switch>
    </Router>
  )
}

export default Routes;