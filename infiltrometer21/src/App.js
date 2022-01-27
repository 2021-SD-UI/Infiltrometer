import React from 'react';
import './App.css';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import BaerInitializeView from './features/baer/baer-initialize/BaerInitializeView';
import BaerReplicationView from './features/baer/baer-replication/BaerReplicationView';
import { Redirector } from './features/page-redirection/Redirector';
import { NavBar } from './features/navBar/NavBar';
import ReportsTable from './features/reports/ReportsTable';
import { HomePage } from './features/homepage/HomePage';
import { Pages } from './features/page-redirection/Redirector';
import { PdfViewer } from './features/pdfviewer/pdf-viewer'
import MiniDiskManual from './features/pdfviewer/MiniDiskManual.pdf';
import FieldGuide from './features/pdfviewer/Field-Guide.pdf'
import StandardResultsView from './features/standard/standard-results/StandardResultsView';
import StandardInitializeView from './features/standard/standard-initialize/StandardInitializeView';
import BaerResultsView from './features/baer/baer-results/BaerResultsView';
import StandardReplicationView from './features/standard/standard-replication/StandardReplicationView';
const App = () => {
  return (

    <HashRouter>
      <title>Infiltrometer Companion</title>
      <NavBar />
      {/*Initialize Assets so they are pre-loaded*/}

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
          <Route exact path={Pages.StandardInitializeView}>
            <StandardInitializeView />
          </Route>
          <Route exact path={Pages.StandardReplicationView}>
            <StandardReplicationView />
          </Route>
          <Route exact path={Pages.StandardResultsView}>
            <StandardResultsView />
          </Route>
          <Route exact path={Pages.InfiltrometerManual}>
            <PdfViewer pdf={MiniDiskManual} />

          </Route>
          <Route exact path={Pages.BaerManual}>
            <PdfViewer pdf={FieldGuide} />
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
