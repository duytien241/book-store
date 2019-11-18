import React, { Component } from 'react';
import RegisterForm from '../components/auth/Register';
import Header2 from '../components/header_footer/Header';
import Footer from '../components/header_footer/Footer';
class Registrations extends Component {
    render() {
        return (
            <div style={{ backgroundColor: 'White'}}>
                <Header2 />
                <RegisterForm></RegisterForm>
                <Footer/>
            </div>
        );
    }
}

export default Registrations;