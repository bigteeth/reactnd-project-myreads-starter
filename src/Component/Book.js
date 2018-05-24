import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

    static propTypes = {
        existingBooks: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired,
    }

    getDefaultValue = (existingBooks, currentBook) => {
        return existingBooks && existingBooks.filter(existBook => existBook.id === currentBook.id).length > 0 ?
            existingBooks.filter(existBook => existBook.id === currentBook.id)[0].shelf : 'none'
    }

    render() {
        const {book, existingBooks, onUpdateShelf} = this.props
        return (<li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: book.imageLinks != null && `url(${book.imageLinks.thumbnail})`
                        }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={this.getDefaultValue(existingBooks, book)}
                                    onChange={(event) => onUpdateShelf(book, event.target.value)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors != null && book.authors}</div>
                </div>
            </li>
        )
    }
}

export default Book