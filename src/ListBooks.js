import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'



class ListBooks extends Component{
//check if the type of the props are OK
	static: propTypes ={
		books: PropTypes.array.isRequired,
		onChangeCategory: PropTypes.func.isRequired
	}

	render(){
		const { books, onChangeCategory } = this.props;
		//helping arrays to render the books
		const bookShelfTitles = ['Currently Reading', 'Want to Read', 'Read']
		const  bookShelfValues = ['currentlyReading', 'wantToRead', 'read']

		return(
			<div>
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

           		{/* The first map goes through the shelves */}
              {bookShelfValues.map((shelf, index) => {
              	return (<div key={index} className="bookshelf">
              		<h2 className="bookshelf-title">{bookShelfTitles[index]}</h2>
              		<div className="bookshelf-books">
              			<ol className="books-grid">
              			{/* The second map creates the book grid */}
              			{books.filter((book) => (book.shelf === shelf)).map((book, index) => (
              				<li key={index}>
								<div className="book">
		                          <div className="book-top">
		                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
		                            <div className="book-shelf-changer">
		                              <select defaultValue={book.shelf} onChange={(event) => onChangeCategory(book, event.target.value)}>
		                                <option value="move" disabled>Move to...</option>
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
              				</li>))}
              			</ol>
              		</div>
              	</div>
              		)
              })}
                
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

