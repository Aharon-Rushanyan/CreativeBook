import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../Firebase/Firebase'
import './style.css';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Link} from 'react-router-dom';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class AddBook extends React.Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        comments: [],
        rate: 5,
        status: 1,
        currentPage: 10,
        err: '',
        open: false,
    }

    updateInput = (event) => this.setState({ [event.target.name]: event.target.value })

    handleAddClick = () => {
        if (!this.state.ISBN || !this.state.title || !this.state.author || !this.state.description ||
            !this.state.pages || !this.state.imageUrl) {
                this.setState({
                    err: "Please fill all the fields",
                    open: true
                })
        }else{
            const db = firebase.firestore();
            const booksRef = db.collection("bookslibrary").doc(this.state.ISBN);
            // const userId = firebase.auth().currentUser.uid;
            const userId = 55545454
            this.setState({
                userId
            })
            booksRef.set({
                ...this.state,
    
                title: this.state.title.toLowerCase()
            });
        }     
    }


    render() {
        return (
            <div className='bookWrappers'>
                {/* <Grid/> */}

                <br />
                <TextField
                    label="Title *"
                    margin="dense"
                    name='title'
                    onChange={this.updateInput}
                    className='textfield'
                />
                <br />
                <TextField
                    label="Author *"
                    name='author'
                    margin="dense"
                    onChange={this.updateInput}
                    className='textfield'
                />
                <br />
                <TextField
                    label="Pages *"
                    name='pages'
                    margin="dense"
                    onChange={this.updateInput}
                    className='textfield'
                />
                <br />
                <TextField
                    label="ImageUrl *"
                    name='imageUrl'
                    margin="dense"
                    onChange={this.updateInput}
                    className='textfield'
                />
                <br />
                <TextField
                    label="ISBN *"
                    name='ISBN'
                    margin="dense"
                    onChange={this.updateInput}
                    className='textfield'
                />
                <br />
                <TextField
                    // id="outlined-multiline-static"
                    label="Description *"
                    name='description'
                    multiline
                    rows="4"
                    margin="normal"
                    variant="outlined"
                    className='textfieldM'
                    onChange={this.updateInput}
                />
                <br />
                <Link style={{textDecoration: 'none', color: 'initial'}} to={!this.state.ISBN || !this.state.title || !this.state.author || !this.state.description ||
                !this.state.pages || !this.state.imageUrl?'addbook':`book/${this.state.ISBN}`}>
                <Button
                    variant="contained" size="large" color="primary"
                    onClick={this.handleAddClick}
                    className='button'
                >
                    Upload
                    <CloudUploadIcon style={{marginLeft:'10px'}}/>
                </Button>
                </Link>
                <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={this.state.open}
        autoHideDuration={2000}
        onClose={() => this.setState({open: false})}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{this.state.err}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => this.setState({open: false})}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
                
            </div>);
    }
}

export default AddBook;