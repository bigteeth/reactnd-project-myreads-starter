import React, {Component} from 'react'
import './SearchBooks.css'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    static propTypes = {
        onUpdateShelf: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired,
    }

    state = {
        searchBooks: [],
    }

    getDefaultValue = (existingBooks, currentBook) => {
        return existingBooks && existingBooks.filter(existBook => existBook.id === currentBook.id).length > 0 ?
            existingBooks.filter(existBook => existBook.id === currentBook.id)[0].shelf : 'none'
    }

    updateQuery = (query) => {
        console.log("query = " + query)
        if (query === '') {
            this.setState(
                () => (
                    {searchBooks: []}
                )
            )
        } else {
            BooksAPI.search(query).then(
                searchBooks => {
                    if (searchBooks.error) {
                        this.setState(
                            () => ({searchBooks: []})
                        )
                    }
                    else {
                        this.setState(
                            () => ({searchBooks: searchBooks})
                        )
                    }
                }
            )
        }
    }

    render() {
        const {books} = this.props
        const {searchBooks} = this.state
        return (

            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                               onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchBooks.length === 0 ? (
                                <p
                                    className="noresult">
                                    No result Found
                                </p>
                            ) :
                            (searchBooks.map(
                                    (book) => (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{
                                                        width: 128,
                                                        height: 193,
                                                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                                                    }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select defaultValue={this.getDefaultValue(books, book)}
                                                                onChange={(event) => this.props.onUpdateShelf(book, event.target.value)}>
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors}</div>
                                            </div>
                                        </li>
                                    )
                                )
                            )
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks