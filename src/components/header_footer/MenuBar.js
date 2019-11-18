import React, { Component } from 'react';
import { Layout, Menu, Button } from 'antd';

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
                                <Menu.Item key="0"><Button type="link" onClick={()=>this.props.searchType('all')}>Tất cả</Button></Menu.Item>
                                <Menu.Item key="1"><Button type="link" onClick={()=>this.props.searchType('Trinh thám')}>Trinh thám</Button></Menu.Item>
                                <Menu.Item key="2"><Button type="link" onClick={()=>this.props.searchType('Tiểu thuyết')}>Tiểu thuyết</Button></Menu.Item>
                                <Menu.Item key="3"><Button type="link" onClick={()=>this.props.searchType('Tự thuật')}>Tự thuật</Button></Menu.Item>
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