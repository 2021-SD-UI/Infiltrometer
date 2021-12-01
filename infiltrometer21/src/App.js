import React from 'react';
import './App.css';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import BaerInitializeView from './features/baer/baer-initialize/BaerInitializeView';
import BaerReplicationView from './features/baer/baer-replication/BaerReplicationView';
import BaerResultsView from './features/baer/baer-results/BaerResultsView';
import { Redirector } from './features/page-redirection/Redirector';
import { NavBar } from './features/navBar/NavBar';
import ReportsTable from './features/reports/ReportsTable';
import { HomePage } from './features/homepage/HomePage';
import { Pages } from './features/page-redirection/Redirector';

import SinglePagePDFView from "./features/pdfviewer/pdf-viewer"
import MiniDiskManual from './features/pdfviewer/MiniDiskManual.pdf';
import FieldGuide from './features/pdfviewer/FieldGuide.pdf'


const App = () => {
  return (

    <HashRouter>
      <title>Infiltrometer Companion</title>
      <NavBar />
      <Redirector protectedElements={
        <Switch>
          <Route exact path={Pages.Homepage}>
            <HomePage />
          </Route>
          <Route exact path={Pages.BaerInitializeView}>
            <BaerInitializeView />
          </Route>
          <Route exact path={Pages.BaerReplicationView}>
            <BaerReplicationView />
          </Route>
          <Route exact path={Pages.BaerResultsView}>
            <BaerResultsView />
          </Route>
          <Route exact path={Pages.BaerManual}>
            <SinglePagePDFView pdf={MiniDiskManual} />

          </Route>
          <Route exact path={Pages.InfiltrometerManual}>
            <SinglePagePDFView pdf={FieldGuide} />
          </Route>
          <Route exact path={Pages.ReportsView}>
            <ReportsTable />
          </Route>

        </Switch>
      } />
    </HashRouter>
  );
}

export default App;
