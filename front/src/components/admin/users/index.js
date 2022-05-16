import { Component } from "react";

import Url from "../../../mixins/apiUrl";

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
            users: []
        };

        fetch(Url + 'users', {
            method: 'GET',
          })
              .then(response => response.json())
              .then(data => {
                data.forEach(input => {
                   this.setState(prevState => ({
                     users: [...prevState.users, input]
                   }));
                })
        })
    }

    addUser = () => {
        fetch(Url + 'users', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
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
        fetch(Url + "users/" + this.state.deleteId, { method: 'DELETE' });
    }

    editUser = () => {
        fetch(Url + "users/" + this.state.editId, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: this.state.editName,
                surname: this.state.editSurname,
                email: this.state.editEmail,
                password: this.state.editPassword,
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

    render() {
        return(
            <div>
                <h1>Users</h1>
                <table border="1" className="content-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Number phone</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                        this.state.users.map(user => 
                        <tr>
                            <td>{user.id}</td><td>{user.name}</td>
                            <td>{user.surname}</td><td>{user.email}</td>
                            <td>{user.password}</td><td>{user.number_phone}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <h2>Add user</h2>
                <p><input placeholder="name" value={this.state.addName} onChange={this.setAddName} /></p>
                <p><input placeholder="surname" value={this.state.addSurname} onChange={this.setAddSurname} /></p>
                <p><input placeholder="email" value={this.state.addEmail} onChange={this.setAddEmail} /></p>
                <p><input placeholder="password" value={this.state.addPassword} onChange={this.setAddPassword} /></p>
                <p><input placeholder="number phone" value={this.state.addNumberPhone} onChange={this.setAddNumberPhone} /></p>
                <button type="submit" onClick={this.addUser}>Add</button>
                <h2>Delete user</h2>
                <p><input placeholder="id" value={this.state.deleteId} onChange={this.setDeleteId} /></p>
                <button type="submit" onClick={this.deleteUser}>Delete</button>
                <h2>Edit user</h2>
                <p><input placeholder="id" value={this.state.editId} onChange={this.setEditId} /></p>
                <p><input placeholder="name" value={this.state.editName} onChange={this.setEditName} /></p>
                <p><input placeholder="surname" value={this.state.editSurname} onChange={this.setEditSurname} /></p>
                <p><input placeholder="email" value={this.state.editEmail} onChange={this.setEditEmail} /></p>
                <p><input placeholder="password" value={this.state.editPassword} onChange={this.setEditPassword} /></p>
                <p><input placeholder="number phone" value={this.state.editNumberPhone} onChange={this.setEditNumberPhone} /></p>
                <button type="submit" onClick={this.editUser}>Update</button>
            </div>
        );
    }
}

export default Users;