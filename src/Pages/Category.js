import React, { Component } from 'react';
import Header2 from '../components/header_footer/Header';
import Footer from '../components/header_footer/Footer';
import BookCard from '../components/book/BookCard';
import SearchBox from '../components/featured/SearchBox';
import MenuBar from '../components/header_footer/MenuBar';
import { Layout, Col, Row, Pagination } from 'antd';

const { Content } = Layout;

class Category extends Component {
    constructor(props) {
        super(props);
        this.state={
            current: 1,
        }
      };
    onChange = page => {
        console.log(page);
        this.setState({
          current: page,
        });
      };
    render() {
        return (
            <div>
                <Header2 />
                <MenuBar>
                    <Layout>
                        <Content style={{ margin: '0 16px' }}>
                            {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
                            <SearchBox />
                            <Row gutter={16}>
                                <Col span={8}>
                                    <BookCard />
                                </Col>
                                <Col span={8}>
                                    <BookCard />
                                </Col>
                                <Col span={8}>
                                    <BookCard />
                                </Col>
                                {/* <Col offset={10} style={{marginBottom:10}}> */}
                                <Pagination current={this.state.current} onChange={this.onChange} total={3} pageSize={3} style={{textAlign: 'center'}}/>
                                {/* </Col> */}
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