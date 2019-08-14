import React from 'react';
import Login from './Login'
import Popup from "reactjs-popup";
import { Animated } from "react-animated-css";
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

class HostingComponent extends React.Component{

    render(){
        return (
            <Popup trigger={<Button variant="contained" color="secondary"
            >
                Sign In
            </Button> } modal >
               { close => (
     
               <Animated animationIn="zoomInRight" animationOut="zoomOutDown" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                     <Login close={close}></Login> 
                    
                </Animated>
                ) }
            </Popup>
      );
    
    }
}


export default HostingComponent;