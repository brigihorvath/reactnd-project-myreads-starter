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
		//if there is something typed...
		if(query){
				//set the state of the query
			this.setState({query: query})
				//get the books by the search
			BooksAPI.search(query.trim()).then((books) =>  {
				//if there are results, make sure, that the category is the same on both the search and the main page
				if(books.length > 0){
				let booksOnTheShelf = this.props.books
				let booksOnTheShelfID = booksOnTheShelf.map((item) => item.id)
				books.map((book) => {
					if(!book.shelf){book.shelf = 'none'}
					booksOnTheShelfID.map((id) =>{
						if(book.id === id){book.shelf= booksOnTheShelf.find((x) => x.id === id).shelf}
						return book.shelf
					})
					return book.shelf
				})
				//if there are state, set the books
				this.setState({books: books})
				}else{
				this.setState({books: []})
				}
		})}else{
				this.setState({query: '', books: []})
			}
		
    }




	clearQuery = () => {
		this.setState({query: ''})
	}

	render(){
		const { onChangeCategory } = this.props
		const { query, books } = this.state

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
		                              <select value={book.shelf} onChange={(event) => onChangeCategory(book, event.target.value)}>
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