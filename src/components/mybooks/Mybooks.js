import React from "react";
import { Link } from 'react-router-dom';
import firebase from '../Firebase/Firebase';
import BookMenu from '../BookMenu/bookmenu';
import Book from '../book/Book';
import Button from '@material-ui/core/Button';
import Signup from '../signup/signup'
import SimpleTable from '../SimpleTable/SimpleTable'
import Tab from '../Tab/Tab'

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
        let userinforef = sessionStorage.getItem("myid") ? db.collection("userinfo").doc(sessionStorage.getItem("myid")) : null;

        if (userinforef) {
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

        return (sessionStorage.getItem("myid") ?
            <>
                <div className="flex-container2">

                    <div className="flex-container">
    <Tab/>
                    </div>
                    {this.state[key] ?
                        <SimpleTable book={this.state[key]} /> : null
                    }
                </div>
            </> : <Signup />
        );
    }
}

