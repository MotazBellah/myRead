import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import serializeForm from 'form-serialize'

class SearchBooks extends Component {

    handleSearch = (e) => {
      e.preventDefault()
      const value = serializeForm(e.target, {hash:true})
      console.log(value['name'])
      // console.log(BooksAPI.search(value.name))
      if(this.props.onSearchBook) {
          this.props.onSearchBook(value.name)
      }
    }

    render() {
        const { books } = this.props
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
              <form onSubmit={this.handleSearch}>
                <input type="text" name='name' placeholder="Search by title or author"/>
              </form>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
                {books.map((book) => (
                    <li
                        key={book.id}>
                        <div
                        className="book-cover"
                        style={{
                                backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
                                backgroundRepeat: 'no-repeat',
                                width: 128,
                                height: 193
                            }}></div>
                            {book.title}
                    </li>
                ))}
            </ol>
          </div>
        </div>
    )
    }
}

export default SearchBooks
