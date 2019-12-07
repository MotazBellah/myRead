import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'


class BooksList extends Component {

    handleChange = (e) => {
        e.persist()
        BooksAPI.get(e.target['name'])
        .then((book) => {
            if(this.props.onUpdateBook) {
                this.props.onUpdateBook(book, e.target.value)
            }
            })
    }
    render() {
        const { wantToRead, read, currentlyReading} = this.props

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
                      {currentlyReading.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                              {(book.imageLinks) ?
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                  :
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(./icons/default-cover.png)' }}></div>
                              }
                                <div className="book-shelf-changer">

                                  <select name={book.id} onChange={this.handleChange} defaultValue='currentlyReading'>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>

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
                              {(book.imageLinks) ?
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                  :
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(./icons/default-cover.png)' }}></div>
                              }
                                <div className="book-shelf-changer">

                                  <select name={book.id} onChange={this.handleChange} defaultValue='wantToRead'>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>

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
                              {(book.imageLinks) ?
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                  :
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(./icons/default-cover.png)' }}></div>
                              }
                                <div className="book-shelf-changer">

                                  <select name={book.id} onChange={this.handleChange} defaultValue='read'>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>

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
