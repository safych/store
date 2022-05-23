import { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './style.css';

import Products from "../products";
import SingIn from "../auth/singin";
import SingUp from "../auth/singup";
import Content from "./content";
import Cart from "../cart";
import Admin from "../admin";
import Settings from "../settings";

import Url from "../../mixins/apiUrl";

class Main extends Component {
  constructor() {
    super();
    this.state= {
      user: ""
    }
  }

  componentDidMount() {
    localStorage.setItem("enable", JSON.stringify(true));

    if (localStorage.getItem("token")) {
      fetch(Url + 'info', {
        method: 'GET',
        headers: { "Access-Token": localStorage.getItem("token").replace(/^"(.*)"$/, '$1') }
      })
      .then(response => response.json())
      .then(data => { this.setState({ user: data }) })
    }
  }

  enableImg = () => {
    localStorage.setItem("enable", JSON.stringify(true));
  }

  notEnableImg = () => {
    localStorage.setItem("enable", JSON.stringify(false));
    this.forceUpdate();
  }

  leave = () => {
    localStorage.removeItem("token");
    fetch(Url + "logout", { 
      method: 'delete', 
      headers: { "Access-Token": localStorage.getItem("token").replace(/^"(.*)"$/, '$1') }
    }).then(response => response.json());
    localStorage.setItem("enable", JSON.stringify(true));
    this.forceUpdate();
  }

  restart = () => {
    this.forceUpdate();
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
                      !localStorage.getItem("token") ?
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
                      : localStorage.getItem("token") && this.state.email === "admin@ukr.net" ?
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
                          <Link style={{ color: 'black' }} to="/settings" onClick={this.notEnableImg}>Settings</Link>
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
              <Route path="/products" component={() => <Products user={this.state.user.id} />} />
              <Route path="/cart" component={Cart} />
              <Route path="/singin" render={() => <SingIn restart={this.restart}/> } />
              <Route path="/singup" component={SingUp} />
              <Route path="/admin" component={Admin} />
              <Route path="/settings" component={Settings} />
            </Switch>
          </div>
        </div>
        </Router>
      )
  }
}

export default Main;