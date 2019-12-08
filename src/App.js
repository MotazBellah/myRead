import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BooksList from './BooksList'



class BooksApp extends React.Component {
  state = {
    books: [],
    allBooks: []
  }


  SearchBooks = (book) => {
    if (book){
        BooksAPI.search(book)
        .then((book) => {

            this.setState({
                books: book.error  ? [] : book
            })
        })
    } else {
        this.setState({
            books: []
        })
    }

}


  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then((c) => {
        BooksAPI.getAll()
        .then((allBooks) => {

            this.setState({
                allBooks: allBooks,
            })

        })

    })
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then((allBooks) => {

        this.setState({
            allBooks: allBooks,

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
                    console.log(book);

                        this.SearchBooks(book)

                }}
                onUpdateBook={(book, shelf) =>{
                    this.updateBooks(book, shelf)
                }}/>
        )} />

        <Route  path='/' render={() => (

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
