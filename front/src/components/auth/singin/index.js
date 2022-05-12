import { Component } from "react";
import './style.css';

import { Redirect } from "react-router-dom";

import Url from "../../../mixins/apiUrl";

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
    fetch(Url + 'admins', {
      method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].email === this.state.email && data[i].password === this.state.password) {
            localStorage.setItem("id", JSON.stringify(data[i].id));
            localStorage.setItem("email", JSON.stringify(data[i].email));
            localStorage.setItem("password", JSON.stringify(data[i].password));      
            localStorage.setItem("name", JSON.stringify(data[i].name)); 
            this.setState({error: ""});
            this.props.restart();
            break;
          } else {
            this.loginUser();
          }
        }
    })
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
            localStorage.setItem("password", JSON.stringify(data[i].password));      
            localStorage.setItem("number_phone", JSON.stringify(data[i].number_phone));  
            localStorage.setItem("name", JSON.stringify(data[i].name)); 
            localStorage.setItem("surname", JSON.stringify(data[i].surname));
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
        { localStorage.getItem("email") ? <Redirect to="/product" /> : null }
        <div class="container">
          <div class="sign-in-form">
            <h2>Sing in</h2>
            {/* <form onSubmit={this.handleSubmit}> */}
              <p><input placeholder="email" value={this.state.email} onChange={this.setEmail} /></p>
              <input placeholder="password" value={this.state.password} onChange={this.setPassword} />
              <p style={{ color: 'red', fontSize: '12px' }}>{this.state.error}</p>
              <button type="submit" onClick={this.login}>Login</button>
            {/* </form> */} 
          </div>
        </div>
      </div>
    );
  }
}

export default SingIn
