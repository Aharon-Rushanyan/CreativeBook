import React from 'react';
import Login from './login/Login'
import Popup from "reactjs-popup";
import { Animated } from "react-animated-css";
class HostingComponent extends React.Component {

    render() {
        return (
            <Popup trigger={<button className="button"> Open Modal </button>} modal>
                <Animated animationIn="zoomInRight" animationOut="zoomOutDown" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                    <Login />
                </Animated>
                <div className="actions">
                </div>
            </Popup>

        );

    }
}
export default HostingComponent;