import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import BaerInitializeView from './features/baer-initialize/BaerInitializeView';
import BaerReplicationView from './features/baer-replication/BaerReplicationView';
import BaerResultsView from './features/baer-results/BaerResultsView';
const  App = ()=> {
  return (
    <BrowserRouter>
          <Switch>
            <Route exact path ="/Infiltrometer/">
              <div>
                <Link to="/Infiltrometer/baer-initialize">Baer Initialize View</Link>
              </div>
            </Route>
            <Route exact path ="/Infiltrometer/baer-initialize">
              <BaerInitializeView/>
            </Route>
            <Route exact path ="/Infiltrometer/baer-replication">
              <BaerReplicationView/>
            </Route>
            <Route exact path ="/Infiltrometer/baer-results">
              <BaerResultsView/>
            </Route>

          </Switch>
          
    </BrowserRouter>
  );
}

export default App;