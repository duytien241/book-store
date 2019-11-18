import React, { Component } from 'react';
import { Input } from 'antd';

const { Search } = Input;

class SearchBox extends Component {
    render() {
        return (
            <div>
                <Search
                    placeholder="Tìm kiếm sách"
                    onSearch={value => console.log(value)}
                    size="large"
                    style={{ width: 400 , marginTop: 20, marginBottom: 50, marginLeft: '30%'}}
                />
               
            </div>
        );
    }
}

export default SearchBox;