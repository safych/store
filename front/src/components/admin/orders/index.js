import { Component } from "react";

import Url from "../../../mixins/apiUrl";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

class Carts extends Component {
    constructor() {
        super();
        this.state = {
            waitOrders: [],
            doneOrders: [],
            products: [],
            findWaitId: "",
            findDoneId: "",
            deleteID: "",
            user: {},
            search: ""
        };

        localStorage.setItem("enable", JSON.stringify(false));

        fetch(Url + 'waitOrder', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
        })
            .then(response => response.json())
            .then(data => {
            data.forEach(input => {
                this.setState(prevState => ({
                    waitOrders: [...prevState.waitOrders, input]
                }));
            })
        })

        fetch(Url + 'doneOrder', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
        })
            .then(response => response.json())
            .then(data => {
            data.forEach(input => {
                this.setState(prevState => ({
                    doneOrders: [...prevState.doneOrders, input]
                }));
            })
        })
    }

    deleteOrder = (id) => {
        fetch(Url + "deleteOrder", { 
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Order-ID': id,
                'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
        })
        window.location.reload(); 
        this.props.restart();
    }

    doneOrder = (id) => {
        fetch(Url + 'doneOrder', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Order-ID': id,
              'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
           }
        })
        window.location.reload(); 
        this.props.restart();
    }


    getOrder = (id) => {
        this.setState({ products: [] });
        fetch(Url + 'getProductsAdmin', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Order-ID': id,
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

        fetch(Url + 'infoOrderUser', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Order-ID': id,
                'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
        })
        .then(response => response.json())
            .then(data => {
                this.setState({ user: data })
            }
        )
    }

    setSearch = (event) => {
        this.setState({search: event.target.value});
    }

    search = () => {
        this.setState({ products: [] })
        fetch(Url + 'getProductsAdmin', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Order-ID': this.state.search,
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

        fetch(Url + 'infoOrderUser', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Order-ID': this.state.search,
                'Authorization': localStorage.getItem("token").replace(/^"(.*)"$/, '$1')
            }
        })
        .then(response => response.json())
            .then(data => {
                this.setState({ user: data })
            }
        )
    }

    render() {
        return(
            <div>
                <h2>Замовлення</h2>
                <p>Пошук за ID</p>
                <p><TextField placeholder="ID замовлення" value={this.state.searc} onChange={this.setSearch} /></p>
                <Button variant="contained" onClick={this.search}>Пошук</Button>
                <h3>Деталі</h3>
                {
                    this.state.products.length ?
                    <ul>
                        <li>Ім'я: {this.state.user.name}</li>
                        <li>Прізвище: {this.state.user.surname}</li>
                        <li>Номер телефону: {this.state.user.number_phone}</li>
                        <li>Статус: {this.state.user.status}</li>
                        <li>Ціна: {this.state.user.price}₴</li>
                    </ul>
                    :
                    null
                }
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
                                        <img style={{ width: '100px' }} src={require('../../images/' + product.image)} alt="Girl in a jacket"/>
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

                <h3>Очікує на відправку:</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
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
                            this.state.waitOrders.length ?
                            this.state.waitOrders.map(order => 
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
                                    <TableCell align="center"><Button variant="contained" endIcon={<SendIcon />} onClick={() => this.doneOrder(order.id)}>Відправлено</Button></TableCell>
                                    <TableCell align="left"><Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => this.deleteOrder(order.id)}>Видалити</Button></TableCell>
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

                <h3>Відправлено:</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
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
                            this.state.doneOrders.length ?
                            this.state.doneOrders.map(order => 
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
                                    <TableCell align="left"><Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => this.deleteOrder(order.id)}>Видалити</Button></TableCell>
                                </TableRow>
                                )
                            :
                                <div>
                                    <p>На даний відпралених замовлень немає момент замолень немає</p>
                                </div>
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default Carts;