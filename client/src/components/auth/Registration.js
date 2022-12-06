import React, { Component } from 'react'
import axios from 'axios';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      registrationErrors: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
  
    const {email, password, password_confirmation} = this.state;
    axios.post(
      'http://localhost:4000/registrations',
      {
        user: {
          email,
          password,
          password_confirmation
        }
      },
      { withCredentials: true } // allow server to set cookie in the browser
    ).then(response => {
      console.log(response.data);
    }).catch( error => {
      console.log(error);
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const {email, password, password_confirmation} = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={this.handleChange}
            required
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={this.handleChange}
            required
          />

          <input
            type='password'
            name='password_confirmation'
            placeholder='Password Confirmation'
            value={password_confirmation}
            onChange={this.handleChange}
            required
          />
          <button type='submit'>Register</button>
        </form>
      </div>
    )
  }
}
