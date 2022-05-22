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

class Carts extends Component {
    constructor() {
        super();
        this.state = {
            addUserId: "",
            addProductId: "",
            addItemsCount: "",
            deleteId: "",
            editId: "",
            editUserId: "",
            editProductId: "",
            editItemsCount: "",
            carts: []
        };

        fetch(Url + 'cart_items', {
            method: 'GET',
          })
              .then(response => response.json())
              .then(data => {
                data.forEach(input => {
                    this.setState(prevState => ({
                        carts: [...prevState.carts, input]
                    }));
                })
        })
    }

    setAddUserId = (event) => {
        this.setState({addUserId: event.target.value});
    }

    setAddProductId = (event) => {
        this.setState({addProductId: event.target.value});
    }

    setAddItemsCount = (event) => {
        this.setState({addItemsCount: event.target.value});
    }

    setDeleteId = (event) => {
        this.setState({deleteId: event.target.value});
    }

    setEditId = (event) => {
        this.setState({editId: event.target.value});
    }

    setEditUserId = (event) => {
        this.setState({editUserId: event.target.value});
    }

    setEditProductId = (event) => {
        this.setState({editProductId: event.target.value});
    }

    setEditItemsCount = (event) => {
        this.setState({editItemsCount: event.target.value});
    }

    addCart = () => {
        fetch(Url + 'cart_items', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                user_id: this.state.addUserId,
                product_id: this.state.addProductId,
                items_count: this.state.addItemsCount
            })
          });
        this.forceUpdate();
    }

    deleteCart = () => {
        fetch(Url + "cart_items/" + this.state.deleteId, { method: 'DELETE' });
    }

    editCart = () => {
        fetch(Url + "cart_items/" + this.state.editId, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                user_id: this.state.editUserId,
                product_id: this.state.editProductId,
                items_count: this.state.editItemsCount
            })
        });
    }

    render() {
        return(
            <div>
                <h2>Carts</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell style={{ "font-weight": "bold" }}>Id</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>User id</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Product id</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Items count</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {   
                            this.state.carts.map(cart => 
                                <TableRow
                                key={cart.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {cart.id}
                                    </TableCell>
                                    <TableCell align="center">{cart.user_id}</TableCell>
                                    <TableCell align="center">{cart.product_id}</TableCell>
                                    <TableCell align="center">{cart.items_count}</TableCell>
                                </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <h3>Add cart</h3>
                <p><TextField id="outlined-basic" label="user id" variant="outlined" value={this.state.addUserId} onChange={this.setAddUserId} /></p>
                <p><TextField placeholder="product id" value={this.state.addProductId} onChange={this.setAddProductId} /></p>
                <p><TextField placeholder="items count" value={this.state.addItemsCount} onChange={this.setAddItemsCount} /></p>
                <Button variant="contained" onClick={this.addCart}>Add</Button>
                <h3>Delete cart</h3>
                <p><TextField placeholder="id" type="number" value={this.state.deleteId} onChange={this.setDeleteId} /></p>
                <Button variant="contained" onClick={this.deleteCart}>Delete</Button>
                <h3>Edit cart</h3>
                <p><TextField placeholder="id" type="number" value={this.state.editId} onChange={this.setEditId} /></p>
                <p><TextField placeholder="user id" value={this.state.addUserId} onChange={this.setAddUserId} /></p>
                <p><TextField placeholder="product id" value={this.state.addProductId} onChange={this.setAddProductId} /></p>
                <p><TextField placeholder="items count" value={this.state.addItemsCount} onChange={this.setAddItemsCount} /></p>
                <Button variant="contained" onClick={this.editCart}>Add</Button>
            </div>
        );
    }
}

export default Carts;