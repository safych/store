import { Component } from 'react';

import "./style.css";

class Content extends Component {
   render() {
    return (
      <div>
        <section class="hero">
                <h1>If you want to feel ukrainian not only in words.</h1>

                <p class="subhead">Then buy clothes with embroidery from us</p>

                <svg class="arrows">
                  <path class="a1" d="M0 0 L30 32 L60 0"></path>
                  <path class="a2" d="M0 20 L30 52 L60 20"></path>
                  <path class="a3" d="M0 40 L30 72 L60 40"></path>
                </svg>
            </section>

            <section class="more-info">
              <div class="feature">
                <div class="content">
                  <p class="title">Embroidered shirts</p>
                  <p class="desc">occupies an important place among the various branches of Ukrainian decorative arts</p>
                </div>
                <img src={require('../images/shirt.jpeg')} />
              </div>
              <div class="feature">
                <div class="content">
                  <p class="title">Dresses</p>
                  <p class="desc">Upper mesh material provides proper vent</p>
                </div>
                <img src={require('../images/dresses.jpeg')} />
              </div>
              <div class="feature">
                <div class="content">
                  <p class="title">Blouses</p>
                  <p class="desc">Upper mesh material provides proper vent</p>
                </div>
                <img src={require('../images/blouses.jpeg')} />
              </div>
            </section>
      </div>
    )
  }
} 

export default Content;