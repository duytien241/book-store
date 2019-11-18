import React, { Component } from 'react';
import { Layout, Menu,  } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class MenuBar extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <div>
                <Layout style={{ minHeight: '100vh', marginTop:60 }}>
                    <Sider  collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <span>Thể loại</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="1">Trinh thám</Menu.Item>
                                <Menu.Item key="2">Tiểu thuyết</Menu.Item>
                                <Menu.Item key="3">Tự thuật</Menu.Item>
                            </SubMenu>
                            
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <span>Giá</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="4"> Dưới 200000</Menu.Item>
                                <Menu.Item key="5">200000 tới 500000 </Menu.Item>
                                <Menu.Item key="6">Trên 500000</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    {this.props.children}
                </Layout>
            </div>
        );
    }
}

export default MenuBar;