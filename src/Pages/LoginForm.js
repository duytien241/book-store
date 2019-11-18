import React, { Component } from 'react';
import Login from '../components/auth/Login';
import Header2 from '../components/header_footer/Header';
import Footer from '../components/header_footer/Footer';

class LoginForm extends Component {
    render() {
        return (
            <div style={{ backgroundColor: 'White' }}>
                <Header2 />
                <Login/>
                <Footer />
            </div>
        );
    }
}

export default LoginForm;