import { Component } from "react";

import Url from "../../../mixins/apiUrl";

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
                <h1>Products</h1>
                <table border="1" className="content-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Size</th>
                            <th>Items left</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                        this.state.products.map(product => 
                        <tr>
                            <td>{product.id}</td><td>{product.name}</td>
                            <td>{product.description}</td><td>{product.size}</td>
                            <td>{product.items_left}</td><td>{product.price}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <h2>Add product</h2>
                <p><input placeholder="name" value={this.state.addName} onChange={this.setAddName} /></p>
                <p><input placeholder="description" value={this.state.addDescription} onChange={this.setAddDescription} /></p>
                <p><input placeholder="size" value={this.state.addSize} onChange={this.setAddSize} /></p>
                <p><input placeholder="items left" type="number" value={this.state.addItemsLeft} onChange={this.setAddItemsLeft} /></p>
                <p><input placeholder="price" type="number" value={this.state.addPrice} onChange={this.setAddPrice} /></p>
                <button type="submit" onClick={this.addProduct}>Create</button>
                <h2>Delete product</h2>
                <p><input placeholder="id" value={this.state.deleteId} onChange={this.setDeleteId} /></p>
                <button type="submit" onClick={this.deleteProduct}>Delete</button>
                <h2>Edit product</h2>
                <p><input placeholder="id" value={this.state.editId} onChange={this.setEditId} /></p>
                <p><input placeholder="name" value={this.state.editName} onChange={this.setEditName} /></p>
                <p><input placeholder="description" value={this.state.editDescription} onChange={this.setEditDescription} /></p>
                <p><input placeholder="size" value={this.state.editSize} onChange={this.setEditSize} /></p>
                <p><input placeholder="items left" type="number" value={this.state.editItemsLeft} onChange={this.setEditItemsLeft} /></p>
                <p><input placeholder="price" type="number" value={this.state.editPrice} onChange={this.setEditPrice} /></p>
                <button type="submit" onClick={this.editProduct}>Update</button>
            </div>
        );
    }
}

export default Products;