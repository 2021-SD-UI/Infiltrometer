import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, useRouteMatch, useParams } from 'react-router-dom';
import BaerInitializeView from './features/baer-initialize/BaerInitializeView';
import BaerReplicationView from './features/baer-replication/BaerReplicationView';
import BaerResultsView from './features/baer-results/BaerResultsView';
const  App = ()=> {
  return (
    <Router>
          <Switch>
            <Route exact path ="/">
              <div>
                Default
              </div>
            </Route>
            <Route exact path ="/baer-initialize">
              <BaerInitializeView/>
            </Route>
            <Route exact path ="/baer-replication">
              <BaerReplicationView/>
            </Route>
            <Route exact path ="/baer-results">
              <BaerResultsView/>
            </Route>

          </Switch>
          
    </Router>
  );
}

export default App;
