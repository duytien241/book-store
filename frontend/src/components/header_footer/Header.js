import React, { Component } from 'react';
import { Layout, Menu, Button, Icon, Dropdown,Badge } from 'antd';
import Slidebar from './Slidebar';
import {  Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <Link rel="noopener noreferrer" to="/profile">
        Trang cá nhân
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link  rel="noopener noreferrer" to="/history_order">
        Lịch sử mua hàng
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link  onClick={()=>{
        axios.post(`http://127.0.0.1:8000/v1/rest-auth/logout/`, { headers: {"Authorization" : `Token  ${Cookies.get('user_token')}`} })
          .then(res => {
              Cookies.remove('user_token')
          })
          .catch(error => console.log(error));
        Cookies.remove('user_token')
      }} to="">
        Đăng xuất
      </Link>
    </Menu.Item>
  </Menu>
);

class Header2 extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible: false,
      showHeader: false,
      islog: 0,
      count: 0
    }
  }
  

  componentDidMount() {
    window.addEventListener('scroll', this.showHeader);
    if (Cookies.get('user_token')) {
      this.setState({ islog: !this.state.islog });
    }
    else {
      this.setState({ islog: false });
    }
    axios.get(`http://127.0.0.1:8000/v1/cart`,  { headers: {"Authorization" : `Token  ${Cookies.get('user_token')}`}})
        .then(res => {
            const carts = res.data;
          carts.forEach(element => {
              this.setState({count: this.state.count + element.quantity})
            });
        })
        .catch(error => console.log(error));
  }

  // showHeader = () => {
  //   if(window.scrollY > 0){
  //     this.setState({showHeader: true});
  //   }else{
  //     this.setState({showHeader: false});
  //   }
  // }
  // showAndHideDrawler = () => {
  //   this.setState({ visible: !this.state.visible})
  // };

  showHeadrButton = () => {
    if (Cookies.get('user_token')) {
      return <Dropdown overlay={menu} placement="bottomLeft">
        <Button type="primary" style={{
          backgroundColor: 'black',
          color: 'white',
          marginTop: '15px',
          boxShadow: 'none',
          float: 'right'
        }}><Icon type="user"  style={{ fontSize: '20px'}}/></Button>
      </Dropdown>
    }
    else {
      return (
        <Button type="primary"
          style={{
            backgroundColor: 'black',
            color: 'white',
            marginTop: '15px',
            boxShadow: 'none',
            float: 'right'
          }}>
          <Link to="/login">Đăng nhập</Link>
        </Button>
      )
    }
  }
  showHeadrButton2 = () => {
    if (Cookies.get('user_token')) {
      return <Button type="link"
        style={{
          color: 'white',
          marginTop: '15px',
          boxShadow: 'none',
          float: 'right',
          marginRight: 20,
          width: 50
        }}>
        <Link to="/cart" >
        <Badge count={this.showCount()} showZero>
        <Icon type="shopping-cart" style={{ fontSize: '30px'}}/>
        </Badge>
        </Link>
      </Button>
    }
    else {
      return (
        <Button type="primary"
          style={{
            backgroundColor: 'black',
            color: 'white',
            marginTop: '15px',
            boxShadow: 'none',
            float: 'right',
            marginRight: 20,
            width: 100
          }}>
          <Link to="/register" >Đăng ký</Link>
        </Button>
      )
    }
  }

  showCount = () => {
    if (this.props.count){
      return this.props.count + this.state.count
    }
    return this.state.count
  }
  render() {

    return (
      <Layout>
        <Header className="header"
          style={{
            backgroundColor: '#2f2f2f',
            position: 'fixed',
            width: '100%',
            zIndex: 3,
          }}
        >
          <Link to="/" ><span style={{ color: 'white', fontSize: '18px' }}> Book Store</span></Link>
           <Link to="/books" ><span style={{ color: 'white', fontSize: '18px', marginLeft:20 }}>Sản phẩm</span></Link>
          {this.showHeadrButton()}
          {this.showHeadrButton2()}
          {/* <Button 
                icon="menu"
                style={{ 
                    backgroundColor: 'black',
                    color: 'white',
                    marginTop: '15px',
                    boxShadow: 'none',
                    float: 'right'
                  }}
                onClick={this.showAndHideDrawler}
              ></Button> */}
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ float: 'right' }}
          >

          </Menu>
        </Header>
        <Slidebar
          onClose={this.showAndHideDrawler} visible={this.state.visible} />
      </Layout>
    );
  }
}

export default Header2;