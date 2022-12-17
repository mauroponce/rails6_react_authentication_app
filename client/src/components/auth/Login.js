import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginErrors: '' // TODO: show errors
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
  
    const {email, password} = this.state;
    axios.post(
      'http://localhost:4000/sessions',
      {
        user: {
          email,
          password
        }
      },
      { withCredentials: true } // allow server to set cookie in the browser
    ).then(response => {
      if(response.data.logged_in) {
        this.props.handleSuccessfulAuth(response.data);
      } else if(response.data.status === 'unauthorized'){
        alert('Invalid credentials');
      }
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
    const {email, password} = this.state;
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
          <button type='submit'>Log in</button>
        </form>
      </div>
    )
  }
}
