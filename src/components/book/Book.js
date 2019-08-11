import React from 'react';
import './Book.css';
import 'font-awesome/css/font-awesome.min.css';

function Book(props) {
  return (
    <div className="bookWrapper col-md-4">
      <h3>{props.book.title}</h3>
      <div className="bookInfo">
        <div className="imgWrapper">
          <img className="bookImg" src={props.book.imageUrl} alt="img" />
        </div>
        <div>
          <p>{props.book.author}</p>
          <p className="bookRate">
            <span>☆</span><span>☆</span>
            <span>☆</span><span>☆</span>
            <span>☆</span>
          </p>
          <p>{props.book.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Book;