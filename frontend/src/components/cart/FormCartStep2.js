import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

class FormCartStep2 extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            this.props.submitStep2(values)
          }
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
        this.props.form.getFieldDecorator('address', { initialValue: this.props.address })
        this.props.form.getFieldDecorator('phone', { initialValue: this.props.phone })
        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="step2">
                    <Form.Item label="Địa chỉ">
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: 'Địa chỉ:' }],
                        })(
                            <Input
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label="Số điện thoại">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Số điện thoại:' }],
                        })(
                            <Input
                            />,
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{textAlign:'center'}}>
                            Tiếp tục
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'step2_Form' })(FormCartStep2);