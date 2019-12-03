import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import serializeForm from 'form-serialize'


class BooksList extends Component {
    state = {
        updateBook: '',
        updateShafle: '',
        currentlyReading: [],
        wantToRead: [],
        read: [],
        allBooks: []
    }

    componentDidMount(){
      BooksAPI.getAll()
      .then((books) => {
          console.log(books);
          console.log(this.state.wantToRead);
          this.setState({
              allBooks: books
          })
      })
    }

    handleChange = (e) => {
        e.persist()
        console.log(e.target.value);
        console.log(e.target['name']);
        BooksAPI.get(e.target['name'])
        .then((book) => {
            console.log(e.target.value);
            // this.setState({
            //     updateBook: book,
            //     updateShafle: e.target.value
            // })
            BooksAPI.update(book, e.target.value)
            .then((book) => {
                console.log(book)
                console.log(book.wantToRead)
                let want = this.state.allBooks.filter((c) => (
                    book.wantToRead.includes(c.id)
                ))
                let curr = this.state.allBooks.filter((c) => (
                    book.currentlyReading.includes(c.id)
                ))
                let red = this.state.allBooks.filter((c) => (
                    book.read.includes(c.id)
                ))

                // console.log(want);

                // this.setState({
                //     wantToRead: want
                // })
                this.setState(() => ({
                    wantToRead: want,
                    currentlyReading: curr,
                    read: red
                }))

            })
        })
    }
    render() {
        const {allBooks, wantToRead, read , currentlyReading} = this.state
        // const { allBooks } = this.props
        return(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                      {allBooks.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                <form onSubmit={this.handleCategory}>
                                  <select  name={book.id} onChange={this.handleChange}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </form>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>

                              {book.authors !== undefined && (
                                  <div className="book-authors">{book.authors.toString()}</div>
                              )}


                            </div>
                          </li>

                      ))}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                      {wantToRead.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                <form onSubmit={this.handleCategory}>
                                  <select  onChange={this.handleChange}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </form>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>

                              {book.authors !== undefined && (
                                  <div className="book-authors">{book.authors.toString()}</div>
                              )}


                            </div>
                          </li>

                      ))}
                      </ol>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                      {read.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                <form onSubmit={this.handleCategory}>
                                  <select  onChange={this.handleChange}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </form>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>

                              {book.authors !== undefined && (
                                  <div className="book-authors">{book.authors.toString()}</div>
                              )}


                            </div>
                          </li>

                      ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <Link className="open-search" to='/search'>Add a book</Link>


              </div>
        )
    }

}

export default BooksList
