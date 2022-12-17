import React, { Component } from 'react'
import Registration from './auth/Registration'
import Login from './auth/Login';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  handleSuccessfulAuth = (data) => {
    this.props.handleLogin(data);
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Logged in: {this.props.currentUser ? 'Yes' : 'No'}</h2>
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    )
  }
}
