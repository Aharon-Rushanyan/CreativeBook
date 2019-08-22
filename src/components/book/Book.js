import React from 'react';
import './Book.css';
import 'font-awesome/css/font-awesome.min.css';
import BookMenu from '../BookMenu/bookmenu';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';

function Book(props) {

  function prevent(e){
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  return (
    <Link style={{textDecoration: 'none', color: 'initial'}} to={`book/${props.book.ISBN}`}>
    <div className="bookWrapper">
      <h3>{props.book.title}</h3>
      <div className="bookInfo">
        <div className="imgWrapper">
          <img className="bookImg" src={props.book.imageUrl} alt="img" />
        </div>
        <div>
          <div className="main">
            <p>{props.book.author}</p>
            <div onClick={prevent}>
            {sessionStorage.getItem("myid") && <BookMenu ISBN={props.book.ISBN} status = {props.status}/> }
            </div>
          </div>
          <p className="bookRate">
            <span>☆</span><span>☆</span>
            <span>☆</span><span>☆</span>
            <span>☆</span>
          </p>
          <p className="description">{props.book.description}</p>
        </div>
        
      </div>
    </div>
    </Link>
  );
}

export default Book;