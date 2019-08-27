import React from "react";
import Button from "@material-ui/core/Button";
import "../user/user.css";
import avatar from "../../logos/avatarRick.png";
import { Link } from "react-router-dom";
import firebase from "../Firebase/Firebase";
import SignUp from '../signup/signup'

class User extends React.Component {
  state = {
    userDate: "",
    userName: "",
    userPhoto: "",
    file: "",
    imagePreviewUrl: "",
    open: false
  };

  componentDidMount() {
    this.setState({
      userName: sessionStorage.getItem("myname"),
      userDate: sessionStorage.getItem("userdate"),
      userEmail: sessionStorage.getItem("useremail")
    });
    const storageRef = firebase.storage().ref();
    storageRef
      .child("profilePhotos/" + sessionStorage.getItem("myid") + "_avatar.jpg")
      .getDownloadURL()
      .then(url => {
        let photo = url;

        this.setState({
          userPhoto: photo
        });
      })
      .catch(error => {
        switch (error.code) {
          case "storage/object-not-found":
            console.log("avatar not set");
            this.setState({
              userPhoto: avatar
            });
            break;
        }
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
      const storageRef = firebase.storage().ref();
      storageRef
        .child(
          "profilePhotos/" + sessionStorage.getItem("myid") + "_avatar.jpg"
        )
        .put(this.state.file);

      let photo =
        "profilePhotos/" + sessionStorage.getItem("myid") + "_avatar.jpg";

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
    };

    reader.readAsDataURL(file);
  }

  render() {
    return (sessionStorage.getItem("myid")?<div className="user-conteiner">
    <div className="container emp-profile">
      <form method="post">
        <div className="row">
          <div className="col-md-4">
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
                    <label>Registered On</label>
                  </div>
                  <div className="col-md-6">
                    <p>{this.state.userDate}</p>
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
  </div>:<SignUp/>
      
    );
  }
}

export default User;
