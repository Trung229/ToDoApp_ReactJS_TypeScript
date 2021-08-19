import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Index } from './components/index'
import { Main } from './components/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContextProvider from './contexts/userContext';
import TaskContextProvider from './contexts/taskContext'
function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <TaskContextProvider>
          <Router>
            <Switch>
              <Route path="/main">
                <Main />
              </Route>
              <Route path="/">
                <Index />
              </Route>
            </Switch>
          </Router>
        </TaskContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
