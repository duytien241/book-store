import React, { Component } from 'react';
import {Button} from 'antd';
class ButtonPurchase extends Component {
    render() {
        return (
            <div>
                <Button type="danger" shape="round">
                    Mua sách ngay nào ->
                </Button>
            </div>
        );
    }
}

export default ButtonPurchase;