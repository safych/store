import { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Categories from "./categories";
import Users from "./users";
import Products from "./products";
import Carts from "./carts";

import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckroomIcon from '@mui/icons-material/Checkroom';

import "./style.css";

class Admin extends Component {
    constructor(props) {
        super();
    }
    
    render() {
        return (
            <Router>
            <div>
                <h1>Admin page. Hello { this.props.name }</h1>
                <div className="header">
                    <ul className="mnu_top">
                        <li>
                            <Link to="/users">
                                <PeopleIcon />
                            </Link>
                        </li>
                        <li>
                            <Link to="/products">
                                <CheckroomIcon />
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories">
                                <CategoryIcon />
                            </Link>
                        </li>
                        <li>
                            <Link to="/carts">
                                <ShoppingCartIcon /> 
                            </Link>
                        </li>
                    </ul>  
                </div>

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