import { Component } from "react";

import Url from "../../../mixins/apiUrl";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            addName: "",
            addSurname: "",
            addEmail: "",
            addPassword: "",
            addNumberPhone: "",
            deleteId: "",
            editId: "",
            editName: "",
            editSurname: "",
            editEmail: "",
            editPassword: "",
            editNumberPhone: "",
            searchByPhone: "",
            searchById: "",
            searchByEmail: "",
            findUser: []
        };

        localStorage.setItem("enable", JSON.stringify(false));
    }

    addUser = () => {
        fetch(Url + 'users', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: this.state.addName,
                surname: this.state.addSurname,
                email: this.state.addEmail,
                password: this.state.addPassword,
                number_phone: this.state.addNumberPhone
            })
          });
        this.forceUpdate();
    }

    deleteUser = () => {
        fetch(Url + "users/" + this.state.deleteId, { 
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
        });
    }

    editUser = () => {
        fetch(Url + "users/" + this.state.editId, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            },
            body: JSON.stringify({ 
                name: this.state.editName,
                surname: this.state.editSurname,
                email: this.state.editEmail,
                password_digest: this.state.editPassword,
                number_phone: this.state.editNumberPhone
            })
        });
    }

    setAddName = (event) => {
        this.setState({addName: event.target.value});
    }

    setAddSurname = (event) => {
        this.setState({addSurname: event.target.value});
    }

    setAddEmail = (event) => {
        this.setState({addEmail: event.target.value});
    }

    setAddPassword = (event) => {
        this.setState({addPassword: event.target.value});
    }

    setAddNumberPhone = (event) => {
        this.setState({addNumberPhone: event.target.value});
    }

    setDeleteId = (event) => {
        this.setState({deleteId: event.target.value});
    }

    setEditId = (event) => {
        this.setState({editId: event.target.value});
    }

    setEditName = (event) => {
        this.setState({editName: event.target.value});
    }

    setEditSurname = (event) => {
        this.setState({editSurname: event.target.value});
    }

    setEditEmail = (event) => {
        this.setState({editEmail: event.target.value});
    }

    setEditPassword = (event) => {
        this.setState({editPassword: event.target.value});
    }

    setEditNumberPhone = (event) => {
        this.setState({editNumberPhone: event.target.value});
    }

    setSearchByPhone = (event) => {
        this.setState({searchByPhone: event.target.value});
    }

    setSearchByEmail = (event) => {
        this.setState({searchByEmail: event.target.value});
    }

    setSearchById = (event) => {
        this.setState({searchById: event.target.value});
    }

    searchPhone = () => {
        fetch(Url + 'searchUserByPhone', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Phone': this.state.searchByPhone,
                'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
          })
              .then(response => response.json())
              .then(data => {
                this.setState({ findUser: data });
        })
    }

    searchEmail = () => {
        fetch(Url + 'searchUserByEmail', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Email': this.state.searchByEmail,
                'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
          })
              .then(response => response.json())
              .then(data => {
                this.setState({ findUser: data });
        })
    }

    searchId = () => {
        fetch(Url + 'users/' + this.state.searchById, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
        })
        .then(response => response.json())
              .then(data => {
                this.setState({ findUser: data });
        })
    }

    render() {
        return(
            <div>
                <h2>Користувачі</h2>
                {
                    Object.keys(this.state.findUser).length === 0 ?
                        null
                    :
                        <ul>
                            <li>Ім'я: {this.state.findUser.name}</li>
                            <li>Прізвище: {this.state.findUser.surname}</li>
                            <li>Електронна пошта: {this.state.findUser.email}</li>
                            <li>Пароль: {this.state.findUser.password_digest}</li>
                            <li>Номер телефону: {this.state.findUser.number_phone}</li>
                        </ul>
                }
                <p>Пошук за ID</p>
                <p><TextField placeholder="ID" value={this.state.searchById} onChange={this.setSearchById} /></p>
                <Button variant="contained" onClick={this.searchId}>Пошук</Button>
                <p>Пошук за номером телефону</p>
                <p><TextField placeholder="номер телефону" value={this.state.searchByPhone} onChange={this.setSearchByPhone} /></p>
                <Button variant="contained" onClick={this.searchPhone}>Пошук</Button>
                <p>Пошук за електронною поштою</p>
                <p><TextField placeholder="електронна пошта" value={this.state.searchByEmail} onChange={this.setSearchByEmail} /></p>
                <Button variant="contained" onClick={this.searchEmail}>Пошук</Button>
                <h3>Додати користувача</h3>
                <p><TextField placeholder="Ім'я" value={this.state.addName} onChange={this.setAddName} /></p>
                <p><TextField placeholder="Прізвище" value={this.state.addSurname} onChange={this.setAddSurname} /></p>
                <p><TextField placeholder="Електронна пошта" value={this.state.addEmail} onChange={this.setAddEmail} /></p>
                <p><TextField placeholder="Пароль" value={this.state.addPassword} onChange={this.setAddPassword} /></p>
                <p><TextField placeholder="Номер телефону" value={this.state.addNumberPhone} onChange={this.setAddNumberPhone} /></p>
                <Button variant="contained" onClick={this.addUser}>Створити</Button>
                <h3>Видалити користувача</h3>
                <p><TextField placeholder="ID" type="number" value={this.state.deleteId} onChange={this.setDeleteId} /></p>
                <Button variant="contained" onClick={this.deleteUser}>Видалити</Button>
                <h3>Редагувати користувача</h3>
                <p><TextField placeholder="ID" type="number" value={this.state.editId} onChange={this.setEditId} /></p>
                <p><TextField placeholder="Ім'я" value={this.state.editName} onChange={this.setEditName} /></p>
                <p><TextField placeholder="Прізвище" value={this.state.editSurname} onChange={this.setEditSurname} /></p>
                <p><TextField placeholder="Електронна пошта" value={this.state.editEmail} onChange={this.setEditEmail} /></p>
                <p><TextField placeholder="Пароль" value={this.state.editPassword} onChange={this.setEditPassword} /></p>
                <p><TextField placeholder="Номер телефону" value={this.state.editNumberPhone} onChange={this.setEditNumberPhone} /></p>
                <Button variant="contained" onClick={this.editUser}>Оновити</Button>
            </div>
        );
    }
}

export default Users;