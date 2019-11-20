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
            price_start: 0,
            price_end: 100000000,
            name :'',
            minValue:0,
            maxValue:0,
        }
    };
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/v1/books`)
            .then(res => {
                const books = res.data;
                this.setState({ books: books,maxValue: books.length > 9? 9 : books.length});
            })
            .catch(error => console.log(error));
    }
    onChange = page => {
        this.setState({
            current: page,
            minValue: (page - 1) * 9,
            maxValue: page * 9
        });
    };
    searchType = (value) => {
        this.setState({
            type: value,
        })
    }
    searchPrice = (value1, value2) => {
        this.setState({
            price_start: value1,
            price_end: value2,
        })
    }
    searchName = (value) =>{
        this.setState({books:value})
    }
    getToCart = (value) => {
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
        var printElement = books.slice(this.state.minValue, this.state.maxValue).map((book, index, books) => {
            if (this.state.type == 'all' && this.state.price_start < books[index].price && books[index].price < this.state.price_end)
                return (<Col span={8}  key={index} ><BookCard
                    key={index}
                    getToCart={this.getToCart}
                    id={books[index].id}
                    name={books[index].name}
                    description={books[index].description}
                    src_image={books[index].src_image}
                    price={books[index].price} > < /BookCard></Col>)
            else {
                if(books[index].type == this.state.type && this.state.price_start < books[index].price && books[index].price < this.state.price_end){
                    return (<Col span={8}  key={index}><BookCard
                        key={index}
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
                            <MenuBar searchType={this.searchType} searchPrice={this.searchPrice} >
                                <Layout>
                                    <Content style={{ margin: '0 16px' }}>
                                        {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
                                        <SearchBox searchName={this.searchName} />
                                        <Row gutter={16}>
                                            {printElement}
                                            <Col span={24}>
                                                <Pagination current={this.state.current} onChange={this.onChange} total={this.state.books.length} pageSize={9} style={{ textAlign: 'center', marginBottom:20 }} />
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