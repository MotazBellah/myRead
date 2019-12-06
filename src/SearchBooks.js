import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import serializeForm from 'form-serialize'

class SearchBooks extends Component {
    state = {
        shelfType : {}
    }

    handleSearch = (e) => {
      console.log(e.target.value)

        if(this.props.onSearchBook) {
              this.props.onSearchBook(e.target.value)
      }

    }

    handleChange = (e) => {
        e.persist()
        BooksAPI.get(e.target['name'])
        .then((book) => {
            console.log(e.target.value);
            if(this.props.onUpdateBook) {
                this.props.onUpdateBook(book, e.target.value)
            }
            })
    }

    render() {
        const { shelfType } = this.state
        const { books, currentlyReading, wantToRead, read, allBooks } = this.props

        allBooks.map((book) => (
            shelfType[book.id] = book.shelf
        ))

        return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}

                <input  onChange={this.handleSearch} type="text" name='name' placeholder="Search by title or author"/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                          <div className="book-shelf-changer">
                          <form onSubmit={this.handleCategory}>

                            <select name={book.id} onChange={this.handleChange} defaultValue={(shelfType[book.id] ? shelfType[book.id]: "none")}>
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
    )
    }
}

export default SearchBooks
