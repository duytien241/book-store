import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import Cookies from 'js-cookie';
class ItemHistoryOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
        }
      }
    componentDidMount(){
        console.log(this.props.id)
        axios.get(`http://127.0.0.1:8000/v1/order/` + this.props.id, { headers: { "Authorization": `Token  ${Cookies.get('user_token')}` } })
            .then(res => {
              const data = res.data;
              console.log(data)
              this.setState({ data : data })
            })
            .catch(error => console.log(error));
            console.log(this.state.data)
    }
    render() {
        const columns2 = [
            {
              title: 'Tên sách',
              dataIndex: 'name',
              key: 'name',
              render: text => <a>{text}</a>,
            },
            {
              title: 'Số lượng',
              dataIndex: 'quantity',
              key: 'quantity',
              render: price => {
                return <span style={{ color: 'red' }} >
                  {price}
                </span>
              }
            },
            {
              title: 'Số điện thoại',
              dataIndex: 'phone',
              key: 'phone',
            },
          ];
        return (
            <div>
                <Table style={{ marginTop: 20 }} columns={columns2} dataSource={this.state.data} />
            </div>
        );
    }
}

export default ItemHistoryOrder;