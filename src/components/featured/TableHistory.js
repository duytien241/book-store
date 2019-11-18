import React, { Component } from 'react';
import { Table, Divider, Tag } from 'antd';

const columns = [
  {
    title: 'Tên sách',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    render: price =>{
      return <span style={{color:'red'}} >
        {price} đ
      </span>
    }
  },
  {
    title: 'Địa chỉ nhận hàng',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Trạng thái',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = 'green';
          if (tag === 'Đơn bị hủy') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (text, record) => (
  //     <span>
  //       <a>Invite {record.name}</a>
  //       <Divider type="vertical" />
  //       <a>Delete</a>
  //     </span>
  //   ),
  // },
];

const data = [
  {
    key: '1',
    name: 'Nhà giả kim',
    price: 32000,
    address: 'Số 1 Đại Cồ việt',
    tags: ['Đã giao hàng'],
  },
  {
    key: '2',
    name: 'Nhập môn ATTTT',
    price: 42000,
    address: 'Số 1 Đại Cồ việt',
    tags: ['Đơn bị hủy'],
  },
  {
    key: '3',
    name: 'Đắc nhân tâm',
    price: 32000,
    address: 'Số 1 Đại Cồ việt',
    tags: ['Đã giao hàng'],
  },
];


class History extends Component {
    
    render() {
        return (
            <div>
                <Table style={{marginTop:20}} columns={columns} dataSource={data} />
            </div>
        );
    }
}

export default History;