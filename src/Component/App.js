import React from 'react'
import * as BooksAPI from '../BooksAPI'
import '../Style/App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {

    state = {
        books: [],
    }

    componentDidMount(){
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
        return (
            <div className="app">
                <Route path='/search' render={() => (
                    <SearchBooks
                        books={this.state.books}
                        onUpdateShelf={this.updateShelf}
                    />
                )}/>
                <Route exact path='/' render={() => (
                    <ListBooks
                        books={this.state.books}
                        onUpdateShelf={this.updateShelf}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
