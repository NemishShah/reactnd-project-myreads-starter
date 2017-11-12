import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = ({title, books, reloadShelf}) => {
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onChangeShelf={reloadShelf}/>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

BookShelf.PropTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    reloadShelf: PropTypes.func.isRequired
}

export default BookShelf;