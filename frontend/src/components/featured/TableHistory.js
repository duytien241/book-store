import React, { Component } from 'react';
import { Table, Button, Tag, Modal } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';


class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      detail: [],
      detail_order :[],
      visible: false,
      id: -1,
      sortedInfo: null,
    }
  }
  handleChange = (pagination, sorter) => {
    this.setState({
      sortedInfo: sorter,
    });
    console.log(this.state.sortedInfo)
  };

  showModal = (id) => {
    this.setState({
      visible: true,
      id: id
    });
    var {detail_order, detail} = this.state;
    detail_order = []
    detail.forEach(element => {
      if(element.order == id){
        detail_order.push(element);
      }
    });
    this.setState({detail_order: detail_order})
    console.log(this.state.detail_order)
  };
  handleOk = e => {
    this.setState({
        visible: false,
    });
};

handleCancel = e => {
    this.setState({
        visible: false,
    });
};

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/v1/orders`, { headers: { "Authorization": `Token  ${Cookies.get('user_token')}` } })
      .then(res => {
        const data = res.data;
        this.setState({ data: data })
          axios.get(`http://127.0.0.1:8000/v1/order/`, { headers: { "Authorization": `Token  ${Cookies.get('user_token')}` } })
            .then(res => {
              const data = res.data;
              this.setState({ detail : data })
              console.log(this.state.detail)
            })
            .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
      var detail = this.state.detail;
  }
  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    const columns = [
      {
        title: 'Ngày đặt',
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
        sorter: (a, b) => a.created_at - b.created_at,
        sortOrder: sortedInfo.columnKey === 'create_at' && sortedInfo.order,
        render: text => <a>{text}</a>,
      },
      {
        title: 'Giá trị đơn hàng',
        dataIndex: 'totalDue',
        key: 'totalDue',
        align: 'center',
        sorter: (a, b) => a.totalDue - b.totalDue,
        sortOrder: sortedInfo.columnKey === 'totalDue' && sortedInfo.order,
        ellipsis: true,
        render: price => {
          return <span style={{ color: 'red' }} >
            {price} đ
          </span>
        }
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
      },
      {
        title: 'Địa chỉ nhận hàng',
        dataIndex: 'ship_address',
        key: 'ship_address',
        align: 'center',
      },
      {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        align: 'center',
        render: status => {
          if (status === 'Đơn bị hủy') {
            return <span style={{ color: 'red' }} >
              {status}
            </span>
          }
          return <span style={{ color: 'green' }} >
            {status}
          </span>
        }
      },
      {
        title: '',
        key: 'action',
        render: (record) => (
          <span>
            <Button type="link" onClick={()=>this.showModal(record.id)} >Xem chi tiết đơn hàng</Button>
          </span>
        ),
      },
    ];
const columns2 = [
            {
              title: 'Tên sách',
              dataIndex: 'name',
              key: 'name',
              align: 'center',
              render: text => <a>{text}</a>,
            },
            {
              title: 'Số lượng',
              dataIndex: 'quantity',
              key: 'quantity',
              align: 'center',
              render: price => {
                return <span style={{ color: 'red' }} >
                  {price}
                </span>
              }
            },
            {
              title: 'Ảnh',
              dataIndex: 'image',
              key: 'image',
              render: image => {
                return <img  width="100" height="100"  src={window.location.origin+"/images/books/" +image} />
              }
            },
          ];
    return (
      <div>
        <Table style={{ marginTop: 20 }} columns={columns} dataSource={this.state.data} onChange={this.handleChange} />
        <Modal
          title="Tiến hành đặt hàng"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width = {920}
          footer={null}
        >
          <Table style={{ marginTop: 20 }} columns={columns2} dataSource={this.state.detail_order} pagination={false}  />
        </Modal>
      </div>
    );
  }
}

export default History;