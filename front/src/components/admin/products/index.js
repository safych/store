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

class Products extends Component {
    constructor() {
        super();
        this.state = {
            addName: "",
            addDescription: "",
            addSize: "",
            addItemsLeft: "",
            addPrice: "",
            deleteId: "",
            editId: "",
            editName: "",
            editDescription: "",
            editSize: "",
            editItemsLeft: "",
            editPrice: "",
            products: []
        };

        fetch(Url + 'products', {
            method: 'GET',
          })
              .then(response => response.json())
              .then(data => {
                data.forEach(input => {
                    this.setState(prevState => ({
                      products: [...prevState.products, input]
                    }));
                })
        })
    }

    setAddName = (event) => {
        this.setState({addName: event.target.value});
    }

    setAddDescription = (event) => {
        this.setState({addDescription: event.target.value});
    }

    setAddSize = (event) => {
        this.setState({addSize: event.target.value});
    }

    setAddItemsLeft = (event) => {
        this.setState({addItemsLeft: event.target.value});
    }

    setAddPrice = (event) => {
        this.setState({addPrice: event.target.value});
    }

    setDeleteId = (event) => {
        this.setState({deleteId: event.target.value});
    }

    setEditId = (event) => {
        this.setState({editId: event.target.value});
    }

    setEditName = (event) => {
        this.setState({editId: event.target.value});
    }

    setEditDescription = (event) => {
        this.setState({editDescription: event.target.value});
    }

    setEditSize = (event) => {
        this.setState({editSize: event.target.value});
    }

    setEditItemsLeft = (event) => {
        this.setState({editItemsLeft: event.target.value});
    }

    setEditPrice = (event) => {
        this.setState({editPrice: event.target.value});
    }

    addProduct = () => {
        fetch(Url + 'products', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: this.state.addName,
                description: this.state.addDescription,
                size: this.state.addSize,
                items_left: this.state.addItemsLeft,
                price: this.state.addPrice
            })
          });
        this.forceUpdate();
    }

    deleteProduct = () => {
        fetch(Url + "products/" + this.state.deleteId, { method: 'DELETE' });
    }

    editProduct = () => {
        fetch(Url + "products/" + this.state.editId, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: this.state.editName,
                description: this.state.editDescription,
                size: this.state.editSize,
                items_left: this.state.editItemsLeft,
                price: this.state.editPrice
            })
        });
    }

    render() {
        return(
            <div>
                <h2>Products</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell style={{ "font-weight": "bold" }}>Id</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Name</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Description</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Size</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Items left</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Price</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {   
                            this.state.products.map(product => 
                                <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {product.id}
                                    </TableCell>
                                    <TableCell align="center">{product.name}</TableCell>
                                    <TableCell align="center">{product.description}</TableCell>
                                    <TableCell align="center">{product.size}</TableCell>
                                    <TableCell align="center">{product.items_left}</TableCell>
                                    <TableCell align="center">{product.price}</TableCell>
                                </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <h3>Add product</h3>
                <p><TextField placeholder="name" value={this.state.addName} onChange={this.setAddName} /></p>
                <p><TextField placeholder="description" value={this.state.addDescription} onChange={this.setAddDescription} /></p>
                <p><TextField placeholder="size" value={this.state.addSize} onChange={this.setAddSize} /></p>
                <p><TextField placeholder="items left" type="number" value={this.state.addItemsLeft} onChange={this.setAddItemsLeft} /></p>
                <p><TextField placeholder="price" type="number" value={this.state.addPrice} onChange={this.setAddPrice} /></p>
                <Button variant="contained" onClick={this.addProduct}>Create</Button>
                <h3>Delete product</h3>
                <p><TextField placeholder="id" type="number" value={this.state.deleteId} onChange={this.setDeleteId} /></p>
                <Button variant="contained" onClick={this.deleteProduct}>Delete</Button>
                <h3>Edit product</h3>
                <p><TextField placeholder="id" type="number" value={this.state.editId} onChange={this.setEditId} /></p>
                <p><TextField placeholder="name" value={this.state.editName} onChange={this.setEditName} /></p>
                <p><TextField placeholder="description" value={this.state.editDescription} onChange={this.setEditDescription} /></p>
                <p><TextField placeholder="size" value={this.state.editSize} onChange={this.setEditSize} /></p>
                <p><TextField placeholder="items left" type="number" value={this.state.editItemsLeft} onChange={this.setEditItemsLeft} /></p>
                <p><TextField placeholder="price" type="number" value={this.state.editPrice} onChange={this.setEditPrice} /></p>
                <Button variant="contained" onClick={this.editProduct}>Update</Button>
            </div>
        );
    }
}

export default Products;