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

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            addName: "",
            deleteIdCategory: "",
            editIdCategory: "",
            editName: "",
            categories: [],
            addCategoryId: "",
            addProductId: "",
            deleteCategoryProductId: "",
            editIdCategoryProduct: "",
            editProductId: "",
            editCategoryId: "",
            categories_products: []
        };

        localStorage.setItem("enable", JSON.stringify(false));
        
        fetch(Url + 'categories', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
          })
              .then(response => response.json())
              .then(data => {
                data.forEach(input => {
                    this.setState(prevState => ({
                        categories: [...prevState.categories, input]
                    }));
                })
        })

        fetch(Url + 'categories_products', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
          })
              .then(response => response.json())
              .then(data => {
                data.forEach(input => {
                    this.setState(prevState => ({
                        categories_products: [...prevState.categories_products, input]
                    }));
                })
        })
    }

    setAddName = (event) => {
        this.setState({addName: event.target.value});
    }

    setDeleteIdCategory = (event) => {
        this.setState({deleteIdCategory: event.target.value});
    }

    setEditIdCategory = (event) => {
        this.setState({editIdCategory: event.target.value});
    }

    setEditName = (event) => {
        this.setState({editName: event.target.value});
    }

    setAddProductId = (event) => {
        this.setState({addProductId: event.target.value});
    }

    setAddCategoryId = (event) => {
        this.setState({addCategoryId: event.target.value});
    }

    setDeleteIdCategoryProduct = (event) => {
        this.setState({deleteIdCategoryProduct: event.target.value});
    }

    setEditIdCategoryProduct = (event) => {
        this.setState({editIdCategoryProduct: event.target.value});
    }

    setEditCategoryId = (event) => {
        this.setState({editIdCategoryId: event.target.value});
    }

    setEditProductId = (event) => {
        this.setState({editIdProductId: event.target.value});
    }

    addCategory = () => {
        fetch(Url + 'categories', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            },
            body: JSON.stringify({ 
                name: this.state.addName
            })
          });
        this.forceUpdate();
    }

    deleteCategory = () => {
        fetch(Url + "categories/" + this.state.deleteIdCategory, { 
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
        });
    }

    editCategory = () => {
        fetch(Url + "categories/" + this.state.editIdCategory, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            },
            body: JSON.stringify({ name: this.state.editName })
        });
    }

    render() {
        return(
            <div>
                <h2>Категорії</h2>
                <h3>Додати категорію</h3>
                <p><TextField placeholder="назва категорії" value={this.state.addName} onChange={this.setAddName} /></p>
                <Button variant="contained" onClick={this.addCategory}>Створити</Button>
                <h3>Видалити категорію</h3>
                <p><TextField placeholder="id категорії" type="number" value={this.state.deleteIdCategory} onChange={this.setDeleteIdCategory} /></p>
                <Button variant="contained" onClick={this.deleteCategory}>Видалити</Button>
                <h3>Редагувати категорію</h3>
                <p><TextField placeholder="id" type="number" value={this.state.editIdCategory} onChange={this.setEditIdCategory} /></p>
                <p><TextField placeholder="назва категорії" value={this.state.editName} onChange={this.setEditName} /></p>
                <Button variant="contained" onClick={this.editCategory}>Оновити</Button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell style={{ "font-weight": "bold" }}>ID</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Назва</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {   
                            this.state.categories.map(category => 
                                <TableRow
                                key={category.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {category.id}
                                    </TableCell>
                                    <TableCell align="center">{category.name}</TableCell>
                                </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default Categories;