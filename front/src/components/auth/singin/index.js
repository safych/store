import { Component } from "react";
import './style.css';

import { Redirect } from "react-router-dom";

import Url from "../../../mixins/apiUrl";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class SingIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      email: "",
      password: ""
    };
  }

  setEmail = (event) => {
    this.setState({email: event.target.value});
  }

  setPassword = (event) => {
    this.setState({password: event.target.value});
  }

  login = () => {
    fetch(Url + 'login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
          email: this.state.email, 
          password_digest: this.state.password
      })
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("token", JSON.stringify(data.access_token));
      this.props.restart();
    });
  }

  render() {
    return (
      <div>
        { localStorage.getItem("token") ? <Redirect to="/products" /> : null }
        <div className="container">
          <div className="sign-in-form">
            <h2>Sing in</h2>
            <p><TextField type="email" id="outlined-basic" label="email" variant="outlined" value={this.state.email} onChange={this.setEmail} /></p>
            <TextField type="password" id="outlined-basic" label="password" variant="outlined" value={this.state.password} onChange={this.setPassword} />
            <p style={{ color: 'red', fontSize: '12px' }}>{this.state.error}</p>
            <Button className="singInBtn" onClick={this.login}>Login</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingIn
