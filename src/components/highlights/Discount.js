import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import ButtonPurchase from '../utils/ButtonPurchase';

class Discount extends Component {
    state = {
        discountStart: 0,
        discountEnd: 26
    }

    porcentage = () => {
        if(this.state.discountStart < this.state.discountEnd){
            this.setState({
                discountStart: this.state.discountStart + 1,
            })
        }
    }
    componentDidUpdate(){
        setTimeout(()=>{
            this.porcentage();
        },26);
    }

    render() {
        return (
            <div className="center_wrapper">
                <div className="discount_wrapper">
                    <Fade
                        onReveal={() => this.porcentage()}
                    >
                        <div className="discount_porcentage">
                            <span>{this.state.discountStart}%</span>
                            <span></span>
                        </div>
                    </Fade>
                    <div className="discount_description">
                        <h3>26% là tỉ lệ người Việt Nam không đọc sách!</h3>
                        <p>Nếu không tính sách giáo khoa thì Việt Nam mới chỉ đạt 1 cuốn/người/năm. Con số này cho thấy sức đọc của người Việt quá thấp</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Discount;