import React, { Component } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import photo1 from "../../logos/harutn.jpg"
import photo2 from "../../logos/Narekn.jpg"
import photo3 from "../../logos/zvartn.jpg"
import photo4 from "../../logos/aharon.jpg"
export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="links-list">
                    <Link to="/aboutus">
                        <div>
                            <h2 className="link-title">
                                About Us
                            </h2>
                        </div>
                    </Link>
                    <Link to="/products">
                        <div><h2 className="link-title">
                            Products
                        </h2></div>
                    </Link>
                </div>
                <div className="social-icons">
                    <div>Follow Us on Social Networks</div>
                   

                    <div className="flex-container2">
                    <a href='https://www.facebook.com/Harut050' target="blank">
                            <img   style={{
                                borderRadius: '50%',
                                margin:"5px",
                                width: "50px",
                                height: "50px"
                            }} src={photo1}  /> </a>
                       <a href='https://www.facebook.com/narekgevdav' target="blank">
                            <img   style={{
                                borderRadius: '50%',
                                margin:"5px",
                                width: "50px",
                                height: "50px",
                            }} src={photo2}  /> </a>
                           <a href='https://www.facebook.com/zvart.manukyan' target="blank">
                            <img   style={{
                                borderRadius: '50%',
                                margin:"5px",
                                width: "50px",
                                height:"50px",
                            }} src={photo3}  /> </a>
                           <a href='https://www.facebook.com/rushanyan.aharon' target="blank">
                            <img   style={{
                                borderRadius: '50%',
                                margin:"5px",
                                width: "50px",
                                height: "50px",
                            }} src={photo4}  /> </a>
                        </div>
                </div>
                <div className="copyright">
                    <div className="copyright-text">&copy;2019 Green Book: All Rights Reserved</div>
                    <div className='d-flex align-content-around'>
                        <Link to="/privacy">
                            <div><h2 className="link-title">
                                Privacy Policy
                            </h2></div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}