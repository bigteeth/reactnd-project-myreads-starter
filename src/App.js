import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {

    state = {
        books: [],
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }

    updateShelf = (targetBook, shelf) => {
        targetBook.shelf = shelf
        this.setState((state) => ({
            books: state.books.filter((book) => book.id !== targetBook.id).concat([targetBook])
        }))
        BooksAPI.update(targetBook, shelf)
    }

    render() {

        const currentlyReadingBooks = this.state.books.filter(book => book.shelf === 'currentlyReading')
        const readBooks = this.state.books.filter(book => book.shelf === 'read')
        const wantToReadBooks = this.state.books.filter(book => book.shelf === 'wantToRead')

        return (
            <div className="app">
                <Route path='/search' render={() => (
                    <SearchBooks
                        onUpdateShelf={this.updateShelf}
                        books={this.state.books}
                    />
                )}/>
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <ListBooks
                                        books={currentlyReadingBooks}
                                        onUpdateShelf={this.updateShelf}
                                    />
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <ListBooks
                                        books={wantToReadBooks}
                                        onUpdateShelf={this.updateShelf}
                                    />
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <ListBooks
                                        books={readBooks}
                                        onUpdateShelf={this.updateShelf}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to='/search'>Add a book</Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
