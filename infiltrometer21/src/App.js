import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BaerInitializeView from './features/baer-initialize/BaerInitializeView';
import BaerReplicationView from './features/baer-replication/BaerReplicationView';
import BaerResultsView from './features/baer-results/BaerResultsView';
function App() {
  return (
    <Router>
      <div className="App">
        <div className = "content">
          <Switch>
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
          
        </div>
     </div>
    </Router>
  );
}

export default App;
