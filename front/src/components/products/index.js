import { Component } from "react";

import "./product.css";

import Url from "../../mixins/apiUrl";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products: [],
          categories: [],
          name: "",
          category: "",
          count: null,
          error: ""
        }

        localStorage.setItem("enable", JSON.stringify(false));

        fetch(Url + 'categories', {
          method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
              data.forEach(input => {
                  this.setState(prevState => ({
                      categories: [...prevState.categories, input]
                  }));
              })
        })
    }

    componentDidMount() {
      fetch(Url + "products", {
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

    setName = (event) => {
      this.setState({name: event.target.value});
    }

    setCategory = (event) => {
      this.setState({category: event.target.value});
    }

    setCount = (event) => {
      this.setState({count: event.target.value});
    }

    buy = (product, count, countProduct) => {
      if(count > countProduct) {
        this.setState({ error: "Немає стілльки товару в наявності!" })
      } else {
        fetch(Url + 'cart_items', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User': this.props.userId,
            'Product': product,
            'Count': count,
            'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
          }
        });
      }
    }

    search = () => {
      this.setState({ products: [] });
      if(this.state.category === "" && this.state.name !== "") {
        fetch(Url + "productsByName", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            name: this.state.name
          })
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
      if(this.state.name === "" && this.state.category !== "") {
        fetch(Url + "productsByCategory", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            category: this.state.category
          })
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
      if(this.state.name !== "" && this.state.category !== "") {
        fetch(Url + "productsByNameCategory", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            name: this.state.name,
            category: this.state.category
          })
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
    }

    render() {
      return(
        <div>
          { this.state.error ? <Alert severity="error">{this.state.error}</Alert> : null }
          <div className="filterBar">
            <p><TextField size="small" placeholder="назва товару" value={this.state.name} onChange={this.setName} /></p>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Категорія</InputLabel>
                    <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    size="small"
                    value={this.state.category}
                    onChange={this.setCategory}
                    autoWidth
                    label="Category"
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        this.state.categories.map(category => 
                            <MenuItem value={category.id}>{category.name}</MenuItem>
                    )}
                    </Select>
            </FormControl>
            <p><Button variant="contained" size="small" onClick={this.search}>Пошук</Button></p>
          </div>
          {
            this.state.products.map((product, i) => 
              <div className="container">
                <div className="card" key={i}>
                  <div className="imgBx">
                  <img src={require('../images/' + product.image)} alt="Girl in a jacket"/>
                    {product.name}
                  </div>
                  <div className="content">
                  <TextField size="small" type="number" placeholder="кількість" value={this.state.count} onChange={this.setCount} />
                    <div className="size">
                      <h3>Розмір:</h3>
                        <p>{product.size}</p>
                      <h3>Кількість:</h3>
                        <p>{product.items_left}</p>
                    </div>
                    <Button variant="contained" size="medium" onClick={() => this.buy(product.id, this.state.count, product.items_left)}>{product.price}₴</Button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      );
    }
}

export default Products;