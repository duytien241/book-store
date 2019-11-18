import React, { Component } from 'react';
import Header2 from '../components/header_footer/Header';
import Footer from '../components/header_footer/Footer';
import CartItem from '../components/cart/CartItem';
import { Card, Form,Input, Row, Col, Typography, Button } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
const { Text } = Typography;

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state={
            isShip: true,
            carts: [],
            totalDue: 0,
        }
      }
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/v1/cart`,  { headers: {"Authorization" : `Token  ${Cookies.get('user_token')}`}})
        .then(res => {
            const carts = res.data;
            this.setState({ carts: carts });
        })
        .catch(error => console.log(error));
    }
    setTotalDue =(value) =>{
        this.setState({
            totalDue: this.state.totalDue+ value,
        })
    }
    render() {
        var { carts } = this.state;
        var printElement = carts.map((cart, index, carts) => {
            // this.setState({totalDue: this.state.totalDue + })
            var key = localStorage.getItem('key');
                return <CartItem key={key} book = {carts[index].book} quantity = {carts[index].quantity} cart = {carts[index].id} setTotalDue={this.setTotalDue}></CartItem>
            });
        return (
            <div>
                <Header2 />
                <div style={{ marginTop: 100 }}>
                    {printElement}
                </div>
                <Row>
                    <Col span={6} offset={17} style={{
                        marginTop:20,
                        fontSize:20,
                        marginBottom: 20,
                        height:300
                    }}>
                            <b>Thành Tiền:</b>
                        <Text style={{ fontSize: 30, marginLeft:30 }} type="danger">{this.state.totalDue}</Text>
                        <Button type="danger" style ={{width:'290px'}}  >
                            Đặt hàng
                        </Button>

                    </Col>
                </Row>
                <Footer />
            </div>
        );
    }
}

export default Cart;