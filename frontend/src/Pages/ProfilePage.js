import React, { Component } from 'react';
import Profile from '../components/profile/Profile';
import MenuProfile from '../components/header_footer/MenuProfile';


class ProfilePage extends Component {
    render() {
        return (
            <div>
                <MenuProfile tab = "1">
                    <Profile />
                </MenuProfile>
            </div>
        );
    }
}

export default ProfilePage;