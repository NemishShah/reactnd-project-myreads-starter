import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class AllShelves extends Component {
    static PropTypes = {
        books: PropTypes.array.isRequired,
        reloadList: PropTypes.func.isRequired
    }

    render(){
        const {books, reloadList} = this.props;
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf 
                            title="Currently Reading"
                            books={books.filter((book) => book.shelf === "currentlyReading")}
                            reloadShelf={reloadList}
                        />
                        
                        <BookShelf 
                            title="Want to Read"
                            books={books.filter((book) => book.shelf === "wantToRead")}
                            reloadShelf={reloadList}
                        />

                        <BookShelf 
                            title="Read"
                            books={books.filter((book) => book.shelf === "read")}
                            reloadShelf={reloadList}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default AllShelves;