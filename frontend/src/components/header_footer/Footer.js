import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

class Footer extends Component {
    render() {
        return (
            <footer className="bck_black" style={{backgroundColor: 'black'}}>
                <Fade delay={1000}>
                <div className="font_righteous footer_logo_venue">Book Store</div>
                <div className="footer_copyright">
                Nơi tri thức gõ cửa tâm hồn.
                </div>
                </Fade>
                
            </footer>
        );
    }
}

export default Footer;