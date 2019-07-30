import React from 'react';
import './Book.css';
import 'font-awesome/css/font-awesome.min.css';
import firebase from 'firebase';
import {useState} from 'react';

function Book(props) {
  const [book, setBook] = useState([{author: 'miban', title: 'miban'}]);

  function fire(){
    const db = firebase.firestore();
    const books = db.collection("bookslibrary");
    console.log(books)
    books.get().then(querySnapshot => {
      debugger;
      const list = [];
      console.log(querySnapshot)
      querySnapshot.forEach(doc => {
        console.log(doc.data())
        const book = {
          author: doc.data().author,
          title: doc.data().title,
        };
        list.push(book);
      });
      setBook(list)
    }).catch(err=>{
    });
  }

    return (
      <div className="bookWrapper">
         <h3>{props.book.title}</h3>
        <div className="bookInfo">
          <div className="imgWrapper">
            <img className="bookImg" src={props.book.imageUrl} alt="img"/>
          </div>
          <div>
            <div onClick={fire}>
              
            {book.map((book, i) => {
            return <div key={i}>{book.author} {book.title}</div>;
            })}
            </div>
            <p>{props.book.author}</p>
            <p className="bookRate">
              <span>☆</span><span>☆</span>
              <span>☆</span><span>☆</span>
              <span>☆</span>
            </p>
            <p>{props.book.shortDescription}</p>
            
          </div>
        </div>
      </div>
  
    );
  }

  export default Book;