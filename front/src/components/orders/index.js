import { Component } from "react";

import Url from "../../mixins/apiUrl";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      products: []
    }
    
    localStorage.setItem("enable", JSON.stringify(false));

    fetch(Url + 'userOrders', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User': this.props.id,
        'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
      }
    })
        .then(response => response.json())
        .then(data => {
          data.forEach(input => {
              this.setState(prevState => ({
                  orders: [...prevState.orders, input]
              }));
          })
    })
  }

  getOrder = (id) => {
    this.setState({ products: [] });
    fetch(Url + 'userOrderItems', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Order': id,
        'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
      }
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

  render() {
    return(
      <div>
        <h1>Ваші замовлення</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center" style={{ "font-weight": "bold" }}>#</TableCell>
                    <TableCell align="center" style={{ "font-weight": "bold" }}>ID</TableCell>
                    <TableCell align="center" style={{ "font-weight": "bold" }}>Ціна</TableCell>
                    <TableCell align="center" style={{ "font-weight": "bold" }}>Статус</TableCell>
                    <TableCell align="center" style={{ "font-weight": "bold" }}>Дата та час створення</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {   
                    this.state.orders.length ?
                    this.state.orders.map(order => 
                        <TableRow
                        key={order.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">
                              <Button size="small" variant="outlined" onClick={() => this.getOrder(order.id)}>
                                Деталі
                              </Button>
                            </TableCell>
                            <TableCell align="center">{order.id}</TableCell>
                            <TableCell align="center">{order.price}₴</TableCell>
                            <TableCell align="center">{order.status}</TableCell>
                            <TableCell align="center">
                              {order.created_at.substr(8, 2)}-{order.created_at.substr(5, 2)}-{order.created_at.substr(0, 4)} {order.created_at.substr(11, 8)}
                            </TableCell>
                        </TableRow>
                        )
                      :
                        <div>
                            <p>На даний момент замолень немає</p>
                        </div>
                }
                </TableBody>
            </Table>
        </TableContainer>
        
        <h1>Деталі замовлення</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center" style={{ "font-weight": "bold" }}>ID</TableCell>
                    <TableCell align="center" style={{ "font-weight": "bold" }}>Назва</TableCell>
                    <TableCell align="center" style={{ "font-weight": "bold" }}>Розмір</TableCell>
                    <TableCell align="center" style={{ "font-weight": "bold" }}>Ціна</TableCell>
                    <TableCell align="center" style={{ "font-weight": "bold" }}>Кількість</TableCell>
                    <TableCell align="center" style={{ "font-weight": "bold" }}>Фото</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {   
                    this.state.products.length ?
                    this.state.products.map(product => 
                        <TableRow
                        key={product.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{product.id}</TableCell>
                            <TableCell align="center">{product.name}</TableCell>
                            <TableCell align="center">{product.size}</TableCell>
                            <TableCell align="center">{product.price}₴</TableCell>
                            <TableCell align="center">{product.count}</TableCell>
                            <TableCell align="center">
                                <img style={{ width: '100px' }} src={require('../images/' + product.image)} alt="Girl in a jacket"/>
                            </TableCell>
                        </TableRow>
                        )
                      :
                        <div>
                            <p>Виберіть замовлення для отримання детальної інформації</p>
                        </div>
                }
                </TableBody>
            </Table>
        </TableContainer>
      </div>
    )
  }
}

export default Orders;