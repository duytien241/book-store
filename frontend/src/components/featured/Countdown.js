import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';

class Countdown extends Component {
    state = {
        deadline: 'Oct, 12, 2019',
        days:'0',
        hours:'0',
        mins:'0',
        sec:'0'
    }

    getTime(deadline){
        var time = Date.parse(deadline) - Date.parse(new Date());
        if(time < 0){

        }else {
            time = time/1000;
            this.setState({
                days: Math.floor(time/ (60*60*24)),
                hours: Math.floor((time%(3600*24))/3600),
                mins: Math.floor((time%(3600))/(60)),
                sec: Math.floor(time%60)
            })
        }
    }

    componentDidMount(){
        setInterval(()=>this.getTime(this.state.deadline),100)
    }
    render() {
        return (
            <Slide left dalay={1000}>
                <div className="countdown_wrapper">
                    <div className="countdown_top">
                        Events start in
                    </div>
                    <div className="countdown_bottom">
                        <div className="countdown_item">
                            <div className="countdown_time">
                                {this.state.days}
                            </div>
                            <div className="countdown_tag">
                                    Days
                            </div>
                        </div>
                        <div className="countdown_item">
                            <div className="countdown_time">
                                {this.state.hours}
                            </div>
                            <div className="countdown_tag">
                                Hours
                            </div>
                        </div>
                        <div className="countdown_item">
                            <div className="countdown_time">
                                {this.state.mins}
                    </div>
                            <div className="countdown_tag">
                                Minutes
                    </div>
                        </div>
                        <div className="countdown_item">
                            <div className="countdown_time">
                                {this.state.sec}
                            </div>
                            <div className="countdown_tag">
                                Seconds
                            </div>
                        </div>
                    </div>
                </div>
            </Slide>

        );
    }
}

export default Countdown;