import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import BaerInitializeView from './features/baer/baer-initialize/BaerInitializeView';
import BaerReplicationView from './features/baer/baer-replication/BaerReplicationView';
import BaerResultsView from './features/baer/baer-results/BaerResultsView';
import { ShowReportsButton } from './features/reports/ShowReportsButon';
import { RegressionTesting } from './features/regression/RegressionTesting';
import { Redirector } from './features/page-redirection/Redirector';
import { NavBar } from './features/navBar/NavBar';
const  App = ()=> {
  return (
    <BrowserRouter>
          <NavBar/>
          <Redirector/>
          <Switch>
           
            <Route exact path ="/Infiltrometer/">
              <div>
                <h1>
                  Home Page
                </h1>
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
             <Route exact path ="/Infiltrometer/manuals-baer">
               <h1>
                    TODO: Baer Manual
                </h1>
            </Route>
            <Route exact path ="/Infiltrometer/manuals-infiltrometer">
               <h1>
                  TODO: infiltrometer Manual
                </h1>
            </Route>
            <Route exact path ="/Infiltrometer/reports">
               <h1>
                  TODO: Reports Page
                </h1>
            </Route>

          </Switch>
          
    </BrowserRouter>
  );
}

export default App;
