import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import BaerInitializeView from './features/baer/baer-initialize/BaerInitializeView';
import BaerReplicationView from './features/baer/baer-replication/BaerReplicationView';
import BaerResultsView from './features/baer/baer-results/BaerResultsView';
import { RegressionTesting } from './features/regression/RegressionTesting';
import { Redirector } from './features/page-redirection/Redirector';
import { NavBar } from './features/navBar/NavBar';
import SinglePagePDFView from "./features/pdfviewer/pdf-viewer";
import ReportsTable from './features/reports/ReportsTable';
import { MiniDiskManualView, FieldGuideManualView } from './features/pdfviewer/Manuals';
const  App = ()=> {
  return (
    
    <BrowserRouter>
    <title>Infiltrometer Companion</title>
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
              <FieldGuideManualView/>
            
            </Route>
            <Route exact path ="/Infiltrometer/manuals-infiltrometer">
              <MiniDiskManualView/>
            </Route>
            <Route exact path ="/Infiltrometer/reports">
               <ReportsTable/>
            </Route>

          </Switch>
          
    </BrowserRouter>
  );
}

export default App;
