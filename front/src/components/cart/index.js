import { Component } from "react";
// import './style.css';

import { Redirect } from "react-router-dom";

import Url from "../../mixins/apiUrl";

class Cart extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <h1>Cart</h1>
                <p>На даний момент кошик пустий!</p>
            </div>
        );
    }
}

export default Cart;