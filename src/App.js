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

  componentDidMount(){
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
        {/* Learning: when coming form search page "componentDidMount" is not invoked. "Router -> Refresh" is called for reloading the page. */}
        <Route exact path="/" refresh={this.reloadShelves()} render={() => (
          <AllShelves 
            books={this.state.books}
            reloadList={this.reloadShelves}
          />
        )}/>
        <Route exact path="/search" component={SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp
