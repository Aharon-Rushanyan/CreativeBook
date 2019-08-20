import React from "react";
import { Link } from 'react-router-dom';
import firebase from '../Firebase/Firebase';
import BookMenu from '../BookMenu/bookmenu';
import Book from '../book/Book';
import Button from '@material-ui/core/Button';
import SimpleTable from'../Booktable/Booktable';
import './mybook.css'

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
                   
                </div>


                <SimpleTable book={this.state[key]}/>
                <div class="vertical-menu mdl-tabs mdl-js-tabs">
  <nav class="menu">

    <div class="mdl-tabs__tab-bar">
      <a href="#" class="vertical-menu-header"><span class="mdl-chip__contact mdl-color--blue-grey-50 mdl-color-text--blue-grey-500"><i class="fa fa-users" aria-hidden="true"></i>
</span> MENU TITLE <i class="fa fa-angle-right fa-fw" aria-hidden="true"></i></a>
      <div class="vertical-scroll">
        <a href="#starks-panel" class="mdl-tabs__tab is-active"><span class="mdl-chip__contact">S</span> Starks</a>
        <a href="#lannisters-panel" class="mdl-tabs__tab"><span class="mdl-chip__contact">L</span> Lannisters</a>
        <a href="#targaryens-panel" class="mdl-tabs__tab"><span class="mdl-chip__contact">T</span> Targaryens</a>
      </div>
    </div>
  </nav>
  </div>
            </>
        );
    }
}

