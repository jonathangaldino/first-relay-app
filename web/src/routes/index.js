import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  )
}

export default Routes;