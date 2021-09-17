import React from 'react';
<<<<<<< HEAD
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
=======
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
>>>>>>> 78bb0b272eb4a705b282305de49fe4500958c841
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
          
<<<<<<< HEAD
=======
        </div>
     </div>
>>>>>>> 78bb0b272eb4a705b282305de49fe4500958c841
    </Router>
  );
}

export default App;
