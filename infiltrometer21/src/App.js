import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import BaerInitializeView from './features/baer/baer-initialize/BaerInitializeView';
import BaerReplicationView from './features/baer/baer-replication/BaerReplicationView';
import BaerResultsView from './features/baer/baer-results/BaerResultsView';
import { ShowReportsButton } from './features/reports/ShowReportsButon';
import { RegressionTesting } from './features/regression/RegressionTesting';
import { Redirector } from './features/page-redirection/Redirector';
const  App = ()=> {
  return (
    <BrowserRouter>
          <Redirector/>
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
             <Route exact path ="/Infiltrometer/testing/regression">
              <RegressionTesting/>
            </Route>

          </Switch>
          
    </BrowserRouter>
  );
}

export default App;
