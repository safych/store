import { Component } from "react";

import Url from "../../../mixins/apiUrl";

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
                <h1>Carts</h1>
                <table border="1" className="content-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User id</th>
                            <th>Product id</th>
                            <th>Items count</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                        this.state.carts.map(cart => 
                        <tr>
                            <td>{cart.id}</td><td>{cart.user_id}</td>
                            <td>{cart.product_id}</td><td>{cart.items_count}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <h2>Add cart</h2>
                <p><input placeholder="user id" value={this.state.addUserId} onChange={this.setAddUserId} /></p>
                <p><input placeholder="product id" value={this.state.addProductId} onChange={this.setAddProductId} /></p>
                <p><input placeholder="items count" value={this.state.addItemsCount} onChange={this.setAddItemsCount} /></p>
                <button type="submit" onClick={this.addCart}>Add</button>
                <h2>Delete cart</h2>
                <p><input placeholder="id" value={this.state.deleteId} onChange={this.setDeleteId} /></p>
                <button type="submit" onClick={this.deleteCart}>Delete</button>
                <h2>Edit cart</h2>
                <p><input placeholder="id" value={this.state.editId} onChange={this.setEditId} /></p>
                <p><input placeholder="user id" value={this.state.addUserId} onChange={this.setAddUserId} /></p>
                <p><input placeholder="product id" value={this.state.addProductId} onChange={this.setAddProductId} /></p>
                <p><input placeholder="items count" value={this.state.addItemsCount} onChange={this.setAddItemsCount} /></p>
                <button type="submit" onClick={this.editCart}>Add</button>
            </div>
        );
    }
}

export default Carts;