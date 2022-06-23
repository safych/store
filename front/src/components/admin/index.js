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
import Orders from "./orders";

import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import Url from "../../mixins/apiUrl";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import "./style.css";

class Admin extends Component {
    constructor(props) {
        super();
        this.state = {
            price: null
        }

        localStorage.setItem("enable", JSON.stringify(false));

        fetch(Url + 'balance', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
              }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ price: data })
            }
        )
    }
    
    render() {
        return (
            <Router>
            <div>
                <h1>Адмін сторінка. Привіт { this.props.name }</h1>
                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Грошей зароблено
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {this.state.price}₴
                        </Typography>
                    </CardContent>
                </Card>
                <div className="header">
                    <ul className="mnu_top">
                        <li>
                            <Link to="../admin/users">
                                <PeopleIcon />
                            </Link>
                        </li>
                        <li>
                            <Link to="../admin/products">
                                <CheckroomIcon />
                            </Link>
                        </li>
                        <li>
                            <Link to="../admin/categories">
                                <CategoryIcon />
                            </Link>
                        </li>
                        <li>
                            <Link to="../admin/orders">
                                <ShoppingCartIcon /> 
                            </Link>
                        </li>
                    </ul>  
                </div>

                <Switch>
                    <Route path="/admin/products" component={Products} />
                    <Route path="/admin/users" component={Users} />
                    <Route path="/admin/categories" component={Categories} />
                    <Route path="/admin/orders" component={Orders} />
                </Switch>
            </div>
            </Router>
        );
    }
}

export default Admin;