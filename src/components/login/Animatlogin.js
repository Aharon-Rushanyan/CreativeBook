import React from 'react';
import Login from './Login'
import Popup from "reactjs-popup";
import { Animated } from "react-animated-css";
import MenuItem from '@material-ui/core/MenuItem'
function HostingComponent() {


    return (
        <Popup trigger={<MenuItem className="button">My Profile</MenuItem>} modal >
            <Animated animationIn="zoomInRight" animationOut="zoomOutDown" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                <Login />
            </Animated>
        </Popup>

    );


}
export default HostingComponent;