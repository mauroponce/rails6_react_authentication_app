import './App.css';
import axios from 'axios';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { Component } from 'react';

export default class App extends Component {
  constructor(props) {
   super(props);
   
    this.state = {
      currentUser: {}
    };
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogin = (data) => {
    this.setState({
      currentUser: data.user
    });
  }

  checkLoginStatus = () => {
    axios.get(
      'http://localhost:4000/sessions/logged_in',
      { withCredentials: true } // work with cookies (Rails session)
    ).then((response) => {
      this.setState({
        currentUser: response.data.logged_in ? response.data.user : {}
      })
    }).catch(error => {
      console.log('Login error', error);
    });
  }

  render() {
    const {currentUser, isUserLoggedIn} = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Home
                  {...props}
                  currentUser={currentUser}
                  handleLogin={(data) => this.handleLogin(data)}
                />
              )}
            />
            <Route
              exact
              path='/dashboard'
              render={props => (
                <Dashboard
                  {...props}
                  currentUser={currentUser}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}