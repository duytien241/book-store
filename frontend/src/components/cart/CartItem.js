import React, { Component } from 'react';
import { Button, Row, Col, InputNumber, Typography } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

const { Text } = Typography;
class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            book: [],
            quantity: 0
        }
      }
    onChange = (value) => {
        this.props.setTotalDue((value - this.state.quantity)*this.state.book.price);
        this.props.getToCart(value-this.state.quantity, this.props.index)
        axios.post(`http://127.0.0.1:8000/v1/cart/`, {
            book: this.state.book.id,
            quantity: value - this.state.quantity,
            user: 1,
        },
        { headers: {"Authorization" : `Token  ${Cookies.get('user_token')}`} })
            .then(res => {
                console.log(res.data)
            })
            .catch(error => console.log(error));
        this.setState({quantity:value})
    }
    componentDidMount() {
        axios.get("http://127.0.0.1:8000/v1/book/" +this.props.book, { headers: { "Authorization": `Token  ${Cookies.get('user_token')}` } })
            .then(res => {
                const book = res.data;
                this.setState({ book: book, quantity: this.props.quantity });
            })
            .catch(error => console.log(error));
        
    }
    deleteCart = () =>{
        axios.delete("http://127.0.0.1:8000/v1/cart/" +this.props.cart, { headers: { "Authorization": `Token  ${Cookies.get('user_token')}` } })
            .then(res => {
                const book = res.data;
                this.setState({ book: book});
                console.log(book)
            })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div>

                <Row>
                    <Col span={2} offset={2} >
                        <img
                            style={{ height: 80, marginLeft: 10 }}
                            alt="example"
                            src={window.location.origin+"/images/books/" +this.state.book.src_image}
                        />
                    </Col>
                    <Col span={4} style={{ marginTop: 15 }}>
                        Tên: {this.state.book.name}
                        <p>Tác giả: {this.state.book.author}</p>
                    </Col>
                    <Col span={4} style={{ marginTop: 15 }}>
                    <Button type="link" onClick={this.deleteCart}>Xóa</Button>
                    </Col>
                    <Col span={2} offset={4} style={{ marginTop: 15 }}>
                        <Text style={{fontSize:20}} type="danger">{this.state.book.price}</Text>
                    </Col>
                    <Col span={4} offset={2} style={{ marginTop: 15 }}>
                        <InputNumber min={1} defaultValue={this.props.quantity} onChange={this.onChange} />
                    </Col>
                </Row>
                <Row>
                    <Col span={20} offset={2}>
                        <hr />
                    </Col>
                </Row>
                {/* <div style={{width:1000, textAlign:'center'}}>
                    <hr/>
                </div> */}
            </div>
        );
    }
}

export default CartItem;