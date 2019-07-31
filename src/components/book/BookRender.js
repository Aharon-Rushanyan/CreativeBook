import React from 'react';
import firebase from 'firebase';
import { useState } from 'react';
import Book from './Book'
import { useEffect } from 'react'

function BookRender() {
    const [book, setBook] = useState();
    useEffect(function fire() {
        const db = firebase.firestore();
        const books = db.collection("bookslibrary");
        books.get().then(querySnapshot => {
            const list = [];
            querySnapshot.forEach(doc => {
                const book = {
                    author: doc.data().author,
                    title: doc.data().title,
                    description: doc.data().description,
                    shortDescription: doc.data().shortDescription,
                    startDate: doc.data().startDate,
                    endDate: doc.data().endDate,
                    comments: doc.data().comments,
                    rate: doc.data().rate,
                    status: doc.data().status,
                    page: doc.data().page,
                    pages: doc.data().pages,
                    imageUrl: doc.data().imageUrl,

                };
                list.push(book);
            });
            setBook(list)
             })
             .catch(err => {
        });
    },
     []);

  
    return (
        <div className="App">
            <div className="appContainer">
                <div className="booksWrapper">
                    {
                        book && book.map((bookas, i) => {
                            return <Book key={i} book={bookas} />;
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BookRender;