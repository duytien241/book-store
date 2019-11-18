import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Registrations from '../Pages/Registrations';
import LoginForm from '../Pages/LoginForm';
import Category from '../Pages/Category';
import Cart from '../Pages/Cart';
import ProfilePage from '../Pages/ProfilePage';
import ChangePassword from '../Pages/ChangePassword';
import History_order from '../Pages/History_order';


class Routers extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/register" component={Registrations} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/books" component={Category} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/changepassword" component={ChangePassword} />
                    <Route path="/history_order" component={History_order} />
                </Switch>
            </Router>
        );
    }
}

export default Routers;