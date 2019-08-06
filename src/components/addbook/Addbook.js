import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebase from '../Firebase/Firebase'

class AddBook extends React.Component {
    state = {
        startDate: new Date(),
        endDate: new Date(),
        comments: [],
        rate: 5,
        status: 1,
        currentPage: 10,
    }

    updateInput = (event) => this.setState({ [event.target.name]: event.target.value })

    handleAddClick = () => {
        if(!this.state.ISBN || !this.state.title || !this.state.author || !this.state.description || 
        !this.state.pages || !this.state.imageUrl){
            return alert('chexav')
        }
        const db = firebase.firestore();
        const booksRef = db.collection("bookslibrary").doc(this.state.ISBN);
        // const userId = firebase.auth().currentUser.uid;
        const userId = 55545454
        this.setState({
            userId
        })
        booksRef.set({
            ...this.state
        });
    }


    render() {
        return (
            <div className='bookWrappers'>
                <br/>
                <TextField
                    label="Title *"
                    margin="dense"
                    name='title'
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    label="Author *"
                    name='author'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    label="Description *"
                    name='description'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    label="Pages *"
                    name='pages'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    label="ImageUrl *"
                    name='imageUrl'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    label="ISBN *"
                    name='ISBN'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <Button
                    variant="contained"
                    component="span"
                    className=''
                    onClick={this.handleAddClick}
                >
                    Upload
                </Button>
            </div>);
    }
}

export default AddBook;