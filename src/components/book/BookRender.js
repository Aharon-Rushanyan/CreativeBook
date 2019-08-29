import React from 'react';
import firebase from '../Firebase/Firebase'
import { useState } from 'react';
import Book from './Book'
import { useEffect } from 'react'

function BookRender(props) {
    const [book, setBook] = useState();
    const [limit, setLimit] = useState(6);
    let forscroll = React.createRef();
    const [x, setx] = useState(300);
    useEffect(function fire() {
        // window.addEventListener("scroll", handleScroll)
        const abortController = new AbortController();

        if (props.location.authorName) {
            const db = firebase.firestore();
            const books = db.collection("bookslibrary");
            const query = books.where("author", "==", props.location.authorName)
            query.limit(limit).get()
                .then(querySnapshot => {
                    const list = [];
                    querySnapshot.forEach(doc => {
                        const data = doc.data();

                        const book = {
                            author: data.author,
                            title: data.title,
                            description: data.description,
                            shortDescription: data.shortDescription,
                            startDate: data.startDate,
                            endDate: data.endDate,
                            comments: data.comments,
                            rate: data.rate,
                            status: data.status,
                            page: data.page,
                            pages: data.pages,
                            imageUrl: data.imageUrl,
                            ISBN: data.ISBN
                        };

                        list.push(book);
                    });
                    setBook(list)
                })
                .catch(err => console.error(err.message));
        } else {
            const db = firebase.firestore();
            const books = db.collection("bookslibrary");
            books.limit(limit).get()
                .then(querySnapshot => {
                    const list = [];
                    querySnapshot.forEach(doc => {
                        const data = doc.data();

                        const book = {
                            author: data.author,
                            title: data.title,
                            description: data.description,
                            shortDescription: data.shortDescription,
                            startDate: data.startDate,
                            endDate: data.endDate,
                            comments: data.comments,
                            rate: data.rate,
                            status: data.status,
                            page: data.page,
                            pages: data.pages,
                            imageUrl: data.imageUrl,
                            ISBN: data.ISBN
                        };

                        list.push(book);
                    });
                    setBook(list)
                })
                .catch(err => console.error(err.message));
            window.onscroll = function () { myFunction() };

        }

        return function cleanup() {
            abortController.abort()
            // window.removeEventListener("scroll", handleScroll)
        }

    }, [props.location.temp, limit]);

    function myFunction() {

        console.log("nowwe are here" + document.documentElement.scrollTop)
        console.log("this is my x = " + x)

        if (document.documentElement.scrollTop > x) {



            setx(x + 350);
            setLimit(limit + 3);


        }

    }
    // function handleScroll() {
    //     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) { setLimit(limit + 6) }
    // }
    return (



        <div className="App asdasd" ref={forscroll} >
            <div className="appContainer container">
                <div className="booksWrapper row">
                    {
                        book && book.map(book => <Book author={props.location.authorName} key={book.ISBN} book={book} status={{ params: { key: "else" } }} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default BookRender;