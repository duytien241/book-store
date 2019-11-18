import React, { Component } from 'react';
import Header2 from '../components/header_footer/Header';
import Footer from '../components/header_footer/Footer';
import BookCard from '../components/book/BookCard';
import SearchBox from '../components/featured/SearchBox';
import MenuBar from '../components/header_footer/MenuBar';
import { Layout, Col, Row, Pagination } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
const { Content } = Layout;

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            books: [],
            type: 'all',
            count: 0,
            user: null
        }
    };
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/v1/books`)
            .then(res => {
                const books = res.data;
                this.setState({ books: books });
                console.log(books)
            })
            .catch(error => console.log(error));
    }
    onChange = page => {
        this.setState({
            current: page,
        });
    };
    searchType = (value) => {
        this.setState({
            type: value,
        })
    }
    getToCart = (value) => {
        axios.get(`http://127.0.0.1:8000/v1/me`, { headers: {"Authorization" : `Token  ${Cookies.get('user_token')}`} })
            .then(res => {
                this.setState({user: res.data})
            })
            .catch(error => console.log(error));
        axios.post(`http://127.0.0.1:8000/v1/cart/`, {
            book: value,
            quantity: 1,
            user: 1,
        },
        { headers: {"Authorization" : `Token  ${Cookies.get('user_token')}`} })
            .then(res => {
                this.setState({count:this.state.count + 1})
            })
            .catch(error => console.log(error));
    }
    render() {
        var { books } = this.state;
        var printElement = books.map((book, index, books) => {
            var key = localStorage.getItem('key');
            if (this.state.type == 'all')
                return (<Col span={8}><BookCard
                    key={key}
                    getToCart={this.getToCart}
                    id={books[index].id}
                    name={books[index].name}
                    description={books[index].description}
                    src_image={books[index].src_image}
                    price={books[index].price} > < /BookCard></Col>)
            else {
                if(books[index].type == this.state.type){
                    return (<Col span={8}><BookCard
                        key={key}
                        getToCart={this.getToCart}
                        id={books[index].id}
                        name={books[index].name}
                        description={books[index].description}
                        src_image={books[index].src_image}
                        price={books[index].price} > < /BookCard></Col>)
                }
                }
            });
        return (
            <div>
                            <Header2 count = {this.state.count}></Header2>
                            <MenuBar searchType={this.searchType} >
                                <Layout>
                                    <Content style={{ margin: '0 16px' }}>
                                        {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
                                        <SearchBox />
                                        <Row gutter={16}>
                                            {printElement}
                                            <Col span={24}>
                                                <Pagination current={this.state.current} onChange={this.onChange} total={3} pageSize={3} style={{ textAlign: 'center' }} />
                                            </Col>
                                        </Row>
                                    </Content>
                                </Layout>
                            </MenuBar>
                            <Footer />
                        </div>
                        );
                    }
                }
                
export default Category;