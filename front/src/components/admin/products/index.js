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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

class Products extends Component {
    constructor() {
        super();
        this.state = {
            addName: "",
            addSize: "",
            addItemsLeft: "",
            addPrice: "",
            addCategory: "",
            addImage: "",
            deleteId: "",
            editId: "",
            editName: "",
            editSize: "",
            editItemsLeft: "",
            editPrice: "",
            editImage: "",
            products: [],
            categories: []
        };

        localStorage.setItem("enable", JSON.stringify(false));

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

        fetch(Url + 'categories', {
            method: 'GET',
          })
              .then(response => response.json())
              .then(data => {
                data.forEach(input => {
                    this.setState(prevState => ({
                        categories: [...prevState.categories, input]
                    }));
                })
        })
    }

    setAddName = (event) => {
        this.setState({addName: event.target.value});
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

    setAddCategory = (event) => {
        this.setState({addCategory: event.target.value});
    }

    setAddImage = (event) => {
        this.setState({addImage: event.target.value});
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

    setEditSize = (event) => {
        this.setState({editSize: event.target.value});
    }

    setEditItemsLeft = (event) => {
        this.setState({editItemsLeft: event.target.value});
    }

    setEditPrice = (event) => {
        this.setState({editPrice: event.target.value});
    }

    setEditImage = (event) => {
        this.setState({editImage: event.target.value});
    }

    addProduct = () => {
        fetch(Url + 'products', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Category': this.state.addCategory,
              'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            },
            body: JSON.stringify({ 
                name: this.state.addName,
                size: this.state.addSize,
                items_left: this.state.addItemsLeft,
                price: this.state.addPrice,
                image: this.state.addImage.slice(12)
            })
        });
    }

    deleteProduct = () => {
        fetch(Url + "products/" + this.state.deleteId, { method: 'DELETE' });

        fetch(Url + 'categories_products', {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Product-ID': this.state.deleteId,
              'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
        });
    }

    editProduct = () => {
        fetch(Url + "products/" + this.state.editId, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            },
            body: JSON.stringify({ 
                name: this.state.editName,
                size: this.state.editSize,
                items_left: this.state.editItemsLeft,
                price: this.state.editPrice,
                image: this.state.editImage
            })
        });
    }

    render() {
        return(
            <div>
                <h2>Товари:</h2>
                <h3>Додати товар</h3>
                <p><TextField placeholder="назва товару" value={this.state.addName} onChange={this.setAddName} /></p>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Розмір</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={this.state.addSize}
                    onChange={this.setAddSize}
                    autoWidth
                    label="Size"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"S"}>S</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"L"}>L</MenuItem>
                    <MenuItem value={"XL"}>XL</MenuItem>
                    <MenuItem value={"XXL"}>XXL</MenuItem>
                    </Select>
                </FormControl>
                <p><TextField placeholder="кількість" type="number" value={this.state.addItemsLeft} onChange={this.setAddItemsLeft} /></p>
                <p><TextField placeholder="Ціна" type="number" value={this.state.addPrice} onChange={this.setAddPrice} /></p>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Категорія</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={this.state.addCategory}
                    onChange={this.setAddCategory}
                    autoWidth
                    label="Category"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        this.state.categories.map(category => 
                            <MenuItem value={category.id}>{category.name}</MenuItem>
                    )}
                    </Select>
                </FormControl>
                <p></p>
                <Button
                variant="contained"
                component="label"
                >
                Завантажити фото
                <input
                    type="file"
                    value={this.state.addImage}
                    onChange={this.setAddImage}
                    hidden
                />
                </Button>
                <p><Button variant="contained" onClick={this.addProduct}>Створити</Button></p>
                <h3>Видалити товар</h3>
                <p><TextField placeholder="ID товару" type="number" value={this.state.deleteId} onChange={this.setDeleteId} /></p>
                <Button variant="contained" onClick={this.deleteProduct}>Видалити</Button>
                <h3>Редагувати товар</h3>
                <p><TextField placeholder="ID товару" type="number" value={this.state.editId} onChange={this.setEditId} /></p>
                <p><TextField placeholder="Назва" value={this.state.editName} onChange={this.setEditName} /></p>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Розмір</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={this.state.editSize}
                    onChange={this.setEditSize}
                    autoWidth
                    label="Size"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"S"}>S</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"L"}>L</MenuItem>
                    <MenuItem value={"XL"}>XL</MenuItem>
                    <MenuItem value={"XXL"}>XXL</MenuItem>
                    </Select>
                </FormControl>
                <p><TextField placeholder="Кількість" type="number" value={this.state.editItemsLeft} onChange={this.setEditItemsLeft} /></p>
                <p><TextField placeholder="Ціна" type="number" value={this.state.editPrice} onChange={this.setEditPrice} /></p>
                <Button
                variant="contained"
                component="label"
                >
                Завантажити фото
                <input
                    type="file"
                    value={this.state.editImage}
                    onChange={this.setAddImage}
                    hidden
                />
                </Button>
                <p><Button variant="contained" onClick={this.editProduct}>Оновити</Button></p>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell style={{ "font-weight": "bold" }}>ID</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Назва</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Розмір</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Кількість</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Ціна</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Фото</TableCell>
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
                                    <TableCell align="center">{product.size}</TableCell>
                                    <TableCell align="center">{product.items_left}</TableCell>
                                    <TableCell align="center">{product.price}₴</TableCell>
                                    <TableCell align="center">
                                        <img style={{ width: '100px' }} src={require('../../images/' + product.image)} alt="Girl in a jacket"/>
                                    </TableCell>
                                </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default Products;