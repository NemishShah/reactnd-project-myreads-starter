import React from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

//Learning: this is a "React Stateless Functional Components"
const Book = ({book, onChangeShelf}) => {

    const { shelf, title, authors, imageLinks } = book;
    //Note: Authors and imageLinks can be nothing.

    //Learning: Either we have to bind this function in constructor or use the arrow function like below to use "this.props...."
    const onHandleChange = (event) => {
        // 1) Update the storage. The responsibility of update is with this component.
        BooksAPI.update(book, event.target.value).then(() => {
            // 2) Inform caller about the change after the update is successful.
            onChangeShelf();
        });
    }

    return(
        <div className="book">
            <div className="book-top">
                <div className="book-cover" 
                    style={{ width: 128, height: 193, 
                        backgroundImage: `url(${imageLinks ? imageLinks.thumbnail : ''})`
                    }}>
                </div>
                <div className="book-shelf-changer">
                    <select name={book.id} defaultValue={shelf} onChange={onHandleChange}>
                        <option value="na" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">
                {authors ? authors.join(', ') : ''}
            </div>
        </div>
    );
}

Book.PropTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default Book