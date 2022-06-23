import { Component } from "react";
import './style.css';

import Url from "../../../mixins/apiUrl";

import { Redirect } from "react-router-dom";
import validator from 'validator';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

class SingUp extends Component {
  constructor() {
    super();
    this.state = {
      error: "",
      name: "",
      surname: "",
      numberPhone: "",
      email: "",
      password: "",
      flag: [],
      redir: false
    };
    localStorage.setItem("enable", JSON.stringify(false));
  }

  setName = (event) => {
    this.setState({name: event.target.value});
  }

  setSurname = (event) => {
    this.setState({surname: event.target.value});
  }

  setNumberPhone = (event) => {
    this.setState({numberPhone: event.target.value});
  }

  setEmail = (event) => {
    this.setState({email: event.target.value});
  }

  setPassword = (event) => {
    this.setState({password: event.target.value});
  }

  check = () => {
    const beginWithoutDigit = /^\D.*$/;
    const withoutSpecialChars = /^[^-() /]*$/;
    const containsLetters = /^.*[a-zA-Z]+.*$/;
    
    if (this.state.name !== "" && this.state.surname !== "" && this.state.email !== "" &&
    this.state.password !== "" && this.state.numberPhone !== "") {
      if(validator.isEmail(this.state.email) && validator.isMobilePhone(this.state.numberPhone, 'uk-UA') &&
            beginWithoutDigit.test(this.state.password) && withoutSpecialChars.test(this.state.password) && 
            containsLetters.test(this.state.password) && this.state.password.length >= 8) {
              if(this.state.email !== "admin@ukr.net") {
                this.registration();
              } else {
                this.setState({ error: "Коричтувач з таким email чи номером телефона уже існує" });
              }
      } else {
        this.setState({ error: "Некоректно введено пароль, email чи номер телефону" });
      }
    } else {
      this.setState({ error: "Запоніть всі поля!!" });
    }
  }

  registration = () => {
    fetch(Url + 'users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: this.state.email, 
          password_digest: this.state.password,
          name: this.state.name, 
          surname: this.state.surname,
          number_phone: this.state.numberPhone
        })
      })
      .then(response => response.json())
        .then(data => {
          this.setState({ error: data });
        });
      if (this.state.error === "") {
        this.setState({ redir: true });
      }
  }

  render() {
    return (
      <div>
        { this.state.error ? <Alert severity="error">{this.state.error}</Alert> : null }
        { this.state.redir === true ? <Redirect to="/singin" /> : null }
        { localStorage.getItem("token") ? <Redirect to="/products" /> : null }
        <div className="container">
          <div className="sign-up-form">
            <h2>Реєстрація</h2>
              <p><TextField id="outlined-basic" label="Ім'я" variant="outlined" value={this.state.name} onChange={this.setName} /></p>
              <p><TextField id="outlined-basic" label="Прізвище" variant="outlined" value={this.state.surname} onChange={this.setSurname} /></p>
              <p><TextField id="outlined-basic" label="Ноомер телефону" variant="outlined" value={this.state.numberPhone} onChange={this.setNumberPhone} /></p>
              <p><TextField type="email" id="outlined-basic" label="Електронна пошта" variant="outlined" value={this.state.email} onChange={this.setEmail} /></p>
              <p><TextField type="password" id="outlined-basic" label="Пароль" variant="outlined" value={this.state.password} onChange={this.setPassword} /></p>
              <button className="singUpBtn" onClick={this.check}>Зареєструватися</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingUp;
