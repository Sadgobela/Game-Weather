import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Main from './pages/main'
import Settings from "./pages/settings/settings";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <Router>
          <div>
              <Switch>
                  <Route exact path="/">
                      <Main key={''} />
                  </Route>
                  <Route path="/settings">
                      <Settings />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
