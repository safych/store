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
import Orders from "../orders";
import Settings from "../settings";
import Url from "../../mixins/apiUrl";
import Alert from '@mui/material/Alert';

class Main extends Component {
  constructor() {
    super();
    this.state= {
      user: ""
    }
    localStorage.setItem("enable", JSON.stringify(true));

    if (localStorage.getItem("token")) {
      fetch(Url + 'info', {
        method: 'GET',
        headers: { "Access-Token": localStorage.getItem("token").replace(/^"(.*)"$/, '$1') }
      })
      .then(response => response.json())
      .then(data => { this.setState({ user: data }) })
    }
    console.log(this.state.user === "");
  }

  componentDidMount () {
    const menu = document.querySelector('.menu')
    const close = document.querySelector('.close')
    const nav = document.querySelector('nav')

    menu.addEventListener('click', () => {
        nav.classList.add('open-nav')
    })

    close.addEventListener('click', () => {
        nav.classList.remove('open-nav')
    })
  }

  enableImg = () => {
    localStorage.setItem("enable", JSON.stringify(true));
  }

  notEnableImg = () => {
    localStorage.setItem("enable", JSON.stringify(false));
    this.forceUpdate();
  }

  leave = () => {
    fetch(Url + "logout", { 
      method: 'POST', 
      headers: { "Access-Token": localStorage.getItem("token").replace(/^"(.*)"$/, '$1') }
    })
    localStorage.removeItem("token");
    localStorage.setItem("enable", JSON.stringify(true));
    this.restart();
  }

  restart = () => {
    this.forceUpdate();
  }

  render() {
      return (
        <Router>
        <div>
        { this.state.user.name === undefined && localStorage.getItem("token") ? <Alert severity="error">Переавторизуйтеся</Alert> : null }
          { localStorage.getItem("enable") === "true" ? <div className="hero-img"></div> : null}
          <div className="wrapper">
            <header>
              <a href="/" className="logo" onClick={this.enableImg}><span style={{ color: 'blue' }}>Світ</span><span style={{color: '#66D3FA'}}> Вишивки</span></a>
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
                          <Link style={{ color: 'black' }} to="/products" onClick={this.notEnableImg}>Товари</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/singin" onClick={this.notEnableImg}>Авторизація</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/singup" onClick={this.notEnableImg}>Реєстрація</Link>
                        </li>
                      </ul>
                      : localStorage.getItem("token") && !this.state.user.surname && !this.state.user.phone_number ?
                      <ul>
                        <li>
                          <Link style={{ color: 'black' }} to="/products" onClick={this.notEnableImg}>Товари</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/admin" onClick={this.notEnableImg}>Адмін</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/" onClick={this.leave}>Вийти</Link>
                        </li>
                      </ul>
                      : 
                      <ul>
                        <li>
                          <Link style={{ color: 'black' }} to="/products" onClick={this.notEnableImg}>Товари</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/cart" onClick={this.notEnableImg}>Корзина</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/orders" onClick={this.notEnableImg}>Замовлення</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/settings" onClick={this.notEnableImg}>Налаштування</Link>
                        </li>
                        <li>
                          <Link style={{ color: 'black' }} to="/" onClick={this.leave}>Вийти</Link>
                        </li>
                      </ul>
                    }
                  </div>
              </nav>
            </header>
            { localStorage.getItem("enable") === "true" ? <Content/> : null}
            <Switch>
              <Route path="/products" component={() => <Products userId={this.state.user.id} email={this.state.user.email} 
              restart={this.restart} />} />
              <Route path="/cart" component={() => <Cart userId={this.state.user.id} />} />
              <Route path="/orders" component={() => <Orders id={this.state.user.id} />} />
              <Route path="/singin" render={() => <SingIn restart={this.restart} /> } />
              <Route path="/singup" component={SingUp} />
              <Route path="/admin" component={() => <Admin name={this.state.user.name} />} />
              <Route path="/settings" component={() => <Settings name={this.state.user.name} id={this.state.user.id}
              surname={this.state.user.surname} password={this.state.user.password_digest} />} />
            </Switch>
          </div>
        </div>
        </Router>
      )
  }
}

export default Main;