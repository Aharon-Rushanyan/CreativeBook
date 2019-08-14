import React from 'react';

import Avatar from 'react-avatar';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';


class User extends React.Component {
    state = {
        userId: "",
        userName: "",
        userPhoto: "https://cdn2.iconfinder.com/data/icons/avatar-profile/449/avatar_user_default_cardigan_contact_profile-512.png",
        file: "",
        imagePreviewUrl: "",
    }

    componentDidMount() {
        this.setState({
            userName: sessionStorage.getItem("myname"),
            userId: sessionStorage.getItem("myid"),
            userPhoto: sessionStorage.getItem("myphotourl")
        })
    }
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
        return (<div>
            <Avatar className="avatar" size="200"
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
            <Button
                style={{ left: '250px', top: '28px' }}
                variant="contained"
                color="primary"
                onClick={() => this.readValue()}
            >
                Save
         </Button>
        </div>
        );
    }
}

export default User