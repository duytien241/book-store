import React, { Component } from 'react';
import { Form, Radio, Input, Button, Typography } from 'antd';
const { Text } = Typography;
class FormCartStep2 extends Component {
    constructor(props) {
        super(props);
        this.state={
            value: 1,
        }
      }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.props.submitStep3(values)
          }
        });
      };
      onChange = e => {
        this.setState({
          value: e.target.value,
        });
      };
    render() {

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
           
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 24 },
            },
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 10,
              },
            },
          };
          const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="step2">
                    <Form.Item>
                        Tổng tiền: <Text style={{ fontSize: 30, marginLeft:30 }} type="danger">{this.props.totalDue} đ</Text>
                    </Form.Item>
                    <Form.Item>
                    <Radio.Group onChange={this.onChange} value={this.state.value}>
                        <Radio style={radioStyle} value={1}>
                        Thanh toán khi nhận hàng
                        </Radio>
                        <Radio style={radioStyle} value={2}>
                        Thanh toán trực tuyến
                        </Radio>
                    </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Ghi chú cho người giao hàng:">
                        {getFieldDecorator('message', {
                            rules: [{ required: false, message: 'Ghi chú cho người giao hàng:' }],
                        })(
                            <Input
                            />,
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{textAlign:'center'}}>
                            Đặt hàng
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'step2_Form' })(FormCartStep2);