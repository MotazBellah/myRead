import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import serializeForm from 'form-serialize'
import SearchBooks from './SearchBooks'
import BooksList from './BooksList'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  SearchBooks = (book) => {
    BooksAPI.search(book)
    .then((book) => {
        this.setState({
            books: book
        })
    })
  }

  // updateBooks = (book) => {
  //   BooksAPI.update()
  // }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
            <SearchBooks
                books={this.state.books}
                onSearchBook={(book) => {
                    this.SearchBooks(book)
                }}/>
        )} />

        <Route exact path='/' render={() => (
            <BooksList />
        )} />


      </div>
    )
  }
}

export default BooksApp
