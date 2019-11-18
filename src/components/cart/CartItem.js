import React, { Component } from 'react';
import { Card, Row, Col, InputNumber } from 'antd';

class CartItem extends Component {
    onChange = (value) => {
        console.log('changed', value);
      }
    render() {
        return (
            <div>
            
                <Row>
                    <Col span={2} offset={2} >
                    <img
                        style={{ height: 80 , marginLeft: 10}}
                        alt="example"
                        src="https://sachvui.com/cover/2015/Dac-nhan-tam.jpg"
                    />
                    </Col>
                    <Col span={8} style={{marginTop:15}}>
                        Đắc nhân tâm
                        <p>Tác giả</p>
                    </Col>
                    <Col span={2} offset={4} style={{marginTop:15}}>
                        Giá sản phẩm
                    </Col>
                    <Col span={4} offset={2} style={{marginTop:15}}>
                        <InputNumber min={1} max={10} defaultValue={1} onChange={this.onChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={20} offset={2}>
                    <hr/>
                    </Col>
                </Row>
                {/* <div style={{width:1000, textAlign:'center'}}>
                    <hr/>
                </div> */}
            </div>
        );
    }
}

export default CartItem;