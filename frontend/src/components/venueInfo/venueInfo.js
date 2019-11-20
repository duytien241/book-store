import React, { Component } from 'react';
import icon_calendar from '../../resources/images/icons/calendar.png';
import icon_location from '../../resources/images/icons/location.png';
import Zoom from 'react-reveal/Zoom';
import ButtonPurchase from '../utils/ButtonPurchase';


class VunueInfo extends Component {
    render() {
        return (
            <div>
                <div className="bck_black">
                    <div className="center_wrapper">
                        <div className="vn_wrapper">
                            <Zoom duration={500}>
                                <div className="vn_item">
                                    <div className="vn_outer">
                                        <div className="vn_inner">
                                            <div className="vn_icon_square bck_red">
                                            </div>
                                            <div
                                                className="vn_icon"
                                                style={{
                                                    background: `url(${icon_calendar})`
                                                }}
                                            ></div>
                                            <div className="vn_title">
                                                Tổng số lượng sách
                                            </div>
                                            <div className="vn_desc">
                                                Hơn 1000 cuốn sách hiện có trong cửa hàng
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                            <Zoom duration={500} delay={300}>
                                <div className="vn_item">
                                    <div className="vn_outer">
                                        <div className="vn_inner">
                                            <div className="vn_icon_square bck_yellow">
                                            </div>
                                            <div
                                                className="vn_icon"
                                                style={{
                                                    background: `url(${icon_location})`
                                                }}
                                            ></div>
                                            <div className="vn_title">
                                                Đặt hàng
                                            </div>
                                            <div className="vn_desc">
                                                Giao hàng nhanh, chế độ hỗ trợ tận tình
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Zoom> 
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default VunueInfo;