import { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './style.css';

import Product from "../product";
import SingIn from "../auth/singin";
import SingUp from "../auth/singup";
import Content from "./content";
import Cart from "../cart";
import Admin from "../admin";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };

    localStorage.setItem("enable", JSON.stringify(true));

  }

  // componentDidMount() {
    
  // }
  //
  // componentDidUpdate() {
  //   console.log("update");
  // }

  enableImg = () => {
    localStorage.setItem("enable", JSON.stringify(true));
  }

  notEnableImg = () => {
    localStorage.setItem("enable", JSON.stringify(false));
    this.forceUpdate();
  }

  leave = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    this.forceUpdate();
    localStorage.setItem("enable", JSON.stringify(true));
    this.setState({ email: "" });
  }

  restart = () => {
    this.forceUpdate();
    // this.setState({ email: localStorage.getItem("email") });
  }

  render() {
      return (
        <Router>
        <div>
          { localStorage.getItem("enable") === "true" ? <div className="hero-img"></div> : null}
          <div className="wrapper">
            <header>
              <a href="/" className="logo" onClick={this.enableImg}><span style={{ color: 'blue' }}>World</span><span style={{color: 'yellow'}}> of</span> <span style={{ color: '#66D3FA' }}>embroidery</span></a>
                <svg className="menu" viewBox="0 0 100 80" width="40" height="40">
                  <rect width="100" height="20"></rect>
                  <rect y="30" width="100" height="20"></rect>
                  <rect y="60" width="100" height="20"></rect>
                </svg>
              <nav>
                <svg className="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50" overflow="visible" stroke="black" stroke-width="10" stroke-linecap="round">
                   <line x1="0" y1="0" x2="50" y2="50" />
                   <line x1="50" y1="0" x2="0" y2="50" />
                </svg>

                  <div>
                    {
                      !localStorage.getItem("email") ?
                      <ul>
                        <li>
                          <Link style={{ color: 'black' }} to="/products" onClick={this.notEnableImg}>Products</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/singin" onClick={this.notEnableImg}>Login</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/singup" onClick={this.notEnableImg}>Register</Link>
                        </li>
                      </ul>
                      : this.state.email.includes("admin@ukr.net") || localStorage.getItem("email").includes("admin@ukr.net") ?
                      <ul>
                        <li>
                          <Link style={{ color: 'black' }} to="/products" onClick={this.notEnableImg}>Products</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/admin" onClick={this.notEnableImg}>Admin</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/" onClick={this.leave}>Leave</Link>
                        </li>
                      </ul>
                      : 
                      <ul>
                        <li>
                          <Link style={{ color: 'black' }} to="/products" onClick={this.notEnableImg}>Products</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/cart" onClick={this.notEnableImg}>Cart</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/" onClick={this.leave}>Leave</Link>
                        </li>
                      </ul>
                    }
                  </div>
              </nav>
            </header>
            { localStorage.getItem("enable") === "true" ? <Content/> : null}
            <Switch>
              <Route path="/products" component={Product} />
              <Route path="/cart" component={Cart} />
              <Route path="/singin" render={() => <SingIn restart={this.restart}/> } />
              <Route path="/singup" component={SingUp} />
              <Route path="/admin" component={Admin} />
            </Switch>
          </div>
        </div>
        </Router>
      )
  }
}

export default Main;