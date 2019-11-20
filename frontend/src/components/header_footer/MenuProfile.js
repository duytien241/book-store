import React, { Component } from 'react';
import Header2 from './Header';
import Footer from './Footer';
import { Layout, Menu, Icon } from 'antd';
import {  Link } from "react-router-dom";
const { Sider, Content } = Layout;


class MenuProfile extends Component {
    render() {
        return (
            <div>
                <Header2 />
                <div>
                    <Layout style={{ minHeight: '100vh', marginTop: 60 }}>
                        <Sider >
                            <div className="logo" />
                            <Menu theme="dark" defaultSelectedKeys={[this.props.tab]} mode="inline">
                                <Menu.Item key="1">
                                    
                                    <Link to ="/profile"><Icon type="idcard" />Chỉnh sửa thông tin</Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link  to="/history_order">
                                    <Icon type="shop" /> Lịch sử mua hàng
                                    </Link>
                                    
                                </Menu.Item>
                                <Menu.Item key="3">
                                   
                                    <Link to="changepassword"> <Icon type="unlock" />Đổi mật khẩu</Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content style={{ margin: '0 16px' }}>
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </div>
                <Footer />
            </div>
        );
    }
}

export default MenuProfile;