import React from "react";
import { Link } from 'react-router-dom';
import firebase from '../Firebase/Firebase';
import BookMenu from '../BookMenu/bookmenu';
import Book from '../book/Book';
import Button from '@material-ui/core/Button';
import Signup from '../signup/signup'
import SimpleTable from '../SimpleTable/SimpleTable'
export default class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            read: [],
            reading: [],
            willread: [],
        }
    }

    componentDidMount() {
        let db = firebase.firestore();
        // const user = firebase.auth().currentUser;
        let booksref = db.collection("bookslibrary");
        let userinforef = sessionStorage.getItem("myid")?db.collection("userinfo").doc(sessionStorage.getItem("myid")):null;

        if(userinforef){
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
    }
    render() {
        const { match: { params: { key } } } = this.props;

        return (sessionStorage.getItem("myid")?
            <>
                <div className="flex-container2">

                    <div className="flex-container">
                    <Link className='link' to='all' >
                    <Button variant="outlined" size="large" color="primary">
                    MY Books
        </Button>
        </Link>
                            <button className="item">
                                
                            </button>
                        <Link className='link' to='read' >
                            <button className="item" >
                                Read
                            </button></Link>
                        <Link className='link' to='reading' >
                            <button className="item">
                                Reading
                            </button></Link>
                        <Link className='link' to='willread' >
                            <button className="item" >
                                I will read
                            </button></Link>

                        <div
                            // type="button"
                            className='goToup'
                            onClick={() => window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })}
                        />

                    </div>
                    {this.state[key] ?
                    <SimpleTable  book={this.state[key]}/> :null
               }
                </div>
            </>:<Signup/>
        );
    }
}

