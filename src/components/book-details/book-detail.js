import React, { Component } from 'react';
import './book-detail.css'
import firebase from '../Firebase/Firebase'
import BookMenu from '../BookMenu/bookmenu';
import { Link } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress';

export default class BookDetail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            book: null,
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        const ref = firebase.firestore().collection('bookslibrary').doc(id);
        ref.get().then(doc => this.setState({ book: doc.data() }));
    }
    componentDidUpdate() {
        const id = this.props.match.params.id;
        if (this.props.match.params.id !== this.state.book.ISBN) {
            const ref = firebase.firestore().collection('bookslibrary').doc(id);
            ref.get().then(doc => this.setState({ book: doc.data() }));
        }
    }

    render() {
        const { book } = this.state
        if (!book) {
            return <div className='asdasd'>
                <LinearProgress />
                <br />
                <LinearProgress color="secondary" />
                <br />
                <LinearProgress />
                <br />
                <LinearProgress color="secondary" />
            </div>
        } else {
            return (
                <div className="details-container container asdasd">
                    <div className="poster">
                        <div>
                        <img src={book.imageUrl} />
                        </div>
                        {sessionStorage.getItem("myid") && <BookMenu ISBN={book.ISBN} status={this.props.match} />}
                    </div>
                    <div className="info">
                        <h2 className="title">{book.title}</h2>
                        <div className="author">by <Link to={{ pathname: "/authorsbooks", authorName: `${book.author}` }}>{book.author}</Link></div>
                        <div className="pages">{book.pages} pages</div>
                        <p>
                            {[null, null, null, null, null].map((item, index) => {
                                return (
                                    <span key={index} className={index < book.rate ? 'filled' : ''}>
                                        ☆
                                    </span>
                                )
                            })}
                        </p>
                        <div style={{ textAlign: 'justify' }} className="description">{book.description}</div>
                    </div>
                </div>
            )
        }
    }
}