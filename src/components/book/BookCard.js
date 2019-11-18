import React, { Component } from 'react';
import { Card, Icon, Avatar, Typography, Modal } from 'antd';

const { Meta } = Card;
const { Text } = Typography;

class BookCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
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
        return (
            <div>
                <Card
                    style={{ width: 300, marginLeft: 20, marginBottom: 20 }}
                    cover={
                        <img
                            style={{ height: 250 }}
                            alt="example"
                            src="https://sachvui.com/cover/2015/Dac-nhan-tam.jpg"
                        />
                    }
                    actions={[
                        <Icon type="info" key="info" onClick={this.showModal} />,
                        <Icon type="shopping-cart" key="shopping-cart" />,
                    ]}
                >
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="Đắc nhân tâm"
                        description="This is the description"
                    />
                    <br />
                    <hr />
                    <div style={{ textAlign: 'center' }} >
                        <Text type="danger" style={{ fontSize: 24 }}>200.000đ</Text>
                    </div>
                </Card>
                <Modal
                    title="Đắc nhân tâm"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Mô tả về truyện</p>
                </Modal>
            </div>
        );
    }
}

export default BookCard;