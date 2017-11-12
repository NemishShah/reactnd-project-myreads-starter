import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import AllShelves from './AllShelves';
import './App.css';

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount = () => {
    this.reloadShelves();
  }

  reloadShelves = () => {
    BooksAPI.getAll().then((books) => {
			this.setState({books});
		});
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <AllShelves 
            books={this.state.books}
            reloadList={this.reloadShelves}
          />
        )}/>
        <Route exact path="/search" render={() => (
          <SearchBooks 
            booksOnShelf={this.state.books}
            reloadShelves={this.reloadShelves}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
