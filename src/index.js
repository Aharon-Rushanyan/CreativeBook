import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// import * as firebase from 'firebase';
import firebase from './components/Firebase/Firebase';
import 'bootstrap/dist/css/bootstrap.css';
import Users from './components/Reducer/UserInfo'



var firebaseConfig = {
  apiKey: "AIzaSyBWImAa1QuXa77f8bR5hn4YkVaExxarg8M",
  authDomain: "creativebook-e64b7.firebaseapp.com",
  databaseURL: "https://creativebook-e64b7.firebaseio.com",
  projectId: "creativebook-e64b7",
  storageBucket: "",
  messagingSenderId: "231126040683",
  appId: "1:231126040683:web:351787b15a97f21a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



ReactDOM.render(<Users />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
