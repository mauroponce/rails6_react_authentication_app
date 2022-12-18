import React, { Component } from 'react'
import Registration from './auth/Registration'
import Login from './auth/Login';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  handleSuccessfulAuth = (data) => {
    this.props.handleLogin(data);
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    )
  }
}
