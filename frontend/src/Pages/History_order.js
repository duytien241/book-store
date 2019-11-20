import React, { Component } from 'react';
import History from '../components/featured/TableHistory';
import MenuProfile from '../components/header_footer/MenuProfile';

class History_order extends Component {
    render() {
        return (
            <div>
                <MenuProfile tab = "2">
                <History/>
                </MenuProfile>
            </div>
        );
    }
}

export default History_order;