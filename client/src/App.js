import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { Component } from 'react';

export default class App extends Component {
  constructor(props) {
   super(props);
   
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    };
  }

  handleLogin = (data) => {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user
    });
  } 

  render() {
    const {loggedInStatus} = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Home {...props}
                  loggedInStatus={loggedInStatus}
                  handleLogin={(data) => this.handleLogin(data)}
                />
              )}
            />
            <Route
              exact
              path='/dashboard'
              render={props => (
                <Dashboard {...props} loggedInStatus={loggedInStatus} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}