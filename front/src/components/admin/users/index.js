import { Component } from "react";

import Url from "../../../mixins/apiUrl";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
                <h2>Users</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell style={{ "font-weight": "bold" }}>Id</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Name</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Surname</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Email</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Password</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Number phone</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {   
                            this.state.users.map(user => 
                                <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell align="center">{user.name}</TableCell>
                                    <TableCell align="center">{user.surname}</TableCell>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">{user.password}</TableCell>
                                    <TableCell align="center">{user.number_phone}</TableCell>
                                </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <h3>Add user</h3>
                <p><TextField placeholder="name" value={this.state.addName} onChange={this.setAddName} /></p>
                <p><TextField placeholder="surname" value={this.state.addSurname} onChange={this.setAddSurname} /></p>
                <p><TextField placeholder="email" value={this.state.addEmail} onChange={this.setAddEmail} /></p>
                <p><TextField placeholder="password" value={this.state.addPassword} onChange={this.setAddPassword} /></p>
                <p><TextField placeholder="number phone" value={this.state.addNumberPhone} onChange={this.setAddNumberPhone} /></p>
                <Button variant="contained" onClick={this.addUser}>Create</Button>
                <h3>Delete user</h3>
                <p><TextField placeholder="id" type="number" value={this.state.deleteId} onChange={this.setDeleteId} /></p>
                <Button variant="contained" onClick={this.deleteUser}>Delete</Button>
                <h3>Edit user</h3>
                <p><TextField placeholder="id" type="number" value={this.state.editId} onChange={this.setEditId} /></p>
                <p><TextField placeholder="name" value={this.state.editName} onChange={this.setEditName} /></p>
                <p><TextField placeholder="surname" value={this.state.editSurname} onChange={this.setEditSurname} /></p>
                <p><TextField placeholder="email" value={this.state.editEmail} onChange={this.setEditEmail} /></p>
                <p><TextField placeholder="password" value={this.state.editPassword} onChange={this.setEditPassword} /></p>
                <p><TextField placeholder="number phone" value={this.state.editNumberPhone} onChange={this.setEditNumberPhone} /></p>
                <Button variant="contained" onClick={this.editUser}>Update</Button>
            </div>
        );
    }
}

export default Users;