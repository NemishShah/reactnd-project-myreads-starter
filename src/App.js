import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import AllShelves from './AllShelves';
import './App.css';

class BooksApp extends Component {
  // Learning: Since constructor is doing the same thing as what componentDidMount would have done, 
  // componentDidMount is not needed anymore.
  constructor(){ 
      // Learning: This is a must for constructor.
      super(); 
      this.reloadShelves();
  }

  state = {
    books: []
  }

  reloadShelves = () => {
    BooksAPI.getAll().then((books) => {
			this.setState({books});
		});
  }

  render() {
    return (
      <div className="app">
        {/* Learning: when coming form search page "componentDidMount" is not invoked. 
        "Router -> Refresh" can be called for reloading the page. 
        However in this case its best to init the state in constructor */}
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
