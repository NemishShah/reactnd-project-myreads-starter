import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component{
    state = {
        booksOnShelf: [],
        query: '',
        searchedBooks: []
    }
    
    //Initialize the state with books currently on shelf.
    componentDidMount(){
        BooksAPI.getAll().then((booksOnShelf) => {
            this.setState({booksOnShelf});
        });
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

    //When book shelf changes we need to update the state with the new info.
    onChangeShelf = () => {
        BooksAPI.getAll().then((booksOnShelf) => {
			this.setState({booksOnShelf});
        });
        this.reloadList(this.state.query);
    }

    //Update the book with its shelf info.
    updateShelfInfo = (book) => {
        book.shelf = 'none';
        if(this.state.booksOnShelf && this.state.booksOnShelf.length) {
            var bookFromShelf = this.state.booksOnShelf.filter((b) => b.id === book.id);
            if(bookFromShelf.length){
                book.shelf = bookFromShelf[0].shelf;
            }
        } 
        return book;
    }

    render(){
        const {query, searchedBooks} = this.state;

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
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
                                <Book book={book} onChangeShelf={this.onChangeShelf}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks;