import React from 'react'
import Book from '../book/Book'

export default function SearchReulst(props) {
    return (
        <div className="App">
            <div className="appContainer container">
                <div className="booksWrapper row">
                {console.log(props.location.foundBook)}
                    {   
                        props.location.foundBook && props.location.foundBook.foundBook ? props.location.foundBook.foundBook && props.location.foundBook.foundBook.map(book => <Book key={book.ISBN} book={book} />):<div>sorryyy</div>
                    }
                </div>
            </div>
        </div>
    )
}

