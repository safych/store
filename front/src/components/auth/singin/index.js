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
    
    // fetch(Url + 'admins', {
    //   method: 'GET',
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //     for (var i = 0; i < data.length; i++) {
    //       if (data[i].email === this.state.email && data[i].password === this.state.password) {
    //         localStorage.setItem("id", JSON.stringify(data[i].id));
    //         localStorage.setItem("email", JSON.stringify(data[i].email));    
    //         localStorage.setItem("name", JSON.stringify(data[i].name)); 
    //         this.setState({error: ""});
    //         this.props.restart();
    //         break;
    //       } else {
    //         this.setState({error: "Невірно введені данні"});
    //         this.loginUser();
    //       }
    //     }
    // })
  }

  loginUser = () => {
    fetch(Url + 'users', {
      method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].email === this.state.email && data[i].password === this.state.password) {
            localStorage.setItem("id", JSON.stringify(data[i].id));
            localStorage.setItem("email", JSON.stringify(data[i].email));
            localStorage.setItem("name", JSON.stringify(data[i].name));     
            this.setState({error: ""});
            this.props.restart();
            break;
          } else {
            this.setState({error: "Невірно введені данні"});
          }
        }
    })
  }

  render() {
    return (
      <div>
        { localStorage.getItem("token") ? <Redirect to="/products" /> : null }
        <div className="container">
          <div className="sign-in-form">
            <h2>Sing in</h2>
            {/* <form onSubmit={this.handleSubmit}> */}
              <p><TextField type="email" id="outlined-basic" label="email" variant="outlined" value={this.state.email} onChange={this.setEmail} /></p>
              <TextField type="password" id="outlined-basic" label="password" variant="outlined" value={this.state.password} onChange={this.setPassword} />
              <p style={{ color: 'red', fontSize: '12px' }}>{this.state.error}</p>
              <button className="singInBtn" onClick={this.login}>Login</button>
            {/* </form> */} 
          </div>
        </div>
      </div>
    );
  }
}

export default SingIn
