import React, { Component } from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Alert ,
    DatePicker,
    notification,
    Button,
    AutoComplete,
} from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

const InputGroup = Input.Group;
const { Option } = Select;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            message:'',
            user: {}
        }
      }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                axios.put(`http://127.0.0.1:8000/v1/user/${this.state.user.id}/`, {
                    phone: values.phone,
                    address: values.address,
                    first_name: values.first_name,
                    last_name: values.last_name,
                },
                { headers: {"Authorization" : `Token  ${Cookies.get('user_token')}`} } )
                    .then(res => {
                        this.setState({message:''})
                        this.openNotification();
                        setTimeout(function(){
                        window.location.reload()}, 1500);
                    })
                    .catch(error => this.setState({message:'Đổi thông tin không thành công!'}));
            }
        });
    };
    componentDidMount(){
        axios.get(`http://127.0.0.1:8000/v1/me`, { headers: {"Authorization" : `Token  ${Cookies.get('user_token')}`}})
        .then(res => {
        const persons = res.data;
        this.setState({user:persons}) 
        })
        .catch(error => console.log(error));
    }
    showMessage = ()=>{
        if(this.state.message){
            return <Alert message={this.state.message} type="error" />
        }
        else 
        return <div></div>
    };
    openNotification = () => {
        const args = {
          message: 'Cập nhật thông tin',
          description:
            'Cập nhật thông tin hồ sơ thành công.',
          duration: 0,
        };
        notification.open(args);
      };
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 8 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 8 },
                sm: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 8,
                    offset: 0,
                },
                sm: {
                    span: 8,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '84',
        })(
            <Select style={{ width: 70 }}>
                <Option value="84">+84</Option>
            </Select>,
        );
        this.props.form.getFieldDecorator('email', { initialValue: this.state.user.email })
        this.props.form.getFieldDecorator('username', { initialValue: this.state.user.username })
        this.props.form.getFieldDecorator('phone', { initialValue: this.state.user.phone })
        this.props.form.getFieldDecorator('address', { initialValue: this.state.user.address })
        this.props.form.getFieldDecorator('first_name', { initialValue: this.state.user.first_name })
        this.props.form.getFieldDecorator('last_name', { initialValue: this.state.user.last_name })
        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} style ={{marginTop: 50}}>
                    <Form.Item label="">
                        {this.showMessage()}
                    </Form.Item>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'Địa chỉ email không hợp lệ!',
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng điền địa chỉ email!',
                                },
                            ],
                        })(<Input  disabled/>)}
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                Username&nbsp;
                             <Tooltip title="Tên xuất hiện trong thanh toán">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, whitespace: true }],
                        })(<Input disabled />)}
                    </Form.Item>
                    <Form.Item label="Họ">
                        {getFieldDecorator('first_name', {
                            rules: [{ required: true, whitespace: true }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Tên">
                        {getFieldDecorator('last_name', {
                            rules: [{ required: true, whitespace: true }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Số điện thoại">
                        {getFieldDecorator('phone', {
                            rules: [{ required: false, message: 'Vui lòng nhập số điện thoại hợp lệ' }],
                        })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                    </Form.Item>
                    {/* <Form.Item label="Giới tính">
                        <InputGroup compact>
                            <Select defaultValue="Nam">
                                <Option value="Nam">Nam</Option>
                                <Option value="Nu">Nữ</Option>
                            </Select>
                        </InputGroup>
                    </Form.Item> */}
                    <Form.Item label="Địa chỉ">
                        {getFieldDecorator('address', {
                            rules: [{ required: false, whitespace: true }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" block>
                            Chỉnh sửa
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create({ name: 'profile' })(Profile);