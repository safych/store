import { Component } from "react";

import Url from "../../../mixins/apiUrl";

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

        fetch(Url + 'categories_products', {
            method: 'GET',
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
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: this.state.addName
            })
          });
        this.forceUpdate();
    }

    deleteCategory = () => {
        fetch(Url + "categories/" + this.state.deleteIdCategory, { method: 'DELETE' });
    }

    editCategory = () => {
        fetch(Url + "categories/" + this.state.editIdCategory, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: this.state.editName })
        });
    }

    render() {
        return(
            <div>
                <h1>Categories</h1>
                <table border="1" className="content-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                        this.state.categories.map(category => 
                        <tr>
                            <td>{category.id}</td><td>{category.name}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <h2>Add category</h2>
                <p><input placeholder="category" value={this.state.addName} onChange={this.setAddName} /></p>
                <button type="submit" onClick={this.addCategory}>Add</button>
                <h2>Delete category</h2>
                <p><input placeholder="id" value={this.state.deleteIdCategory} onChange={this.setDeleteIdCategory} /></p>
                <button type="submit" onClick={this.deleteCategory}>Delete</button>
                <h2>Edit category</h2>
                <p><input placeholder="id" value={this.state.editIdCategory} onChange={this.setEditIdCategory} /></p>
                <p><input placeholder="name" value={this.state.editName} onChange={this.setEditName} /></p>
                <p><button type="submit" onClick={this.editCategory}>Update</button></p>
                <table border="1" className="content-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product id</th>
                            <th>Category id</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                        this.state.categories_products.map(category_product => 
                        <tr>
                            <td>{category_product.id}</td><td>{category_product.product_id}</td>
                            <td>{category_product.category_id}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <h2>Add category to product</h2>
                <p><input placeholder="product id" value={this.state.addProductId} onChange={this.setAddProductId} /></p>
                <p><input placeholder="category id" value={this.state.addCategoryId} onChange={this.setAddCategoryId} /></p>
                <button type="submit" onClick={this.addCategoryProduct}>Add</button>
                <h2>Delete category for product</h2>
                <p><input placeholder="id" value={this.state.deleteIdCategoryProduct} onChange={this.setDeleteIdCategoryProduct} /></p>
                <button type="submit" onClick={this.deleteCategoryProduct}>Delete</button>
                <h2>Edit category for product</h2>
                <p><input placeholder="id" value={this.state.editIdCategoryProduct} onChange={this.setEditIdCategoryProduct} /></p>
                <p><input placeholder="product id" value={this.state.editProductId} onChange={this.setEditProductId} /></p>
                <p><input placeholder="category id" value={this.state.editCategoryId} onChange={this.setEditCategoryId} /></p>
                <button type="submit" onClick={this.editCategoryProduct}>Update</button>
            </div>
        );
    }
}

export default Categories;