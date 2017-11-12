import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {DebounceInput} from 'react-debounce-input';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component{
    static PropTypes = {
        booksOnShelf: PropTypes.array.isRequired,
        reloadShelves: PropTypes.func.isRequired
    }

    state = {
        query: '',
        searchedBooks: []
    }
        
    reloadList = (query) => {
        this.setState({ query: query.trim() });
        if(query.trim()){
            //Note: search API does not return shelf. Get this from booksOnShelf.
            BooksAPI.search(query).then((matchingBooks) => {
                if(matchingBooks && matchingBooks.length) {
                    var searchedBooks = matchingBooks.map((book) => this.updateShelfInfo(book));
                    this.setState({searchedBooks});
                } else {
                    //Nothing matches the search.
                    this.setState({searchedBooks: []});
                }
            });
        } else {
            //No search string provided.
            this.setState({searchedBooks: []});
        }
    }

    //Update the book with its shelf info.
    updateShelfInfo = (book) => {
        book.shelf = 'none';
        if(this.props.booksOnShelf && this.props.booksOnShelf.length) {
            var bookFromShelf = this.props.booksOnShelf.filter((b) => b.id === book.id);
            if(bookFromShelf.length){
                book.shelf = bookFromShelf[0].shelf;
            }
        } 
        return book;
    }

    render(){
        const {query, searchedBooks} = this.state;
        const {reloadShelves} = this.props;

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/* Learning: https://www.npmjs.com/package/react-debounce-input */}
                        <DebounceInput
                            debounceTimeout={500} 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.reloadList(event.target.value)}
                        />
                    </div>
                </div>
                    <div className="search-books-results">
                    <ol className="books-grid">
                        {searchedBooks.map((book) => (
                            <li key={book.id}>
                                <Book book={book} onChangeShelf={reloadShelves}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks;