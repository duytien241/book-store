import React, { Component } from 'react';
import { Input } from 'antd';
import axios from 'axios';
const { Search } = Input;

class SearchBox extends Component {
    searchName = (value) =>{
        axios.get(`http://127.0.0.1:8000/v1/books?search=`+value)
            .then(res => {
                const books = res.data;
                this.props.searchName(books)
            })
            .catch(error => console.log(error));
    }
    render() {
        return (
            <div>
                <Search
                    placeholder="Tìm kiếm sách"
                    onSearch={(value) =>this.searchName(value)}
                    size="large"
                    style={{ width: 400 , marginTop: 20, marginBottom: 50, marginLeft: '30%'}}
                />
               
            </div>
        );
    }
}

export default SearchBox;