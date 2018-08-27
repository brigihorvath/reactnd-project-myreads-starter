import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'



class SearchPage extends Component {
	//check if the type of the props are OK
	static: propTypes ={
		books: PropTypes.array.isRequired,
		onChangeCategory: PropTypes.func.isRequired
	}

	state = {
		query: '',
		books: []
	}

	updateQuery = (query) => {
			if(query){
			this.setState({query: query})
			BooksAPI.search(query.trim()).then((books) =>  {
				if(books.length > 0){
				this.setState({books: books})
				// {this.props.books.map((book) => {if{book.id === }})}
				}else{
				this.setState({books: []})
				}
		})}else{
				this.setState({query: '', books: []})
			}}
		


	clearQuery = () => {
		this.setState({query: ''})
	}

	render(){
		const { onChangeCategory } = this.props
		const { query, books } = this.state
		console.log(books)

		return(
			<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
             
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
               

                <input type="text" placeholder="Search by title or author" value={query}
			onChange={(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              			{books.map((book, index) => (
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
	}
}

export default SearchPage