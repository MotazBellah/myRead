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
    allBooks: [],
    b: {},
    x: 0
  }


  SearchBooks = (book) => {
    BooksAPI.search(book)
    .then((book) => {
        this.setState({
            books: book
        })
    })
  }

  // handleChange = (e) => {
  //     e.persist()
  //     console.log(e.target.value);
  //     console.log(e.target['name']);
  //     BooksAPI.get(e.target['name'])
  //     .then((book) => {
  //         console.log(e.target.value);
  //         // this.setState({
  //         //     updateBook: book,
  //         //     updateShafle: e.target.value
  //         // })
  //         BooksAPI.update(book, e.target.value)
  //         .then((book) => {
  //             console.log(book)
  //             console.log(book.wantToRead)
  //             let want = this.state.allBooks.filter((c) => (
  //                 book.wantToRead.includes(c.id)
  //             ))
  //             let curr = this.state.allBooks.filter((c) => (
  //                 book.currentlyReading.includes(c.id)
  //             ))
  //             let red = this.state.allBooks.filter((c) => (
  //                 book.read.includes(c.id)
  //             ))
  //
  //             // console.log(want);
  //
  //             // this.setState({
  //             //     wantToRead: want
  //             // })
  //             this.setState(() => ({
  //                 wantToRead: want,
  //                 currentlyReading: curr,
  //                 read: red
  //             }))
  //
  //         })
  //     })
  // }

  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then((book) => {
        console.log(book);
        let want = this.state.allBooks.filter((c) => (
            book.wantToRead.includes(c.id)
        ))
        let curr = this.state.allBooks.filter((c) => (
            book.currentlyReading.includes(c.id)
        ))
        let red = this.state.allBooks.filter((c) => (
            book.read.includes(c.id)
        ))
        // console.log(allBooks);
        console.log(book.wantToRead);
        console.log(book.currentlyReading);
        console.log(book.read);

        this.setState(() => ({
            wantToRead: want,
            currentlyReading: curr,
            read: red
        }))


        // this.setState((currentState) => ({
        //     currentlyReading: currentState.currentlyReading.concat([curr]),
        //     wantToRead: currentState.wantToRead.concat([want]),
        //     read: currentState.currentlyReading.concat([red])
        // }))
    })
  }

  componentDidMount(){
    BooksAPI.getAll()
    .then((allBooks) => {
        // console.log(allBooks)
        // console.log(allBooks[0])
        // console.log(allBooks[0].shelf);
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
        // BooksAPI.update(allBooks[0], 'move')
        // .then((book) => {
        //     console.log(book);
        //     let want = allBooks.filter((c) => (
        //         book.wantToRead.includes(c.id)
        //     ))
        //     let curr = allBooks.filter((c) => (
        //         book.currentlyReading.includes(c.id)
        //     ))
        //     let red = allBooks.filter((c) => (
        //         book.read.includes(c.id)
        //     ))
        //
        //     this.setState({
        //         currentlyReading: curr,
        //         wantToRead: want,
        //         read: red
        //     })
        // })


    })
  }


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
