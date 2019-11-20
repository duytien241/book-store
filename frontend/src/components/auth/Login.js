import React, { Component } from 'react';
import { Button, Card, Row, Col, Form, Input, Tooltip, Icon, Checkbox, Alert } from 'antd';
import {  Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import book_cover from '../../resources/images/book_cover.jpg';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            message:'',
        }
      }
    componentDidMount(){
        if(Cookies.get('user_token')){
            window.location.href= "/";
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.post(`http://127.0.0.1:8000/v1/rest-auth/login/`, {
                    username: values.email,
                    password: values.password
                })
                    .then(res => {
                        Cookies.set('user_token', res.data.key)
                        window.location = "/profile";
                    })
                    .catch(error =>  this.setState({message:'Đăng nhập không thành công!'}));
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
        if (value && value !== form.getFieldValue('password') && value.length > 8) {
            callback('Mật khẩu không khớp!');
        } else {
            callback();
        }
    };
    comparePassword = (rule, value, callback) => {
        const { form } = this.props;
        if (form.getFieldValue('password') !== value && value) {
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
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
                lg: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
                lg: { span: 14 },
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
                    offset: 6,
                },
            },
        };
        const CenterFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 6,
                },
                sm: {
                    span: 19,
                    offset: 6,
                },
            },
        };
        const tailFormItemLayout2 = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        return (
            <Row
                type="flex"
                justify="center"
                style={{ backgroundImage: `url(${book_cover})`, width: window.width, height: window.outerHeight }}
            >
                <Col>
                    <Card title="Đăng nhập" style={{ width: window.innerWidth / 2.5, marginTop: `150px` }}>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                            <Form.Item {...tailFormItemLayout2}>
                                {this.showMessage()}
                            </Form.Item>
                            <Form.Item label={
                                <span>
                                    Email&nbsp;
                                    <Tooltip title="Email dùng để đăng nhập tài khoản">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'Định dạng email không đúng!',
                                        },
                                        {
                                            required: true,
                                            message: 'Vui lòng điền email!',
                                        },
                                    ],
                                })(<Input />)}
                            </Form.Item>
                            <Form.Item label="Mật khẩu" hasFeedback style={{ marginBottom: 5 }}>
                                {getFieldDecorator('password', {
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
                            <Form.Item {...CenterFormItemLayout} style={{ marginBottom: 5 }}>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>Ghi nhớ đăng nhập</Checkbox>)}
                                <a href="" style={{ marginLeft: '40px' }}>
                                    Quên mật khẩu
                                </a>
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout} >
                                <Button type="primary" htmlType="submit" className="login-form-button"
                                    style={{ width: '290px' }}
                                >
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                            <hr />
                            <p style={{ textAlign: "center" }} >
                                Nếu bạn đã có tài khoản hãy <Link to="/register">đăng ký</Link>
                            </p>
                        </Form>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Form.create({ name: 'normal_login' })(Login);