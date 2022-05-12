import { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

// import { Redirect } from "react-router-dom";
import Categories from "./categories";
import Users from "./users";
import Products from "./products";
import Carts from "./carts";

import Url from "../../mixins/apiUrl";

class Admin extends Component {
    constructor() {
      super();
      this.state = {
        category: ""
      }
    }

    setCategory = (event) => {
        this.setState({category: event.target.value});
    }

    addCategory = () => {
        fetch(Url + 'categories', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: this.state.category
            })
          });
    }

    render() {
        return (
            <Router>
            <div>
                <h1>Admin page. Hello { localStorage.getItem("name").replace(/^"(.*)"$/, '$1') }</h1>
                <div>
                    <Link style={{ color: 'black' }} to="/users">Users</Link>
                    <Link style={{ color: 'black' }} to="/products">Products</Link>
                    <Link style={{ color: 'black' }} to="/categories">Categories</Link>
                    <Link style={{ color: 'black' }} to="/carts">Carts</Link>
                </div>
                <h2>Add category</h2>
                <p><input placeholder="email" value={this.state.category} onChange={this.setCategory} /></p>
                <button type="submit" onClick={this.addCategory}>Add</button>
                <h2>Add product</h2>

                <p>All carts</p>
                
                <p>All users</p>
                <Switch>
                    <Route path="/products" component={Products} />
                    <Route path="/users" component={Users} />
                    <Route path="/categories" component={Categories} />
                    <Route path="/carts" component={Carts} />
                </Switch>
            </div>
            </Router>
        );
    }
}

export default Admin;