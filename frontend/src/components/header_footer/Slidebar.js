import React, { Component } from 'react';
import { List, Drawer } from 'antd';
import {scroller} from 'react-scroll';
import { BrowserRouter as Router,Link } from "react-router-dom";

class Slidebar extends Component {
    render() {
        const scrollToElement = (element) =>{
            scroller.scrollTo(element, {
                duration: 1500,
                delay: 100,
                smooth: true,
                offset: -100
            });
            this.props.onClose(false);
        }
        return (
            <div>
                <Drawer
                    placement="right"
                    closable={false}
                    onClose={this.props.onClose}
                    visible={this.props.visible}
                >
                    <List>
                        <List.Item onClick={()=> scrollToElement('event')}><Link to="/login">Đăng nhập</Link></List.Item>
                        <List.Item onClick={()=> scrollToElement('info')}><Link to="/register">Đăng ký</Link></List.Item>
                        <List.Item onClick={()=> scrollToElement('highlight')}><Link to="/books">Sản phẩm</Link></List.Item>
                        <List.Item onClick={()=> scrollToElement('purchase')}>Liên hệ</List.Item>
                        <List.Item onClick={()=> scrollToElement('location')}>Địa chỉ</List.Item>
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default Slidebar;