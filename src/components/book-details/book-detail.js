import React, {Component} from 'react';
import './book-detail.css'
import firebase from '../Firebase/Firebase'
import BookMenu from '../BookMenu/bookmenu';

export default class BookDetail extends Component {


    constructor(props){
        super(props);
        this.state = {
            book: null,
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        const ref = firebase.firestore().collection('bookslibrary').doc(id);
        ref.get().then(doc => this.setState({book: doc.data()}));
    }
    componentDidUpdate(){
        const id = this.props.match.params.id;
        if(this.props.match.params.id !== this.state.book.ISBN){
            const ref = firebase.firestore().collection('bookslibrary').doc(id);
            ref.get().then(doc => this.setState({book: doc.data()}));
            console.log('hello')
        }
        
        
    }
    render(){
        const {book} = this.state
        if(!book){
            return <h1>Loading...</h1>
        }else{
            return (
                <div className="details-container container">
                    <div className="poster">
                        <img src={book.imageUrl} />
                        <BookMenu ISBN={book.ISBN} />
                    </div>
                    <div className="info">
                        <h2 className="title">{book.title}</h2>
                        <div className="author">by <span>{book.author}</span></div>
                        <div className="pages">{book.pages} pages</div>
                        <p>
                            {[null,null,null,null,null].map((item,index) => {
                                return (
                                    <span key={index} className={index < book.rate ? 'filled' : ''}>
                                        ☆
                                    </span>
                                )
                            })}
                        </p>
                        <div style={{textAlign: 'justify'}} className="description">{book.description}</div>
                    </div>
                </div>
            )
        }
    }
}