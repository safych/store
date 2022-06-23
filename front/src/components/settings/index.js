import { Component } from 'react';

import Url from "../../mixins/apiUrl";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      numberPhone: "",
      newPassword: "",
      oldPassword: "",
      email: "",
      update: false
    }
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

  setPassword = (event) => {
    this.setState({password: event.target.value});
  }

  setEmail = (event) => {
    this.setState({email: event.target.value});
  }

  setOldPassword = (event) => {
    this.setState({oldPassword: event.target.value});
  }

  setNewPassword = (event) => {
    this.setState({newPassword: event.target.value});
  }

  updateUserName = () => {
    fetch(Url + "updateNameSurname", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User': this.props.id,
        'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
      },
      body: JSON.stringify({ 
          name: this.state.name,
          surname: this.state.surname
      })
    });
    this.setState({ update: true });
  }

  updateUserPhone = () => {
    fetch(Url + "updateNumberPhone", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User': this.props.id,
        'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
      },
      body: JSON.stringify({ 
        number_phone: this.state.numberPhone
      })
    });
    this.setState({ update: true });
  }

  updateUserEmail = () => {
    fetch(Url + "updateEmail", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User': this.props.id,
        'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
      },
      body: JSON.stringify({ 
        email: this.state.email
      })
    });
    this.setState({ update: true });
  }

  updateUserPassword = () => {
    fetch(Url + "editPassword", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Token': localStorage.getItem("token").replace(/^"(.*)"$/, '$1'),
        'New-Password': this.state.newPassword,
        'Old-Password': this.state.oldPassword,
        'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
      }
    });
  }

  render() {
    return(
      <div>
        { this.state.update ? <Alert severity="success">Інформацію на оновлення даних надіслано</Alert> : null }
        <h1>Привіт { this.props.name } </h1>
        <p><TextField id="outlined-basic" label="Ім'я" variant="outlined" value={this.state.name} onChange={this.setName} /></p>
        <p><TextField id="outlined-basic" label="Прізвище" variant="outlined" value={this.state.surname} onChange={this.setSurname} /></p>
        <Button variant="contained" onClick={this.updateUserName}>Оновити</Button>
        <p><TextField id="outlined-basic" label="Новий номер телефону" variant="outlined" value={this.state.numberPhone} onChange={this.setNumberPhone} /></p>
        <Button variant="contained" onClick={this.updateUserPhone}>Оновити</Button>
        <p><TextField id="outlined-basic" label="Нова лектронна пошта" variant="outlined" value={this.state.email} onChange={this.setEmail} /></p>
        <Button variant="contained" onClick={this.updateUserEmail}>Оновити</Button>
        <p><TextField type="password" id="outlined-basic" label="Старий пароль" variant="outlined" value={this.state.oldPassword} onChange={this.setOldPassword} /></p>
        <p><TextField type="password" id="outlined-basic" label="Новий пароль" variant="outlined" value={this.state.newPassword} onChange={this.setNewPassword} /></p>
        <Button variant="contained" onClick={this.updateUserPassword}>Оновити</Button>
      </div>
    );
  }
}

export default Settings;
