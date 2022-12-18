import './App.css';
import axios from 'axios';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { Component } from 'react';

export default class App extends Component {
  constructor(props) {
   super(props);
   
    this.state = {
      currentUser: {},
      loggedInStatus: 'NOT_LOGGED_IN'
    };
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin = (data) => {
    this.setState({
      currentUser: data.user,
      loggedInStatus: 'LOGGED_IN'
    });
  }

  handleLogout = () => {
    axios.delete(
      'http://localhost:4000/sessions/logout',
      { withCredentials: true } // work with cookies (Rails session)
    ).then(() => {
      this.setState({
        currentUser: {},
        loggedInStatus: 'NOT_LOGGED_IN'
      })
    }).catch(error => {
      console.log('Login error', error);
    });
  }

  checkLoginStatus = () => {
    axios.get(
      'http://localhost:4000/sessions/logged_in',
      { withCredentials: true } // work with cookies (Rails session)
    ).then((response) => {
      if(response.data.logged_in) {
        this.setState({
          currentUser: response.data.user,
          loggedInStatus: 'LOGGED_IN'
        })
      } else {
        this.setState({
          currentUser: {},
          loggedInStatus: 'NOT_LOGGED_IN'
        })
      }
    }).catch(error => {
      console.log('Login error', error);
    });
  }

  render() {
    const {currentUser, loggedInStatus} = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                loggedInStatus === 'NOT_LOGGED_IN' ?
                  <Home
                    {...props}
                    handleLogin={this.handleLogin}
                  /> :
                  <Redirect to={'/dashboard'} />
              )}
            />
            <Route
              exact
              path='/dashboard'
              render={props => (
                loggedInStatus === 'LOGGED_IN' ?
                  <Dashboard
                    {...props}
                    currentUser={currentUser}
                    handleLogout={this.handleLogout}
                  /> :
                  <Redirect to={'/'} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}