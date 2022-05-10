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

class Main extends Component {
  // componentDidMount() {
  //
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
    localStorage.removeItem("password");
    localStorage.removeItem("number_phone");
    localStorage.removeItem("name");
    localStorage.removeItem("surname");
    this.forceUpdate();
  }

  restart = () => {
    this.forceUpdate();
  }

  render() {
      return (
        <Router>
        <div>
          { localStorage.getItem("enable") === "true" ? <div class="hero-img"></div> : null}
          <div class="wrapper">
            <header>
              <a href="/" class="logo" onClick={this.enableImg}><span style={{ color: 'blue' }}>World</span><span style={{color: 'yellow'}}> of</span> <span style={{ color: '#66D3FA' }}>embroidery</span></a>
                <svg class="menu" viewBox="0 0 100 80" width="40" height="40">
                  <rect width="100" height="20"></rect>
                  <rect y="30" width="100" height="20"></rect>
                  <rect y="60" width="100" height="20"></rect>
                </svg>
              <nav>
                <svg class="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50" height="50" overflow="visible" stroke="black" stroke-width="10" stroke-linecap="round">
                   <line x1="0" y1="0" x2="50" y2="50" />
                   <line x1="50" y1="0" x2="0" y2="50" />
                </svg>

                  <div>
                    {
                      localStorage.getItem("email") ? 
                      <ul>
                        <li>
                          <Link style={{ color: 'black' }} to="/product" onClick={this.notEnableImg}>Product</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/cart" onClick={this.notEnableImg}>Cart</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/" onClick={this.leave}>Leave</Link>
                        </li>
                      </ul>
                      :
                      <ul>
                        <li>
                          <Link style={{ color: 'black' }} to="/product" onClick={this.notEnableImg}>Product</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/singin" onClick={this.notEnableImg}>Login</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/singup" onClick={this.notEnableImg}>Register</Link>
                        </li>
                      </ul>
                    }
                  </div>
              </nav>
            </header>
            { localStorage.getItem("enable") === "true" ? <Content/> : null}
            {/* {
              localStorage.getItem("email") ? 
              null
              :
              <Switch>
                <Route path="/product" component={Product} />
                <Route path="/singin" component={SingIn} />
                <Route path="/singup" component={SingUp} />
              </Switch>
            } */}
            <Switch>
              <Route path="/product" component={Product} />
              <Route path="/cart" component={Cart} />
              <Route path="/singin" render={() => <SingIn restart={this.restart} /> } />
              <Route path="/singup" component={SingUp} />
            </Switch>
          </div>
        </div>
        </Router>
      )
  }
}

export default Main;