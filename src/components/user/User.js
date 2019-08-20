import React from "react";

import Avatar from "react-avatar";

import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import "../user/user.css";
import Modal from "react-responsive-modal";
import { blue } from "@material-ui/core/colors";
import avatar from "../../logos/avatarRick.png";
import { Link } from "react-router-dom";
import firebase from "../Firebase/Firebase";

class User extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    userId: "",
    userName: "",
    userPhoto: avatar,
    file: "",
    imagePreviewUrl: "",
    open: false
  };

  componentDidMount() {
    const storageRef = firebase.storage().ref();
    storageRef
      .child("profilePhotos/" + sessionStorage.getItem("myid") + "_avatar.jpg")
      .getDownloadURL()
      .then(url => {
        let photo = url;

        sessionStorage.myphotourl = photo;
        this.setState({
          userName: sessionStorage.getItem("myname"),
          userId: sessionStorage.getItem("myid"),
          userPhoto: sessionStorage.getItem("myphotourl")
        });
      });
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
      this.setState(
        {
          file: file,
          userPhoto: reader.result
        },
        console.log(file)
      );
    };

    reader.readAsDataURL(file);
  }
  readValue() {
    let x = sessionStorage.getItem("myname");
    let y = sessionStorage.getItem("myid");
    let z = sessionStorage.getItem("myphotourl");
    const storageRef = firebase.storage().ref();
    storageRef.child("profilePhotos/" + y + "_avatar.jpg").put(this.state.file);

    let photo = "profilePhotos/" + y + "_avatar.jpg";

    const user = firebase.auth().currentUser;
    if (user !== null) {
      user.updateProfile({
        photoURL: photo
      });
    }

    storageRef
      .child(photo)
      .getDownloadURL()
      .then(function(url) {
        sessionStorage.myphotourl = url;
      });

    console.log(x, y, user.photoURL);
  }
  render() {
    const { open } = this.state;
    return (
      <div className="user-conteiner">
        {/* <Avatar className="avatar" size="200"
                    src={this.state.userPhoto}
                />

                <input className="fileInput"
                    type="file" onChange={(e) => this._handleImageChange(e)}
                />
                <TextField
                    style={{ right: "250px" }}
                    disabled
                    //    onChange={mylogin}
                    label={this.state.userName}
                    name='name'
                    defaultValue=""
                />
                <div>{console.log(this.props.location.foundBook)}</div>
                <Button
                    style={{ left: '250px', top: '28px' }}
                    variant="contained"
                    color="primary"
                    onClick={() => this.readValue()}
                >
                    Save
         </Button>

                <div class="row">
                    <div className="col-lg-5">
                        <div className="media">
                            <a className="pull-left" href="#">
                                <img className="media-object dp img-circle"
                                    src={this.state.userPhoto}
                                    style={{ width: "300px", height: "300px" }}></img>
                            </a>
                            <div class="media-body">
                            </div>
                        </div>
                    </div>
                </div>







                <div className="container">
                    <div className="row">
                        <div className="panel panel-default">
                            <div className="panel-heading">  <h4 >User Profile</h4></div>
                            <div className="panel-body">
                                <div className="col-md-4 col-xs-12 col-sm-6 col-lg-4">
                                    <div class="row">
                                        <div className="col-lg-5">
                                            <div className="media">
                                                <a className="pull-left" href="#">
                                                    <img className="media-object dp img-circle"
                                                        src={this.state.userPhoto}
                                                        style={{ width: "300px", height: "300px" }}></img>
                                                </a>
                                                <div class="media-body">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-8 col-xs-12 col-sm-6 col-lg-8" >
                                    <div className="container" >
                                        <h2>John Doe</h2>
                                        <p>an   <b> Employee</b></p>

                                    </div>
                                </div>

                                <ul class="container details" >
                                    <li><p><span className="glyphicon glyphicon-user one"
                                        style={{ width: "50px" }}></span>i.rudberg</p></li>
                                    <li><p><span className="glyphicon glyphicon-envelope one"
                                        style={{ width: "50px" }}></span>somerandom@email.com</p></li>
                                </ul>

                                <div className="col-sm-5 col-xs-6 tital " >Date Of Joining: 15 Jun 2016</div>
                            </div>
                        </div>
                    </div>
                </div>





                <div class="container">
                    <div class="d-flex justify-content-center h-100">
                        <div class="image_outer_container">
                            <div class="green_icon"></div>
                            <div class="image_inner_container">
                                <div class="row">
                                    <div className="col-lg-5">
                                        <div className="media">
                                            <a className="pull-left" href="#">
                                                <img className="media-object dp img-circle"
                                                    src={this.state.userPhoto}
                                                    style={{ width: "200px", height: "200px" }}></img>
                                            </a>
                                            <div class="media-body">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                <div class="container">
                    <div class="d-flex justify-content-center h-100">
                        <div class="image_outer_container">
                            <div class="green_icon"></div>
                            <div class="image_inner_container">
                                <img src={this.state.userPhoto}>
                                </img></div>
                        </div>
                    </div>
                </div>



                <Avatar className="avatar" size="200"
                    src={this.state.userPhoto}
                />

                <input className="fileInput"
                    type="file" onChange={(e) => this._handleImageChange(e)}
                />

                <div>
                    <div class="container">
                        <div class="d-flex justify-content-center h-100">
                            <div class="image_outer_container">
                                <div class="green_icon"></div>
                                <div class="image_inner_container">
                                    <img className="media-object dp img-circle"
                                        onClick={this.onOpenModal} src={this.state.userPhoto}>
                                    </img></div>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.onOpenModal}>Open modal</button>
                    <Modal className="myModal" open={open} onClose={this.onCloseModal} center>
                        <img className="media-object dp img-circle"
                            src={this.state.userPhoto}
                            style={{ width: "400px", height: "400px" }}></img>
                    </Modal>
                </div>
             */}
        <div className="container emp-profile">
          <form method="post">
            <div className="row">
              <div class="col-md-4">
                <div className="profile-img">
                  <img src={this.state && this.state.userPhoto} />
                  <div className="file btn btn-lg btn-primary">
                    Change Photo
                    <input
                      className="fileInput"
                      type="file"
                      onChange={e => this._handleImageChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <div className="user-name">{this.state.userName}</div>
                  <p class="proile-rating">BOOK LOVER</p>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <div className="nav-link active">About</div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div class="col-md-2">
                        <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                    </div> */}
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">
                  <div className="col-md-2" />
                  <Link to="/addbook">
                    <Button variant="contained" size="large" color="primary">
                      ADD BOOK
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="col-md-8">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
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
                    <div className="row" />
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

export default User;
