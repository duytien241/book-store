import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom';
import ButtonPurchase from '../utils/ButtonPurchase';

class Pricing extends Component {
    state = {
        position: ['Chính trị', 'Khoa học ', ' Lịch sử'],
        desc: [
            "Trau dồi kiến thức về pháp luật, giúp chúng ta trở thành một con người hiểu biết về chính trị, pháp luật của các nước trên thế giới.",
            "Thời đại công nghệ cách mạng 4.0 đang tới gần, thể loại sách này mang đến hiểu biết về công nghệ tiên tiến trên thế giới.",
            "Thông thạo lịch sử chưa bao giờ là thừa, thể loại sách phù hợp cho rất nhiều các bạn trẻ cũng như cần cho tất cả mọi người. "
        ],
        linkto:['https://linktobuy.com'],
        delay: [500,0,500]
    };

    showBoxes = () =>{
        return this.state.position.map((box, i) => (
        <Zoom key={i} delay={this.state.delay[i]}>
            <div className="pricing_item">
            <div className="pricing_inner_wrapper">
                <div className="pricing_title">
                <span>{this.state.position[i]}</span>
                </div>
                <div className="pricing_description">{this.state.desc[i]}</div>
                <div className="pricing_buttons">
                </div>
            </div>
            </div>
        </Zoom>
        ));
    }
    render() {
        return (
            <div className="bck_black">
                <div className="center_wrapper pricing_section">
                <h2>Thể loại sách của chúng tôi</h2>

                <div className="pricing_wrapper">{this.showBoxes()}</div>
                </div>
            </div>
        );
    }
}

export default Pricing;