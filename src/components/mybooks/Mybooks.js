import React from "react";
import firebase from '../Firebase/Firebase';
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
            tempUpdate: false,
        }
        this.propforupdate = this.propforupdate.bind(this);
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
    componentDidUpdate(prevprops, props) {

        if (this.state.tempUpdate) {
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
                                    .then(data => this.setState({ [key]: data, tempUpdate: false }))
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

    }
    propforupdate(temp) {
        this.setState({ tempUpdate: temp }, console.log(this.state.tempUpdate));


    }
    render() {
        const { match: { params: { key } } } = this.props;

        return (sessionStorage.getItem("myid") ?
            <>
                <h3 style={{
                    textAlign: "center", fontStyle: "italic"
                }}>My books</h3>
                <div className="flex-container2 asdasd">

                    <div className="flex-container">

                        <Tab />
                    </div>
                    {this.state[key] ?
                        <SimpleTable propforupdate={this.propforupdate} book={this.state[key]} status={this.props.match} /> : null
                    }
                </div>
            </> : <Signup />
        );
    }
}