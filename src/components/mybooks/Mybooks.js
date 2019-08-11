import React from "react";
import { Link } from 'react-router-dom';
import firebase from '../Firebase/Firebase';
import BookMenu from '../bookmenu';
import Book from '../book/Book';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
export default class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            all: [],
            read: [],
            reading: [],
            willread: [],
        }
    }

    componentDidMount() {
        let db = firebase.firestore();
        // const user = firebase.auth().currentUser;
        let booksref = db.collection("bookslibrary");
        let userinforef = db.collection("userinfo").doc(sessionStorage.getItem("myid"));

        userinforef
            .get()
            .then(doc => {
                if (doc.exists) {
                    let dataBase = doc.data();

                    for (let key in dataBase) {
                        Promise.all(
                            dataBase[key].map(id => {
                                return booksref
                                    .where("ISBN", "==", id)
                                    .get()
                                    .then(querySnapshot => {
                                        let data;
                                        querySnapshot.forEach(doc => data = doc.data())
                                        return data;
                                    });
                            })
                        )
                            .then(data => this.setState({ [key]: data }))
                            .catch(err => console.error(err.message));
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch(err => console.error(err.message));
    }

    render() {
        const { match: { params: { key } } } = this.props;

        return (
            <>
             <Select
          
          
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
                <BookMenu />
                <Link to="/mybook/read" >read</Link>
                <Link to="/mybook/reading" >reading</Link>
                <Link to="/mybook/all" >all</Link>
                <Link to="/mybook/willread" >willread</Link>
                <div>
                    {
                        this.state[key] && this.state[key].map(book => book ? <Book book={book} key={book.ISBN} /> : null)
                    }
                </div>
            </>
        );
    }
}