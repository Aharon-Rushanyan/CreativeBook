import React from 'react';
import Input from '../Input/Input'
import uuid from 'uuid'
import ForumRender from '../ForumRender/ForumRender';
import firebase from '../../Firebase/Firebase';
import '../style.css';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
class Forum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: false,
            limit: 6,
            authorName: '',
            newComment: '',
            comments: [],
            data: ()=>{},
            err: '',
            open: false,
        }
    }
    componentDidMount() {
        
        const db = firebase.firestore();
        const comments = db.collection("forumcomments").limit(this.state.limit).orderBy('date', 'desc');
        const unsubscribe = comments.onSnapshot((querySnapshot)=>{
            const list = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();

                const comment = {
                    id: data.id,
                    value: data.value,
                    userName: data.userName,
                    authorName: data.authorName
                };
                list.push(comment);
            });
            this.setState({comments:list})
            
        })
        this.setState({data: unsubscribe})
    }
    componentDidUpdate(){
        window.addEventListener("scroll",this.handleScroll)
        if(this.state.temp){
            console.log('hello')
            const db = firebase.firestore();
            const comments = db.collection("forumcomments").limit(this.state.limit).orderBy('date', 'desc');
            comments.onSnapshot((querySnapshot)=>{
                const list = [];
                querySnapshot.forEach(doc => {
                    const data = doc.data();
    
                    const comment = {
                        id: data.id,
                        value: data.value,
                        userName: data.userName,
                        authorName: data.authorName
                    };
                    list.push(comment);
                });
                this.setState({comments:list, temp: false})
                
            })
        }
        
    }
    componentWillUnmount(){
        this.state.data();
    }
    // handleScroll=()=>{
    //     if(window.innerHeight+document.documentElement.scrollTop!=document.documentElement.offsetHeight)
    //     {this.setState({limit:this.state.limit+6, temp: true})}
    //     // console.log('hello')
    // }
    downloudNewComments=()=>{
        this.setState({limit:this.state.limit+6, temp: true})
        console.log(this.state)
    }
    updateInputComment = (key, value) => {
        this.setState({
            [key]: value
        })
    }
    updateInputAuthorName = (key, value) => {
        this.setState({
            [key]: value
        })
    }
    enterEvent = e => {        
        if (e.keyCode === 13) {
            this.addComment()
        }
    }

    addComment = () => {
        const newComment = {
            id: uuid(),
            value: this.state.newComment,
            userName: sessionStorage.getItem("myname"),
            authorName: this.state.authorName,
            date: new Date().getTime()
        }
        const comments = [...this.state.comments];
        const db = firebase.firestore();
        const commentsRef = db.collection("forumcomments").doc(newComment.id);
        console.log(commentsRef)
        if (this.state.newComment === '' || this.state.authorName === ''){
            this.setState({
                err: "Please fill all the fields",
                open: true
            })
        } else {(
        commentsRef.set(newComment).then(() => {
            comments.unshift(newComment);
            this.setState({
                authorName: '',
                newComment: '',
                comments,
            })
        })
        )}
    }
    
    

    render() {
        return (
            <div className='forum asdasd'>
                {sessionStorage.getItem("myid") && <Input
                    newComment={this.state.newComment}
                    updateInputAuthorName={this.updateInputAuthorName}
                    updateInputComment={this.updateInputComment}
                    addComment={this.addComment}
                    enterEvent={this.enterEvent}
                    authorName={this.state.authorName}
                    
                />}
                <ForumRender
                    comments={this.state.comments}
                    downloudNewComments={this.downloudNewComments}
                />
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
                
            </div>
        );
    }
}

export default Forum;