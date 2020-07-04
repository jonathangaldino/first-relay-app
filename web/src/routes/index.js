import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import ItemList from '../pages/ItemList';
import Create from '../pages/Create';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/list" component={ItemList} />
        <Route exact path="/create" component={Create} />
      </Switch>
    </Router>
  )
}

export default Routes;