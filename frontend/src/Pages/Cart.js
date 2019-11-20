import React, { Component } from 'react';
import Header2 from '../components/header_footer/Header';
import Footer from '../components/header_footer/Footer';
import CartItem from '../components/cart/CartItem';
import { Modal, Row, Col, Typography, Button, Steps, Progress, notification  } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import FormCartStep2 from '../components/cart/FormCartStep2';
import FormCartStep3 from '../components/cart/FormCartStep3';

const { Text } = Typography;
const { Step } = Steps;

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShip: true,
            visible: false,
            carts: [],
            totalDue: 0,
            count: 0,
            tab_process: 1,
            address: '',
            phone: '',
            message: ''
        }
    }
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/v1/cart`, { headers: { "Authorization": `Token  ${Cookies.get('user_token')}` } })
            .then(res => {
                const carts = res.data;
                carts.forEach(element => {
                    this.setState({ totalDue: this.state.totalDue + element.total_price })
                });
                this.setState({ carts: carts });
            })
            .catch(error => console.log(error));
    }

    onChange = tab_process => {
        this.setState({ tab_process });
    };

    setTotalDue = (value) => {
        this.setState({
            totalDue: this.state.totalDue + value,
        })
    }

    getToCart = (value, index) => {
        var carts = this.state.carts
        carts[index].quantity += value
        this.setState({ count: this.state.count + value, carts: carts })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    openNotification = () => {
        notification.success( {
          message: 'Đặt hàng thành công',
          description:
            'Tự động chuyển sang lịch sử mua hàng.',
          duration: 0,
        });
      };
    submitStep2 = (values) => {
        this.setState({
            address: values.address,
            phone: values.phone,
            tab_process: 2,
        })
    }
    submitStep3 = (values) => {
        this.setState({
            message: values.message,
        });
        axios.post(`http://127.0.0.1:8000/v1/orders/`, {
            user: 1,
            ship_address: this.state.address,
            phone: this.state.phone,
            totalDue: this.state.totalDue,
            status:'Chưa giao hàng'
        }, { headers: { "Authorization": `Token  ${Cookies.get('user_token')}` } })
            .then(res => {
                console.log(res)
                this.state.carts.forEach(element => {
                    axios.post(`http://127.0.0.1:8000/v1/order/`, {
                        order: res.data.id,
                        book: element.book,
                        quantity: element.quantity
                    }, { headers: { "Authorization": `Token  ${Cookies.get('user_token')}` } })
                        .then(res => {
                            this.state.carts.forEach(element => {
                                axios.delete(`http://127.0.0.1:8000/v1/cart/`+element.id, { headers: { "Authorization": `Token  ${Cookies.get('user_token')}` } })
                                .then(res => {
                                })
                                .catch(error => console.log(error));
                            });
                            this.openNotification()
                            window.location.href = "/history_order"
                        })
                        .catch(error => console.log(error));
                });

            })
            .catch(error => this.setState({ message: 'Đăng ký không thành công!' }));
    }
    render() {
        var { carts } = this.state;
        
        var printElement = carts.map((cart, index, carts) => {
            var key = index;
            return <CartItem getToCart={this.getToCart} key={key} index={index} book={carts[index].book} quantity={carts[index].quantity} cart={carts[index].id} setTotalDue={this.setTotalDue}></CartItem>
        });
        let step;
        if (this.state.tab_process == 1) {
            step = <FormCartStep2 submitStep2={this.submitStep2} address={this.state.address} phone={this.state.phone}></FormCartStep2>
        } else {
            step = <FormCartStep3 submitStep3={this.submitStep3} totalDue={this.state.totalDue} />
        }
        return (
            <div>
                <Header2 count={this.state.count} />
                <div style={{ marginTop: 100 }}>
                    {printElement}
                </div>
                <Row>
                    <Col span={6} offset={17} style={{
                        marginTop: 20,
                        fontSize: 20,
                        marginBottom: 20,
                        height: 300
                    }}>
                        <b>Thành Tiền:</b>
                        <Text style={{ fontSize: 30, marginLeft: 30 }} type="danger">{this.state.totalDue} đ</Text>
                        <Button type="danger" style={{ width: '290px' }} onClick={this.showModal} >
                            Đặt hàng
                        </Button>
                    </Col>
                </Row>
                <Modal
                    title="Tiến hành đặt hàng"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Steps size="small" current={this.state.tab_process} onChange={this.onChange}>
                        <Step title="Thêm giỏ hàng" disabled />
                        <Step title="Địa chỉ nhận hàng" />
                        <Step title="Thanh toán" />

                    </Steps>
                    <div style={{ textAlign: 'center' }}>
                        <hr />
                    </div>
                    {step}
                </Modal>
                <Footer />
            </div>
        );
    }
}

export default Cart;