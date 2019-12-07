import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BooksList from './BooksList'

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    allBooks: []
  }


  SearchBooks = (book) => {
    BooksAPI.search(book)
    .then((book) => {
        console.log(book.error)
        this.setState({
            books: book.error ? book.items : book
        })
    })
  }


  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then((c) => {
        BooksAPI.getAll()
        .then((allBooks) => {

            let currentlyReading = allBooks.filter((book) => (
                book.shelf === 'currentlyReading'
            ))
            let wantToRead = allBooks.filter((book) => (
                book.shelf === 'wantToRead'
            ))
            let read = allBooks.filter((book) => (
                book.shelf === 'read'
            ))
            this.setState({
                allBooks: allBooks,
                currentlyReading: currentlyReading,
                wantToRead: wantToRead,
                read: read,
            })

        })

    })
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then((allBooks) => {

        let currentlyReading = allBooks.filter((book) => (
            book.shelf === 'currentlyReading'
        ))
        let wantToRead = allBooks.filter((book) => (
            book.shelf === 'wantToRead'
        ))
        let read = allBooks.filter((book) => (
            book.shelf === 'read'
        ))
        this.setState({
            allBooks: allBooks,
            currentlyReading: currentlyReading,
            wantToRead: wantToRead,
            read: read,
        })

    })
  }


  render() {

    return (
      <div className="app">
        <Route path='/search' render={() => (
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
                }}/>
        )} />

        <Route exact path='/' render={() => (
            <BooksList
                currentlyReading={this.state.allBooks.filter((book) => (
                    book.shelf === 'currentlyReading'
                ))}
                wantToRead={this.state.allBooks.filter((book) => (
                    book.shelf === 'wantToRead'
                ))}
                read={this.state.allBooks.filter((book) => (
                    book.shelf === 'read'
                ))}
                onUpdateBook={(book, shelf) =>{
                    this.updateBooks(book, shelf)
                }}/>
        )} />


      </div>
    )
  }
}

export default BooksApp
