import { Component } from "react";

import "./product.css";
import blouses from '../images/blouses.jpeg';

import Url from "../../mixins/apiUrl";

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products: []
        }

        localStorage.setItem("enable", JSON.stringify(false));
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

    // componentDidUpdate() {
    //   console.log("update");
    // }


    buy = (product) => {
      console.log(this.props.user);
    }

    render() {
      return(
        <div>
          <h1>Products</h1>
          {
            this.state.products.map((product, i) => 
              <div className="container">
                <div className="card" key={i}>
                  <div className="imgBx">
                  <img src={blouses} alt="Girl in a jacket"/>
                    {product.name}
                  </div>
                  <div className="content">
                    <div className="size">
                      <h3>Size: </h3>
                        <p>{product.size}</p>
                    </div>
                    <button className="buy" onClick={() => this.buy(product)}>{product.price}</button>
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