import React from 'react';

import Avatar from 'react-avatar';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import '../user/user.css'
import Modal from 'react-responsive-modal';
import { blue } from '@material-ui/core/colors';
import avatar from '../../logos/avatarRick.png';
import {Link} from 'react-router-dom';

  

class User extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        userId: "",
        userName: "",
        userPhoto: avatar,
        file: "",
        imagePreviewUrl: "",
        open: false,
    }

    componentDidMount() {
        this.setState({
            userName: sessionStorage.getItem("myname"),
            userId: sessionStorage.getItem("myid"),
            userPhoto: sessionStorage.getItem("myphotourl") ? avatar : sessionStorage.getItem("myphotourl"),
            userEmail: sessionStorage.getItem('useremail')
        })
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                userPhoto: reader.result
            }, console.log(file));
        }

        reader.readAsDataURL(file)
    }
    readValue() {
        let x = sessionStorage.getItem("myname");
        let y = sessionStorage.getItem("myid");
        let z = sessionStorage.getItem("myphotourl");

        console.log(x, y, z);
    }
    render() {
        const { open } = this.state;
        return (
            <div className='user-conteiner'>
                <div className="container emp-profile">
            <form method="post">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src={this.state && this.state.userPhoto}/>
                            <div className="file btn btn-lg btn-primary">
                                Change Photo
                                
                                <input className="fileInput"
                    type="file" onChange={(e) => this._handleImageChange(e)}
                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <div className='user-name'>
                                    {this.state.userName}
                                    </div>
                                    <p className="proile-rating">BOOK LOVER</p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <div className="nav-link active">About</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">
                        <div className="col-md-2">
                    
                    </div>
                            <Link to='/addbook'><Button variant="contained" size="large" color="primary">
          ADD BOOK
        </Button></Link>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.userId}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.userName}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{this.state.userEmail}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
        
            </div>
        );
    }
}

export default User