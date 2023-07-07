import { Component } from "react";
import './style.css';

import { Redirect } from "react-router-dom";

import Url from "../../../mixins/apiUrl";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

class SingIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      email: "",
      password: "",
      enable: false,
      newPassword: "",
      code: ""
    };
    localStorage.setItem("enable", JSON.stringify(false));
  }

  componentDidMount () {
    const menu = document.querySelector('.menu')
    const close = document.querySelector('.close')
    const nav = document.querySelector('nav')

    menu.addEventListener('click', () => {
        nav.classList.add('open-nav')
    })

    close.addEventListener('click', () => {
        nav.classList.remove('open-nav')
    })
  }

  setEmail = (event) => {
    this.setState({email: event.target.value});
  }

  setPassword = (event) => {
    this.setState({password: event.target.value});
  }

  setCode = (event) => {
    this.setState({code: event.target.value});
  }

  setNewPassword = (event) => {
    this.setState({newPassword: event.target.value});
  }

  login = () => {
    fetch(Url + 'tokens', {
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
      if(data.access_token !== undefined) {
        localStorage.setItem("token", JSON.stringify(data.access_token));
      }
      if(localStorage.getItem("token")) {
        window.location.reload(); 
        this.props.restart();
      }
    });
    if(!localStorage.getItem("token")) {
      this.setState({ error: "Некоректно ввдено емейл чи пароль!" })
    }
  }

  reset = () => {
    fetch(Url + 'resetPassword', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Email': this.state.email
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ enable: data });
    });
  }

  resetPassword = () => {
    fetch(Url + 'resetUpdatePassword', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Recovery-Code': this.state.code,
        'New-Password': this.state.newPassword,
        'Email': this.state.email
      }
    })
    window.location.reload(); 
    this.props.restart();
  }

  render() {
    return (
      <div>
        { this.state.error ? <Alert severity="error">{this.state.error}</Alert> : null }
        { localStorage.getItem("token") ? <Redirect to="/products" /> : null }
        <div className="container">
          <div className="sign-in-form">
            <h2>Авторизація</h2>
            <p><TextField type="email" id="outlined-basic" label="елетронна пошта" variant="outlined" value={this.state.email} onChange={this.setEmail} /></p>
            <TextField type="password" id="outlined-basic" label="пароль" variant="outlined" value={this.state.password} onChange={this.setPassword} />
            <button className="singInBtn" onClick={this.login}>Авторизуватись</button>
            <Button size="small" variant="outlined" onClick={this.reset}>Скидання паролю</Button>
          </div>
        {
          this.state.enable === true ?
          <div className="reset-password">
              <h3>Відновлення паролю</h3>
              <p><TextField id="outlined-basic" label="код" variant="outlined" value={this.state.code} onChange={this.setCode} /></p>
              <p><TextField type="password" id="outlined-basic" label="новий пароль" variant="outlined" value={this.state.newPassword} onChange={this.setNewPassword} /></p>
              <Button size="small" variant="contained" onClick={this.resetPassword}>Оновити</Button>
          </div>
          :
          null
        }
        </div>
      </div>
    );
  }
}

export default SingIn
