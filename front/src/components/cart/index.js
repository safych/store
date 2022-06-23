import { Component } from "react";

import Url from "../../mixins/apiUrl";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carts: [],
            editId: "",
            editCount: ""
        }
        
        localStorage.setItem("enable", JSON.stringify(false));

        fetch(Url + "userCarts", {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'User': this.props.userId,
              'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
          })
          .then(response => response.json())
          .then(data => {
            data.forEach(input => {
              this.setState(prevState => ({
                  carts: [...prevState.carts, input]
              }));
            })
          })
    }

    setEditId = (event) => {
        this.setState({editId: event.target.value});
    }

    setEditCount = (event) => {
        this.setState({editCount: event.target.value});
    }

    editCart = () => {
        fetch(Url + "editUserCart", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Cart': this.state.editId,
              'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            },
            body: JSON.stringify({ 
                items_count: this.state.editCount
            })
        });
        window.location.reload(); 
        this.props.restart();
    }

    deleteCart = (id) => {
        fetch(Url + "deleteUserCart", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Cart': id,
              'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
        });
        window.location.reload(); 
        this.props.restart();
    }

    doneCart = () => {
        fetch(Url + 'order_items', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'User': this.props.userId,
              'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            },
            body: JSON.stringify({ 
                products: this.state.carts
            })
        });
        window.location.reload(); 
        this.props.restart();
    }

    render() {
        return (
            <div>
                <h1>Корзина</h1>  
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>ID</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>ID продукту</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Назва</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Розмір</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Ціна</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Кількість</TableCell>
                            <TableCell align="center" style={{ "font-weight": "bold" }}>Фото</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {   
                            this.state.carts.length ?
                            this.state.carts.map(cart => 
                                <TableRow
                                key={cart.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{cart.id}</TableCell>
                                    <TableCell align="center">{cart.product}</TableCell>
                                    <TableCell align="center">{cart.name}</TableCell>
                                    <TableCell align="center">{cart.size}</TableCell>
                                    <TableCell align="center">{cart.price}₴</TableCell>
                                    <TableCell align="center">{cart.count}</TableCell>
                                    <TableCell align="center">
                                        <img style={{ width: '100px' }} src={require('../images/' + cart.image)} alt="Girl in a jacket"/>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button style={{ background: 'red' }} variant="contained" onClick={() => this.deleteCart(cart.id)}>Видалити</Button>
                                    </TableCell>
                                </TableRow>
                                ):
                                <div>
                                    <p>На даний момент кошик пустий</p>
                                </div>
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    this.state.carts.length ?
                    <div>
                        <h2>Змінити кількість</h2>
                        <p><TextField placeholder="id" type="number" value={this.state.editId} onChange={this.setEditId} /></p>
                        <p><TextField placeholder="count" type="number" value={this.state.editCount} onChange={this.setEditCount} /></p>
                        <Button variant="contained" onClick={this.editCart}>Оновити</Button>
                    </div>
                    :
                    null
                }
                {
                    this.state.carts.length ?
                    <div>
                        <p><Button style={{ width: '100%', background: 'green' }} variant="contained" onClick={this.doneCart}>Сформувати замовлення</Button></p>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

export default Cart;