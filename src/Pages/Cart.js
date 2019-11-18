import React, { Component } from 'react';
import Header2 from '../components/header_footer/Header';
import Footer from '../components/header_footer/Footer';
import CartItem from '../components/cart/CartItem';
import { Card, Row, Col, Typography, Button } from 'antd';

const { Text } = Typography;

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state={
            isShip: true;
        }
      }
    render() {
        return (
            <div>
                <Header2 />
                <div style={{ marginTop: 100 }}>
                    <CartItem />
                    <CartItem />
                    <CartItem />
                    <CartItem />
                </div>
                <Row>
                    <Col span={6} offset={17} style={{
                        marginTop:20,
                        fontSize:20,
                        marginBottom: 20,
                    }}>
                            <b>Thành Tiền:</b>
                        <Text style={{ fontSize: 30, marginLeft:30 }} type="danger">200000</Text>
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