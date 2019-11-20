import React, { Component } from 'react';
import { Button, Card, Row, Col, Form, Input, Tooltip, Icon, Alert } from 'antd';
import {  Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import book_cover from '../../resources/images/book_cover.jpg';
import axios from 'axios';

class Register extends Component {
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
                axios.post(`http://127.0.0.1:8000/v1/users`, {
                    email: values.email,
                    password: values.password
                })
                    .then(res => {
                        axios.post(`http://127.0.0.1:8000/v1/rest-auth/login/`, {
                            username: values.email,
                            password: values.password
                        })
                            .then(res => {
                                Cookies.set('user_token', res.data.key)
                                window.location="/profile";
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(error => this.setState({message:'Đăng ký không thành công!'}));
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
                sm: { span: 8 },
                lg: { span: 8 },
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
                    offset: 10,
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
                    offset: 8,
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
                    <Card title="Đăng ký tài khoản" style={{ width: window.innerWidth / 2.5, marginTop: `150px` }}>
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
                            <Form.Item label="Mật khẩu" hasFeedback>
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
                            <Form.Item label="Nhập lại mật khẩu" hasFeedback>
                                {getFieldDecorator('confirm', {
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
                                <Button type="primary" htmlType="submit">
                                    Đăng ký
                                </Button>

                            </Form.Item>
                            <hr />
                            <p style={{ textAlign: "center" }} >
                                Nếu bạn đã có tài khoản hãy <Link to="/login" >đăng nhập</Link>
                            </p>
                        </Form>
                    </Card>
                </Col>
            </Row>
        );
    }
}
const RegisterForm = Form.create({ name: 'register' })(Register);

export default RegisterForm;