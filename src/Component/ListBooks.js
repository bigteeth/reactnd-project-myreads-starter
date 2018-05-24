import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired,
    }

    render () {
        const { books, onUpdateShelf} = this.props
        const currentlyReadingBooks = books.filter(book => book.shelf === 'currentlyReading')
        const readBooks = books.filter(book => book.shelf === 'read')
        const wantToReadBooks = books.filter(book => book.shelf === 'wantToRead')

        return (
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
                                    { currentlyReadingBooks.map(book => {
                                        return  <Book
                                            book={book}
                                            existingBooks={currentlyReadingBooks}
                                            onUpdateShelf={onUpdateShelf}
                                            key={book.id}
                                        />;
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { wantToReadBooks.map(book => {
                                        return  <Book
                                            book={book}
                                            existingBooks={wantToReadBooks}
                                            onUpdateShelf={onUpdateShelf}
                                            key={book.id}
                                        />;
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { readBooks.map(book => {
                                        return  <Book
                                            book={book}
                                            existingBooks={readBooks}
                                            onUpdateShelf={onUpdateShelf}
                                            key={book.id}
                                        />;
                                    })}
                                </ol>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks