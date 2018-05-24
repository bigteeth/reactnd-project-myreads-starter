import React, {Component} from 'react'
import '../Style/SearchBooks.css'
import Book from './Book'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {
    static propTypes = {
        onUpdateShelf: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired,
    }

    state = {
        searchBooks: [],
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
        const {books, onUpdateShelf} = this.props
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
                        {searchBooks.length === 0 ? (<p className="noresult">No result Found</p>) :
                            (searchBooks.map(book => {
                                        return <Book
                                            book={book}
                                            existingBooks={books}
                                            onUpdateShelf={onUpdateShelf}
                                            key={book.id}
                                        />
                                    }
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