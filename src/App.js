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
    read: [],
    allBooks: []
  }


  SearchBooks = (book) => {
    BooksAPI.search(book)
    .then((book) => {

        this.setState({
            books: book
        })
    })
  }


  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then((c) => {
        BooksAPI.getAll()
        .then((allBooks) => {

            let curr = allBooks.filter((book) => (
                book.shelf === 'currentlyReading'
            ))
            let want = allBooks.filter((book) => (
                book.shelf === 'wantToRead'
            ))
            let red = allBooks.filter((book) => (
                book.shelf === 'read'
            ))
            this.setState({
                allBooks: allBooks,
                currentlyReading: curr,
                wantToRead: want,
                read: red,
            })

        })

    })
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then((allBooks) => {
        console.log(allBooks);
        let curr = allBooks.filter((book) => (
            book.shelf === 'currentlyReading'
        ))
        let want = allBooks.filter((book) => (
            book.shelf === 'wantToRead'
        ))
        let red = allBooks.filter((book) => (
            book.shelf === 'read'
        ))
        this.setState({
            allBooks: allBooks,
            currentlyReading: curr,
            wantToRead: want,
            read: red,
        })

    })
  }


  render() {

    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
            <SearchBooks
                books={this.state.books}
                allBooks={this.state.allBooks}
                onSearchBook={(book) => {
                    if(book.length > 0){
                        this.SearchBooks(book)
                    }    
                }}
                onUpdateBook={(book, shelf) =>{
                    this.updateBooks(book, shelf)
                    history.push('/')
                }}/>
        )} />

        <Route exact path='/' render={() => (
            <BooksList
                allBooks={this.state.allBooks}
                currentlyReading={this.state.currentlyReading}
                wantToRead={this.state.wantToRead}
                read={this.state.read}
                onUpdateBook={(book, shelf) =>{
                    this.updateBooks(book, shelf)
                }}/>
        )} />


      </div>
    )
  }
}

export default BooksApp
