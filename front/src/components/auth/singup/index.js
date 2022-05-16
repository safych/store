import { Component } from "react";
import './style.css';

import Url from "../../../mixins/apiUrl";

import { Redirect } from "react-router-dom";
import validator from 'validator';

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

    fetch(Url + 'users', {
      method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
           for (var i = 0; i < data.length; i++) {  
              if (data[i].email === this.state.email || data[i].number_phone === this.state.numberPhone) {
                this.state.flag.push('new value');
                this.setState({ error: "Коричтувач з таким email чи номером телефона уже існує" });
              }
           }
        })
    
    if (!this.state.flag.length) {
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
  }

  registration = () => {
    fetch(Url + 'users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            name: this.state.name, 
            surname: this.state.surname, 
            email: this.state.email, 
            password: this.state.password, 
            number_phone: this.state.numberPhone
        })
      });
      this.setState({ redir: true });
  }

  render() {
    return (
      <div>
        { this.state.redir === true ? <Redirect to="/singin" /> : null }
        <div className="container">
          <div className="sign-up-form">
            <h2>Sing up</h2>
              <input placeholder="name" value={this.state.name} onChange={this.setName} />
              <input placeholder="surname" value={this.state.surname} onChange={this.setSurname} />
              <input placeholder="number phone" value={this.state.numberPhone} onChange={this.setNumberPhone} />
              <input placeholder="email" value={this.state.email} onChange={this.setEmail} />
              <input placeholder="password" value={this.state.password} onChange={this.setPassword} />
              <p style={{ color: 'red', fontSize: '10px' }}>{this.state.error}</p>
              <button className="singUpBtn" onClick={this.check}>Register</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingUp;
