import React, { Component } from 'react';
import MenuProfile from '../components/header_footer/MenuProfile';
import { Layout, Form, Alert , Input, Button } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
const { Content } = Layout;


class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            message:''
        }

      }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post(`http://127.0.0.1:8000/v1/rest-auth/password/change/`,{
                    old_password: values.old_password,
                    new_password1: values.new_password1,
                    new_password2: values.new_password2,
                } ,{ headers: { "Authorization": `Token  ${Cookies.get('user_token')}` } })
                    .then(res => {
                        window.location("/changepassword")
                    })
                    .catch(error => {
                        this.setState({message:'Đổi mật khẩu không thành công! Vui lòng kiểm tra lại mật khẩu cũ.'});
                    });
            }
        });
    };
    strongValidator = (rule, value, callback) => {
        if (!value.match(/^[a-zA-Z0-9\S]+$/) && value.length > 8) {
            return callback("Mật khẩu không hợp lệ")
        }
        callback()
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('new_password2') && value.length > 8) {
            callback('Mật khẩu không khớp!');
        } else {
            callback();
        }
    };
    comparePassword = (rule, value, callback) => {
        const { form } = this.props;
        if (form.getFieldValue('new_password1') !== value && value) {
            callback('Mật khẩu không khớp!');
        } else {
            callback();
        }
    }

    showMessage = ()=>{
        if(this.state.message){
            return <Alert message={this.state.message} type="error" />
        }
        else 
        return <div></div>
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
                lg: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 8 },
                sm: { span: 8 },
                lg: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 8,
                    offset: 8,
                },
            },
        };
        return (
            <div>
                <MenuProfile tab="3">
                    <Content style={{ margin: '0 16px' }}>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 50 }}>
                            <Form.Item label=" ">
                                {this.showMessage()}
                            </Form.Item>
                            <Form.Item label="Mật khẩu cũ" hasFeedback>
                                {getFieldDecorator('old_password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Mật khẩu không thể để trống',
                                        },
                                        {
                                            min: 8,
                                            message: 'Mật khẩu không thể ít hơn 8 kí tự'
                                        },
                                        { validator: this.strongValidator }
                                    ]
                                })(<Input.Password />)}

                            </Form.Item>
                            <Form.Item label="Mật khẩu" hasFeedback>
                                {getFieldDecorator('new_password1', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Mật khẩu không thể để trống',
                                        },
                                        {
                                            min: 8,
                                            message: 'Mật khẩu không thể ít hơn 8 kí tự'
                                        },
                                        { validator: this.strongValidator },
                                        { validator: this.comparePassword }
                                    ]
                                })(<Input.Password />)}

                            </Form.Item>
                            <Form.Item label="Nhập lại mật khẩu" hasFeedback>
                                {getFieldDecorator('new_password2', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Mật khẩu không thể để trống',
                                        },
                                        {
                                            min: 8,
                                            message: 'Mật khẩu không thể ít hơn 8 kí tự'
                                        },
                                        { validator: this.strongValidator },
                                        { validator: this.compareToFirstPassword }
                                    ]
                                })(<Input.Password />)}

                            </Form.Item>
                            <Form.Item {...tailFormItemLayout} >
                                <Button type="primary" htmlType="submit" className="login-form-button"
                                    block
                                >
                                    Đổi mật khẩu
                                </Button>
                            </Form.Item>
                        </Form>
                    </Content>
                </MenuProfile>
            </div>
        );
    }
}

export default Form.create({ name: 'change_password' })(ChangePassword);