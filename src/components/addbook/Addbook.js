import React from 'react';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import firebase from 'firebase'

class AddBook extends React.Component {
    state = {
        title: "",
        author: "",
        description: "",
        shortDescription: "",
        startDate: new Date(),
        endDate: new Date(),
        comments: ["hhhhh", "kkkk"],
        rate: 5,
        status: 1,
        page: 10,
        pages: 400,
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/513XpOgZtiL.jpg",
    }

    updateInput = (event) => this.setState({ [event.target.name]: event.target.value })

    handleAddClick = () => {
        const db = firebase.firestore();
        const booksRef = db.collection("bookslibrary").doc(this.state.ISBN);

        booksRef.set({
            ...this.state
        });
    }


    render() {
        return (
            <div className='bookWrappers'>
                <TextField
                    id="standard-dense"
                    label="Title"
                    margin="dense"
                    name='title'
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    id="standard-dense"
                    label="Author"
                    name='author'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    id="standard-dense"
                    label="Description"
                    name='description'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    id="standard-dense"
                    label="Shortdescription"
                    name='shortDescription'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    id="standard-dense"
                    label="startDate"
                    name='startDate'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    id="standard-dense"
                    label="endDate"
                    name='endDate'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    id="standard-dense"
                    label="comments"
                    name='comments'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    id="standard-dense"
                    label="rate"
                    name='rate'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    id="standard-dense"
                    label="status"
                    name='status'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    id="standard-dense"
                    label="page"
                    name='page'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    id="standard-dense"
                    label="pages"
                    name='pages'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    id="standard-dense"
                    label="imageUrl"
                    name='imageUrl'
                    margin="dense"
                    onChange={this.updateInput}
                />
                <br />
                <TextField
                    id="standard-dense"
                    label="ISBN"
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