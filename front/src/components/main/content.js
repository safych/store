import { Component } from 'react';

import "./style.css";

class Content extends Component {
   render() {
    return (
      <div>
        <section className="hero">
                <h1>If you want to feel ukrainian not only in words.</h1>

                <p className="subhead">Then buy clothes with embroidery from us</p>

                <svg className="arrows">
                  <path className="a1" d="M0 0 L30 32 L60 0"></path>
                  <path className="a2" d="M0 20 L30 52 L60 20"></path>
                  <path className="a3" d="M0 40 L30 72 L60 40"></path>
                </svg>
            </section>

            <section className="more-info">
              <div className="feature">
                <div className="content">
                  <p className="title">Embroidered shirts</p>
                  <p className="desc">occupies an important place among the various branches of Ukrainian decorative arts</p>
                </div>
                <img src={require('../images/shirt.jpeg')} />
              </div>
              <div className="feature">
                <div className="content">
                  <p className="title">Dresses</p>
                  <p className="desc">Upper mesh material provides proper vent</p>
                </div>
                <img src={require('../images/dresses.jpeg')} />
              </div>
              <div className="feature">
                <div className="content">
                  <p className="title">Blouses</p>
                  <p className="desc">Upper mesh material provides proper vent</p>
                </div>
                <img src={require('../images/blouses.jpeg')} />
              </div>
            </section>
      </div>
    )
  }
} 

export default Content;