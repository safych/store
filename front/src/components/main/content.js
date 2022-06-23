import { Component } from 'react';

import "./style.css";

class Content extends Component {
   render() {
    return (
      <div>
        <section className="hero">
                <h1>Якщо хочеш відчути себе українцем не тільки на словах.</h1>

                <p className="subhead">Тоді купуй у нас одяг з вишивкою.</p>

                <svg className="arrows">
                  <path className="a1" d="M0 0 L30 32 L60 0"></path>
                  <path className="a2" d="M0 20 L30 52 L60 20"></path>
                  <path className="a3" d="M0 40 L30 72 L60 40"></path>
                </svg>
            </section>

            <section className="more-info">
              <div className="feature">
                <div className="content">
                  <p className="title">Вишиванка</p>
                  <p className="desc"><p>Вишиванка – символ України,</p>
                                      <p>Кожної великої родини,</p>
                                      <p>Нашої історії та мови</p>
                                      <p>Залюбки вдягаємо її знову.</p>
                  </p>
                </div>
                <img src={require('../images/shirt.jpeg')} />
              </div>
              <div className="feature">
                <div className="content">
                  <p className="title">Плаття</p>
                  <p className="desc"><p>Плаття-вишиванку</p>
                                      <p>Одягаю радо,</p>
                                      <p>Буду в ній сьогодні</p>
                                      <p>з друзями гуляти.</p>
                                      <p>Мені личить унікальний</p>
                                      <p>Одяг наш національний!</p>
                  </p>
                </div>
                <img src={require('../images/dresses.jpeg')} />
              </div>
              <div className="feature">
                <div className="content">
                  <p className="title">Блуза</p>
                  <p className="desc"><p>Узор вручну, широка планка,</p>
                                      <p>Легенький запах ковели.</p>
                                      <p>Моя сорочка вишиванка,</p>
                                      <p>Вся ніби сплетена з трави.</p>
                                      <p>Дніпра потоки, степ , простори,</p>
                                      <p>По лівій, правій стороні.</p>
                                      <p>Червоно – чорні всі узори,</p>
                                      <p>Мережив ряд на полотні.</p>
                  </p>
                </div>
                <img src={require('../images/blouses.jpeg')} />
              </div>
            </section>
      </div>
    )
  }
} 

export default Content;