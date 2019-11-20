import React, { Component } from 'react';
import { Card, Icon, Avatar, Typography, Modal } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

const { Meta } = Card;
const { Text } = Typography;


class BookCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            user: {}
        }
    }
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/v1/me`,  { headers: {"Authorization" : `Token  ${Cookies.get('user_token')}`}})
        .then(res => {
            const user = res.data;
            this.setState({ user: user });
            console.log(user)
        })
        .catch(error => console.log(error));
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        var {description}  = this.props;
        return (
            <div>
                <Card
                    style={{ width: 300, marginLeft: 20, marginBottom: 20 }}
                    cover={
                        <img
                            style={{ height: 250 }}
                            alt="example"
                            src={window.location.origin+"/images/books/" +this.props.src_image}
                        />
                    }
                    actions={[
                        <Icon type="info" key="info" onClick={this.showModal} />,
                        <Icon type="shopping-cart" key="shopping-cart" onClick={() =>this.props.getToCart(this.props.id)}/>,
                    ]}
                >
                    <Meta
                        title={this.props.name}
                        description= {description.length > 50? description.substring(0, 150- 3) + "..." : description}
                    />
                    <br />
                    <hr />
                    <div style={{ textAlign: 'center' }} >
                        <Text type="danger" style={{ fontSize: 24 }}>{this.props.price} đ</Text>
                    </div>
                </Card>
                <Modal
                    title={this.props.name}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>{description}</p>
                </Modal>
            </div>
        );
    }
}

export default BookCard;