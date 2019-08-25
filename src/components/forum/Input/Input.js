import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../style.css'
import Button from '@material-ui/core/Button'
function Input(props) {

    return (
        <div className="form_container">
            <div className="form_wrapper">
                <div className="book_name_wrapper">

                    <TextField
                        label="Authors name *"
                        type="text"
                        className="book_name"
                        placeholder='...'
                        value={props.authorName}
                        onChange={e => props.updateInputAuthorName('authorName', e.target.value)}
                        onKeyDown={props.enterEvent}
                        // className='input'
                        autoFocus
                        
                    />

                </div>
                <div className="book_content_wrapper">

                    <TextField
                        label="Description *"
                        name='description'
                        multiline
                        cols="30"
                        rows="4"
                        margin="normal"
                        variant="outlined"
                        className='book_content'
                        value={props.newComment}
                        onChange={e => props.updateInputComment('newComment', e.target.value)}
                        onKeyDown={props.enterEvent}
                        
                    />
                </div>
                <Button 
                variant="contained" 
                size="medium" 
                color="primary" 
                className="submit"
                onClick={props.addComment}
                >
                    Add
                </Button>
                
            </div>
        </div>
    );
}

export default Input;